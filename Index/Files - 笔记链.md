---
ctime: 2024-05-23 22:11
tags:
  - conote
  - Index
PrevNote: "[[Files - 笔记网]]"
NextNote: "[[Files - 历史漫步]]"
words:
  2024-12-31: 64
---


```dataviewjs
// Files - 笔记链.md, by Zigholding
let nc = app.plugins.getPlugin('note-chain')
let cfile = nc.chain.get_last_activate_leaf().view.file;
let files = nc.chain.get_chain(cfile,10,10);
let data = files.map(
	x=>dv.page(x.path)
).filter(x=>x);
dv.table(
	["笔记链"],
	data.map(x=>[x.file.path==cfile.path?'🏠':x.file.link])
);
```
