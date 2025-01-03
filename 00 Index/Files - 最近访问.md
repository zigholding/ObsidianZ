---
PrevNote: "[[Files - 目录]]"
NextNote: "[[Files - 入链]]"
words:
  2024-12-14: 51
---

```dataviewjs
// Files - 最近访问​.md, by Zigholding
let plugin = app.plugins.getPlugin('recent-files-obsidian');
let data = Object.values(plugin.data.recentFiles).map(
	x=>x['path']
).filter(x=>x).map(
	x=>dv.page(x)
).filter(x=>x);
dv.table(
	["最近访问"],
	data.map(x=>[x.file.link])
);
```
