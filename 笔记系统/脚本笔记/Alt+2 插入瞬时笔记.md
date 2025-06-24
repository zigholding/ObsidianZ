---
PrevNote: "[[Alt+1 插入任务]]"
hotkey: Alt+2
words:
  2024-11-05: 153
  2024-11-07: 159
  2024-11-23: 112
  2024-11-24: 115
  2024-11-25: 134
  2025-06-04: 149
  2025-06-09: 392
  2025-06-12: 397
  2025-06-24: 248
NextNote: "[[Editor - 复制、替换或修改段落]]"
tags:
  - Publish/ObsidianZ
  - 脚本笔记
emoji: 📣
---

[[2025-06-24]]：
- 判断是否是任务，是的话交由 [[Alt+1 插入任务]] 处理；

[[2025-06-09]]：
- 读取 `textarea` 或 弹窜输入，在 `LINE='> [!note]+ 瞬时 Fleeting\n'` 后面插入瞬时笔记：

[[2024-11-05]]：
- 读取弹窜输入，在 `LINE='> [!note]+ 瞬时 Fleeting\n'` 后面插入瞬时笔记：


```js //templater
let notes;
let area = tp.config.extra?.area;
if(area){
	let task = ea.time.extract_chinese_date(area.value);
	if(task.date){
		await ea.nc.utils.parse_templater(app,'Alt+1 插入任务',true,{area:area});
		return
	}
	// NoteChain Textarea 调用
	notes = area.value;
	
}else{
	// 通过 quickadd 输入
	let qa = app.plugins.plugins['quickadd'].api;
	notes = await qa.inputPrompt('🎵fleeting','Type text here');
	if(!notes){return}
}
notes = notes.trim();
if(!notes){return}


let TODAY = moment().format('YYYY-MM-DD')
let LINE = '> [!note]+ 瞬时 Fleeting\n';
let tfile = ea.nc.chain.get_last_daily_note();
if(!tfile){return}
let ctx = await app.vault.cachedRead(tfile)

for(let aline of notes.split('\n')){
	aline = aline.trim();
	if(!aline){continue}
	aline = `- ${moment().format('HH:mm')} ${aline}  (s::m)`
	let idx = ctx.indexOf(LINE)
	if(idx==-1){
		ctx = `${ctx}\n\n${aline}`
	}else{
		ctx = `${ctx.slice(0,idx+LINE.length)}\n${aline}${ctx.slice(idx+LINE.length)}`
	}
}

await app.vault.modify(tfile,ctx)

if(area){
	area.value = '';
}
```

