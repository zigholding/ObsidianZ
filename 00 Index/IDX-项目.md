---
ctime: 2024-05-26 01:15
PrevNote: "[[IDX-双链数量]]"
NextNote: "[[IDX-Tag]]"
words:
  2024-06-16: 215
  2024-07-15: 240
---

```dataviewjs

function tfiles_to_table(tfiles,title='Files'){
	let gprivate = false;
	let glasses = app.plugins.plugins['privacy-glasses'];
	if(glasses && glasses.currentLevel=='hide-all'){
		gprivate = true;
	}
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
			[title],
			data.map(x=>[x.file.link])
		);
	}
	
}
function get_project_notes(cfile){
	let res = [cfile];
	let tmp = nc.chain.get_next_note(cfile);
	while (tmp && !dv.index.tags.delegate.map.get(tmp.path)?.has('#project')){
		res.push(tmp);
		tmp = nc.chain.get_next_note(tmp);
	}
	
	while (!dv.index.tags.delegate.map.get(cfile.path)?.has('#project')){
		tmp = nc.chain.get_prev_note(cfile);
		while (tmp && !dv.index.tags.delegate.map.get(tmp.path)?.has('#project')){
			res.unshift(tmp);
			tmp = nc.chain.get_prev_note(tmp);
		}
	}
	return res;
}
let nc = app.plugins.getPlugin('note-chain');
let projects = Array.from(dv.index.tags.delegate.invMap.get(
	'#Project/⭐Star'.toLowerCase())
)
let files = projects.map(x=>app.vault.getFileByPath(x));
files = nc.chain.sort_tfiles_by_field(files,['NID']);
for(let file of files){
	let tfiles = get_project_notes(file);
	let title = file.basename;
	if(tfiles.length>0){
		let t=Math.max(...tfiles.map(x=>x.stat.ctime));
		title = title + moment.unix(t/1000).format('@MM-DD');
	}
	tfiles_to_table(tfiles,title,true);
}
```

