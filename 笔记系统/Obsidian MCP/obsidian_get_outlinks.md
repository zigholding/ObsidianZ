---
mcp_tool: true
description: 获取笔记的出链（Outlinks）
inputSchema:
  type: object
  properties:
    file:
      type: string
      description: 笔记名称（不含扩展名，可包含路径）
  required:
    - file
words:
  2026-04-20: 109
NextNote: "[[obsidian_get_brothers]]"
PrevNote: "[[obsidian_get_inlinks]]"
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
  // 使用 NoteChain / EA API 获取出链
  const outlinks = ea.file.get_outlinks(tfile);

  // 规范化输出（避免对象结构不可控）
  const links = (outlinks || []).map(l => {
    if (typeof l === "string") return l;
    if (l.path) return l.path;
    if (l.link) return l.link;
    return String(l);
  });

  tR += JSON.stringify({
    success: true,
    file: file,
    outlinks: links
  });

} catch (e) {
  tR += JSON.stringify({
    success: false,
    error: e.message
  });
}
```

