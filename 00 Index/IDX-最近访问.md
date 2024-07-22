---
ctime: 2024-05-23 21:38
tags:
  - Index
PrevNote: "[[IDX-笔记网]]"
NextNote: "[[IDX-最近修改]]"
words:
  2024-06-16: 35
---

```dataviewjs
let plugin = app.plugins.getPlugin('recent-files-obsidian');
let data = Object.values(plugin.data.recentFiles).map(
	x=>dv.page(x['path'])
).filter(x=>x);
dv.table(
	["最近访问"],
	data.map(x=>[x.file.link])
);
```
