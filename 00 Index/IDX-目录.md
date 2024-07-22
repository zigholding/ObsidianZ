---
ctime: 2024-05-23 22:07
tags:
  - Index
PrevNote: "[[IDX-双链]]"
NextNote: "[[IDX-笔记链]]"
words:
  2024-06-16: 57
---

```dataviewjs
let nc = app.plugins.getPlugin('note-chain')
let cfile = nc.chain.current_note;
let files = nc.chain.get_brothers(cfile);
files = nc.chain.sort_tfiles_by_chain(files);
let data = files.map(
	x=>dv.page(x.path)
).filter(x=>x);
dv.table(
	["目录"],
	data.map(x=>[x.file.path==cfile.path?'🏠':x.file.link])
);
```