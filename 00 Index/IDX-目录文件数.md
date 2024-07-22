---
ctime: 2024-05-25 21:22
PrevNote: "[[今日事项Tab]]"
words:
  2024-06-16: 79
---



```dataviewjs
let nc = app.plugins.getPlugin('note-chain');
let cfile = nc.chain.current_note;
let folders = nc.chain.get_all_folders();
let data = folders.map(x=>[
	dv.func.link(x.path+'/'+x.name+'.md'),
	x.children.filter(x=>x.extension=='md').length,
	app.vault.getFileByPath(x.path+'/'+x.name+'.md')==null?'✔️':''
]);
data = data.filter(x=>x[1]>=20);
data = data.sort((b,a)=>a[1]-b[1]);
dv.table(
	["笔记链",'N','目录笔记'],
	data
);
```
