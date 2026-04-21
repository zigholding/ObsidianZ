---
PrevNote: "[[obsidian_write]]"
NextNote: "[[obsidian_get_inlinks]]"
words:
  2026-04-21: 91
mcp_tool: true
description: 设置笔记的 frontmatter 元数据字段（自动解析 JSON）
inputSchema:
  type: object
  properties:
    file:
      type: string
      description: 笔记名称（不含扩展名，可包含路径）
    key:
      type: string
      description: frontmatter 字段名
    value:
      type: string
      description: 字段值（支持 JSON 字符串，如 "true"、"[1,2]"、"{\"a\":1}"）
  required:
    - file
    - key
    - value
tags:
  - Publish/ObsidianZ
---

```js tpl
const { file, key, value } = tp.config.extra;

// 获取文件
const tfile = ea.file.get_tfile(file);

if (!tfile) {
  tR += JSON.stringify({
    success: false,
    error: `File not found: ${file}`
  });
  return;
}

let parsedValue = value;

if (typeof value === "string") {
  try {
    parsedValue = JSON.parse(value);
  } catch {
    // 解析失败，保持原字符串
    parsedValue = value;
  }
}

try {
  // 写入 frontmatter
  await ea.editor.set_frontmatter(tfile, key, parsedValue);

  tR += JSON.stringify({
    success: true,
    file: file,
    key: key,
    value: parsedValue
  });

} catch (e) {
  tR += JSON.stringify({
    success: false,
    error: e.message
  });
}
```



