---
mcp_tool: true
description: 写入或追加笔记内容
inputSchema:
  type: object
  properties:
    name:
      type: string
      description: 笔记名称（不含扩展名，可包含路径）
    content:
      type: string
      description: 写入内容
    mode:
      type: string
      description: 写入模式 overwrite | append
  required:
    - name
    - content
PrevNote: "[[obsidian_create]]"
NextNote: "[[obsidian_set_frontmatter]]"
words:
  2026-04-20: 117
tags:
  - Publish/ObsidianZ
---

```js tpl
const { name, content, mode = "overwrite" } = tp.config.extra;

// 规范路径
const filePath = name.endsWith(".md") ? name : `${name}.md`;

// 查找文件
let tfile = app.metadataCache.getFirstLinkpathDest(name, "");

// ===== 不存在则创建 =====
if (!tfile) {
  try {
    tfile = await app.vault.create(filePath, content);

    tR += JSON.stringify({
      success: true,
      mode: "create",
      file: filePath
    });
  } catch (e) {
    tR += JSON.stringify({
      success: false,
      error: e.message
    });
  }
  return;
}

// ===== 已存在 =====
try {
  const oldContent = await app.vault.read(tfile);

  let newContent;

  if (mode === "append") {
    newContent = oldContent + "\n" + content;
  } else {
    newContent = content;
  }

  await app.vault.modify(tfile, newContent);

  tR += JSON.stringify({
    success: true,
    mode: mode,
    file: filePath
  });

} catch (e) {
  tR += JSON.stringify({
    success: false,
    error: e.message
  });
}
```

