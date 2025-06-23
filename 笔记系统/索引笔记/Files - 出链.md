---
ctime: 2024-05-25 17:56
tags:
  - Publish/ObsidianZ
  - conote
  - Index
PrevNote: "[[Files - 双链]]"
NextNote: "[[Files - 笔记链]]"
words:
  2024-06-16: 49
  2024-10-15: 60
  2025-05-05: 76
  2025-05-29: 60
emoji: 📣
---


```dataviewjs
//Files - 出链.md, by Zigholding
let nc = app.plugins.getPlugin('note-chain');
let cfile = nc.chain.get_last_activate_leaf().view.file;
let files = nc.chain.get_outlinks(cfile);
let data = files.map(
	x=>dv.page(x.path)
).filter(x=>x);
dv.table(
	["出链"],
	data.map(x=>[x.file.path==cfile.path?'🏠':x.file.link])
);
```
