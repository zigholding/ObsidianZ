---
ctime: 2024-05-23 22:11
tags:
  - Publish/ObsidianZ
  - conote
  - Index
PrevNote: "[[Files - 出链]]"
NextNote: "[[Files - 笔记网]]"
words:
  2024-06-16: 52
  2024-10-16: 64
  2025-06-12: 79
emoji: 📣
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

- (t::2025-05-05) (name::AI标签)： #笔记链 #Obsidian #笔记管理
