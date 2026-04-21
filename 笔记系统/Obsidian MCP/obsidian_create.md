---
mcp_tool: true
description: 创建新笔记并写入内容
inputSchema:
  type: object
  properties:
    name:
      type: string
      description: 笔记名称（不含扩展名，可包含路径）
    content:
      type: string
      description: 笔记内容
  required:
    - name
    - content
words:
  2026-04-20: 78
NextNote: "[[obsidian_write]]"
PrevNote: "[[obsidian_read]]"
tags:
  - Publish/ObsidianZ
---

```js tpl
const { name, content } = tp.config.extra;

// 规范文件路径
let filePath = name.endsWith(".md") ? name : `${name}.md`;

// 检查是否已存在
let existing = app.metadataCache.getFirstLinkpathDest(name, "");

if (existing) {
  tR += JSON.stringify({
    success: false,
    error: `File already exists: ${name}`
  });
  return;
}

// 创建文件
try {
  const file = await app.vault.create(filePath, content);

  tR += JSON.stringify({
    success: true,
    file: filePath
  });
} catch (e) {
  tR += JSON.stringify({
    success: false,
    error: e.message
  });
}
```

