---
ctime: 2024-05-25 17:56
tags:
  - Publish/ObsidianZ
  - conote
  - Index
PrevNote: "[[Files - 当日修改 DC]]"
NextNote: "[[Files - 双链]]"
words:
  2024-06-16: 49
  2024-10-15: 60
  2025-05-05: 76
  2025-05-29: 60
emoji: 📣
---


```dataviewjs
//Files - 入链.md, by Zigholding
let nc = app.plugins.getPlugin('note-chain');
let cfile = nc.chain.get_last_activate_leaf().view.file;
let files = ea.file.get_inlinks(cfile);
let data = files.map(
	x=>dv.page(x.path)
).filter(x=>x);
dv.table(
	["入链"],
	data.map(x=>[x.file.path==cfile.path?'🏠':x.file.link])
);
```


