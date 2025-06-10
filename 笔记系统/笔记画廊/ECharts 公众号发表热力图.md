---
PrevNote: "[[ECharts 每日编辑字数热力图日历]]"
NextNote: "[[Files - 出链]]"
类库笔记:
  - "[[ECharts 绘制热力图日历]]"
words:
  2025-06-02: 100
  2025-06-03: 43
  2025-06-04: 117
  2025-06-08: 128
  2025-06-10: 148
---



```dataviewjs
let nc = app.plugins.getPlugin('note-chain')
let cfile = nc.chain.get_tfile(dv.currentFilePath);
let js_notes = nc.editor.get_frontmatter(cfile,'类库笔记');
if(!js_notes){js_notes=[]}
for(let js of js_notes){
	await nc.utils.parse_templater(app,js)
}

let tfile = nc.chain.get_tfile('公众号历史文章');
let tfiles = nc.chain.get_brothers(tfile);
let daily = {};
tfiles.forEach(x=>{
	let fm = app.metadataCache.getFileCache(x).frontmatter;
	if(fm?.date?.length==10){
		daily[fm.date] = fm.readCount
	}
})
let year = moment().year();
let hmap = new app.tpl.HeatmapCalendar(dv,year);
for(let k in daily){
	if(k.localeCompare('2023-11-01')<0){
		delete daily[k]
	}
}
console.log(daily)
if(this.container.querySelectorAll('div.echarts-container').length==0){
	hmap.render_daily_value(this.container,daily,"公众号文章发表与阅读数",true,'2+13');
}
app.c = this.container
```

