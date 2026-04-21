---
words:
  2026-04-20: 33
  2026-04-21: 116
PrevNote:
NextNote: "[[obsidian_read]]"
tags:
  - Publish/ObsidianZ
  - prompt
reference: "false"
---

```dataviewjs
let port = ea.nc.settings.notechain.httpServerPort;
dv.span(`
[查看 MCP 工具列表](http://localhost:${port}/mcp/list_tools)
[测试 MCP 工具](http://localhost:${port}/mcp/test)
`)
```


更新技能，修改description，结合已罗列的工具，让它体现具体的场景和能力


### 提示词


生成 [[脚本笔记]]，同时 [[使用 NoteChain HttpServer 将脚本笔记变为 MCP 工具]]。

实现以下功能：

${prompt.selection}

<% await ea.wv.append_reference(['脚本笔记','使用 NoteChain HttpServer 将脚本笔记变为 MCP 工具']) %>




