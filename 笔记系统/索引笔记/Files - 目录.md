---
ctime: 2024-05-23 22:07
tags:
  - conote
  - Index
PrevNote: "[[索引笔记]]"
NextNote: "[[Files - 最近访问]]"
words:
  2024-06-16: 57
  2024-09-06: 63
  2024-10-16: 70
  2025-02-19: 118
  2025-05-05: 134
  2025-05-15: 118
  2025-06-10: 70
---
 
```dataviewjs
// Files - 目录.md, by Zigholding
let nc = app.plugins.getPlugin('note-chain')
let cfile = nc.chain.get_last_activate_leaf().view.file;
if(cfile){
	let files = nc.chain.get_brothers(cfile);
	files = nc.chain.sort_tfiles_by_chain(files);
	let data = files.map(
		x=>dv.page(x.path)
	).filter(x=>x);
	dv.table(
		["目录"],
		data.map(x=>[x.file.path==cfile.path?'🏠':x.file.link])
	);
}
```

