---
ctime: 2024-05-25 17:58
tags:
  - Publish/ObsidianZ
  - conote
  - Index
PrevNote: "[[Files - 入链]]"
NextNote: "[[Files - 出链]]"
words:
  2024-06-16: 49
  2024-10-15: 60
  2025-06-10: 76
emoji: 📣
---


```dataviewjs
//Files - 双链.md, by Zigholding
let nc = app.plugins.getPlugin('note-chain');
let cfile = nc.chain.get_last_activate_leaf().view.file;
let files = ea.file.get_links(cfile);
let data = files.map(
	x=>dv.page(x.path)
).filter(x=>x);
dv.table(
	["双链"],
	data.map(x=>[x.file.path==cfile.path?'🏠':x.file.link])
);
```


- (t::2025-05-05) (name::AI标签)： #双链笔记 #笔记管理 #Obsidian
