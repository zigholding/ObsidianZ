---
PrevNote: "[[obsidian_query_by_datacore]]"
NextNote: "[[get_current_note]]"
words:
  2026-04-21: 59
mcp_tool: true
description: 执行用户自定义的 JavaScript 模板脚本，返回执行结果，详细请阅读[[脚本笔记]]。
inputSchema:
  type: object
  properties:
    templateContent:
      type: string
      description: 要执行的模板脚本内容（支持 Templater 语法 / 直接 JS 代码）
    extractMode:
      type: boolean
      description: 是否启用代码块提取模式（true=提取 js //templater 代码块，false=原生 <% %> 模式）
      default: false
  required:
    - templateContent
tags:
  - Publish/ObsidianZ
---




```js tpl
console.clear()
// 从 MCP 调用参数中获取用户传入的模板内容和执行模式
const { templateContent='', extractMode = false } = tp.config.extra || {};

let res = await ea.tpl.parse_templater(templateContent,extractMode);
tR = JSON.stringify({
	success: true,
	data: res,
	message: "模板执行完成"
}, null, 2);
```


