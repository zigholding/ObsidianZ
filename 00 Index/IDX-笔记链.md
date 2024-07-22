---
ctime: 2024-05-23 22:11
tags:
  - Index
PrevNote: "[[IDX-目录]]"
NextNote: "[[IDX-笔记网]]"
words:
  2024-06-16: 52
---


```dataviewjs
let nc = app.plugins.getPlugin('note-chain');
let cfile = nc.chain.current_note;
let files = nc.chain.get_chain(cfile,10,10);
let data = files.map(
	x=>dv.page(x.path)
).filter(x=>x);
dv.table(
	["笔记链"],
	data.map(x=>[x.file.path==cfile.path?'🏠':x.file.link])
);
```