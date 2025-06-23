---
tags:
  - Publish/ObsidianZ
  - Index
ctime: 2024-05-23 21:38
PrevNote: "[[Files - 目录]]"
NextNote: "[[Files - 最近修改]]"
words:
  2024-06-16: 35
  2024-08-03: 41
  2024-10-16: 51
emoji: 📣
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
