---
ctime: 2024-05-25 17:58
tags:
  - conote
  - Index
PrevNote: "[[Files - 入链]]"
NextNote: "[[Files - 双链数量]]"
words:
  2024-06-16: 49
  2024-10-15: 60
---


```dataviewjs
//Files - 双链.md, by Zigholding
let nc = app.plugins.getPlugin('note-chain');
let cfile = nc.chain.get_last_activate_leaf().view.file;
let files = nc.chain.get_links(cfile);
let data = files.map(
	x=>dv.page(x.path)
).filter(x=>x);
dv.table(
	["双链"],
	data.map(x=>[x.file.path==cfile.path?'🏠':x.file.link])
);
```

