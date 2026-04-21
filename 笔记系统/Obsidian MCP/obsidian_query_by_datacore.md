---
PrevNote: "[[obsidian_get_brothers]]"
NextNote: "[[obsidian_parse_templater]]"
words:
  2026-04-21: 118
mcp_tool: true
description: 使用 Datacore 查询语言搜索 Obsidian 数据，详细语法可以访问 "[[dc.query]]" 笔记查看
inputSchema:
  type: object
  properties:
    query:
      type: string
      description: Datacore 查询语句，例如 "@page and rating > 9"
    limit:
      type: number
      description: 返回结果数量限制（默认 10）
  required:
    - query
tags:
  - Publish/ObsidianZ
---


```js tpl
const { query, limit = 10 } = tp.config.extra;

if (!query) {
  tR += JSON.stringify({
    success: false,
    error: "query is required"
  });
  return;
}

try {
  // 获取 datacore API
  const dc = app.plugins.plugins['datacore']?.api;

  if (!dc) {
    tR += JSON.stringify({
      success: false,
      error: "Datacore plugin not found"
    });
    return;
  }

  // 执行查询
  const results = ea.dc.query(query) || [];

  // 截断
  const sliced = results.slice(0, limit);

  // 统一输出结构
  const formatted = sliced.map(r => {
    return {
      id: r.$id,
      type: r.$typename,
      path: r.$path || r.$file?.path || null,
      name: r.$name || r.$file?.name || null
    };
  });

  tR += JSON.stringify({
    success: true,
    query: query,
    count: formatted.length,
    results: formatted
  });

} catch (e) {
  tR += JSON.stringify({
    success: false,
    error: e.message
  });
}
```




