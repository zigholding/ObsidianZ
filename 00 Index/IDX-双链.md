---
ctime: 2024-05-25 17:58
tags:
  - Index
PrevNote: "[[IDX-出链]]"
NextNote: "[[IDX-目录]]"
words:
  2024-06-16: 49
---


```dataviewjs
let nc = app.plugins.getPlugin('note-chain');
let cfile = nc.chain.current_note;
let files = nc.chain.get_links(cfile);
let data = files.map(
	x=>dv.page(x.path)
).filter(x=>x);
dv.table(
	["双链"],
	data.map(x=>[x.file.path==cfile.path?'🏠':x.file.link])
);
```

