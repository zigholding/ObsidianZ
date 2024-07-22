---
ctime: 2024-05-25 17:56
tags:
  - Index
PrevNote: "[[Index]]"
NextNote: "[[IDX-出链]]"
words:
  2024-06-16: 49
---


```dataviewjs
let nc = app.plugins.getPlugin('note-chain');
let cfile = nc.chain.current_note;
let files = nc.chain.get_inlinks(cfile);
let data = files.map(
	x=>dv.page(x.path)
).filter(x=>x);
dv.table(
	["入链"],
	data.map(x=>[x.file.path==cfile.path?'🏠':x.file.link])
);
```

