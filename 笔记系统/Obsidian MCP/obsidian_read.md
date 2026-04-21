---
mcp_tool: true
description: 读取指定笔记内容
inputSchema:
  type: object
  properties:
    file:
      type: string
      description: 要读取的笔记名称（不含扩展名）
  required:
    - file
words:
  2026-04-20: 62
PrevNote: "[[Obsidian MCP]]"
NextNote: "[[obsidian_create]]"
tags:
  - Publish/ObsidianZ
---


```js tpl
// 获取参数
const { file } = tp.config.extra;

// 查找文件
const tfile = app.metadataCache.getFirstLinkpathDest(file, "");

// 判空处理
if (!tfile) {
  tR += JSON.stringify({
    success: false,
    error: `File not found: ${file}`
  });
  return;
}

// 读取内容
const content = await app.vault.read(tfile);

// 返回结果
tR += JSON.stringify({
  success: true,
  file: file,
  content: content
});

```

