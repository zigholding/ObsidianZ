---
words:
  2024-08-03: 126
  2025-05-05: 142
  2025-05-13: 126
PrevNote: "[[Files - 最近修改]]"
NextNote: "[[Files - 入链]]"
tag:
  - conote
tags:
  - Publish/ObsidianZ
emoji: 📣
---


```dataviewjs
let nc=app.plugins.getPlugin('note-chain');

function tfiles_to_table(tfiles,title='Files',gprivate=false){
	if(gprivate){
		let data = tfiles.map(
			x=>dv.page(x.path)
		).filter(x=>x);
		dv.table(
			['#'.repeat(title.length)],
			data.map(x=>[dv.func.link(x.file.link,'='.repeat(x.file.name.length))])
		);
	}else{
		let data = tfiles.map(
			x=>dv.page(x.path)
		).filter(x=>x);
		dv.table(
			[t,'当日字数'],
			data.map(x=>[
				x.file.link,
				nc.wordcout.get_new_words(x.file,t)
			]).sort((a,b)=>a[1]-b[1])
		);
	}
	
}

let tfile = nc.chain.get_last_daily_note();
let t = tfile.basename;
let files = app.vault.getMarkdownFiles().filter(x=>Math.abs(nc.wordcout.get_new_words(x,t))>0)
tfiles_to_table(files.slice(0,100));
```