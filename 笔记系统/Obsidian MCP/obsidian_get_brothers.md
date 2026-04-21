---
PrevNote: "[[obsidian_get_outlinks]]"
NextNote: "[[obsidian_query_by_datacore]]"
words:
  2026-04-21: 82
mcp_tool: true
description: 获取与指定笔记同目录的其他笔记（brothers）
inputSchema:
  type: object
  properties:
    file:
      type: string
      description: 笔记名称（不含扩展名，可包含路径）
  required:
    - file
tags:
  - Publish/ObsidianZ
---

```js tpl
const { file } = tp.config.extra;

// 获取目标文件
const tfile = ea.file.get_tfile(file);

if (!tfile) {
  tR += JSON.stringify({
    success: false,
    error: `File not found: ${file}`
  });
  return;
}

try {
  // EA API：获取同目录文件
  const brothers = ea.file.get_brothers(tfile);

  // 统一输出结构
  const files = (brothers || []).map(f => f.basename);

  tR += JSON.stringify({
    success: true,
    file: file,
    brothers: files
  });

} catch (e) {
  tR += JSON.stringify({
    success: false,
    error: e.message
  });
}
```



