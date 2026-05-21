import json
import re
import os

log_path = r"C:\Users\chand\.gemini\antigravity\brain\44bba634-763b-4243-bc4c-d3b8bbf5a7e5\.system_generated\logs\overview.txt"

targets = {
    "page.tsx": {
        "end_path": r"app\page.tsx",
        "content": ""
    },
    "globals.css": {
        "end_path": r"app\globals.css",
        "content": ""
    },
    "Header.tsx": {
        "end_path": r"components\Header.tsx",
        "content": ""
    },
    "Footer.tsx": {
        "end_path": r"components\Footer.tsx",
        "content": ""
    }
}

print(f"Reading log file: {log_path}")
with open(log_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total entries in log: {len(lines)}")

count = 0
for idx, line in enumerate(lines):
    try:
        data = json.loads(line.strip())
    except Exception as e:
        continue
    
    # Check if there are tool calls in this log entry
    tool_calls = data.get("tool_calls", [])
    if not tool_calls:
        continue
        
    for tc in tool_calls:
        name = tc.get("name")
        args = tc.get("args", {})
        
        # Determine the target file path
        target_file = args.get("TargetFile", "")
        if not target_file:
            continue
            
        # Clean the target file path for matching by stripping literal double quotes
        cleaned_path = target_file.strip('"').replace('\\\\', '\\').replace('/', '\\').lower()
        
        matched_key = None
        for key, info in targets.items():
            if cleaned_path.endswith(info["end_path"].lower()):
                matched_key = key
                break
                
        if not matched_key:
            continue
            
        if name == "write_to_file":
            code = args.get("CodeContent", "")
            # Unescape some characters if written as raw string inside JSON
            # In our overview.txt logs, the fields are JSON strings, so they are already unescaped by json.loads
            targets[matched_key]["content"] = code
            print(f"Turn {data.get('step_index')}: write_to_file on {matched_key} ({len(code)} chars)")
            count += 1
            
        elif name == "replace_file_content" or name == "multi_replace_file_content":
            # For multi_replace_file_content, we have chunks
            chunks = []
            if name == "multi_replace_file_content":
                chunks = args.get("ReplacementChunks", [])
            else:
                chunks = [{
                    "TargetContent": args.get("TargetContent", ""),
                    "ReplacementContent": args.get("ReplacementContent", "")
                }]
                
            current_content = targets[matched_key]["content"]
            if not current_content:
                print(f"Warning: replace_file_content on empty content for {matched_key} at turn {data.get('step_index')}")
                continue
                
            # Apply each chunk replacement
            success = True
            for chunk in chunks:
                target_str = chunk.get("TargetContent", "")
                repl_str = chunk.get("ReplacementContent", "")
                
                # Strip wrapping quotes if any
                if target_str.startswith('"') and target_str.endswith('"'):
                    target_str = target_str[1:-1]
                if repl_str.startswith('"') and repl_str.endswith('"'):
                    repl_str = repl_str[1:-1]
                
                # Unescape standard escape sequences that might be in target_str / repl_str
                # Since json.loads parses the JSON string, they should be unescaped. But just in case:
                target_str = target_str.encode().decode('unicode-escape') if '\\' in target_str else target_str
                repl_str = repl_str.encode().decode('unicode-escape') if '\\' in repl_str else repl_str
                
                # Check for exact match
                if target_str in current_content:
                    current_content = current_content.replace(target_str, repl_str)
                else:
                    # Try with normalized line endings
                    norm_current = current_content.replace('\r\n', '\n')
                    norm_target = target_str.replace('\r\n', '\n')
                    norm_repl = repl_str.replace('\r\n', '\n')
                    
                    if norm_target in norm_current:
                        norm_current = norm_current.replace(norm_target, norm_repl)
                        current_content = norm_current
                    else:
                        print(f"Error: TargetContent not found in {matched_key} at turn {data.get('step_index')}!")
                        print(f"Target Content: {repr(target_str[:150])}...")
                        success = False
            
            if success:
                targets[matched_key]["content"] = current_content
                print(f"Turn {data.get('step_index')}: replace_file_content on {matched_key}")
                count += 1

# Write reconstructed contents back to the active workspace
workspace_root = r"c:\Users\chand\Music\royalfiniteacademy"
for key, info in targets.items():
    dest_path = os.path.join(workspace_root, info["end_path"])
    content = info["content"]
    
    if content:
        # Make sure parent directories exist
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        # Ensure correct line endings (use LF or let Python handle it)
        with open(dest_path, 'w', encoding='utf-8', newline='\n') as out_f:
            out_f.write(content)
        print(f"SUCCESSFULLY RESTORED {key} -> {dest_path} ({len(content)} bytes)")
    else:
        print(f"Skipping {key} because no content was played back")

print("Restoration complete!")
