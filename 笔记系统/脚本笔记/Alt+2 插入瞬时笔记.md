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
NextNote: "[[Editor - 复制、替换或修改段落]]"
tags:
  - Publish/ObsidianZ
  - 脚本笔记
emoji: 📣
---

如何快速输入瞬时笔记？

一种方式借助 [[NoteChain]] 的文本框功能，在日志中嵌入输入框，点击按钮输入瞬时笔记。

~~~
```textarea
buttons:
  - [🎵,Alt+2 插入瞬时笔记,mod-cta]
```
~~~

另一种方式，通过 [[QuickAdd 将脚本笔记注册为命令]]，输入快捷键即可输入瞬时笔记。

瞬时笔记并不是添加到当日日志的，而是最近打开的日志里。

例如，今天是 `2025-06-09`，你打开了`2025-06-06`，这时输入瞬时笔记，生成的文本位于 `2025-06-06` 中。它所依赖的函数是 `nc.chain.get_last_daily_note()`，可以获取最近打开的日志文件。

那如果我想添加到当日日志，但忘了创建当日日志文件怎么办？我会在 Obsidian 启动时以及每天 00:05 自动创建当日日志。

如果想修改插入的位置，以及内容的格式，修改代码中的 `LINE` 或 `aline`。

```js //templater
let notes;
console.log(tp.config.extra)
let area = tp.config.extra?.area;
if(area){
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
let tfile = nc.chain.get_last_daily_note();
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

