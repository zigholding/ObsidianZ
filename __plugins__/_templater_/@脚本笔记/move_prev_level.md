---
PrevNote: "[[move_none_level]]"
words:
  2024-12-10: 45
  2024-12-23: 46
notechain:
  in_a_word: 已选笔记降低等级
  level: ""
NextNote: "[[执行当前脚本笔记]]"
---

快捷键：`Ctrl+Alt+J`

```js //templater
let nc=app.plugins.plugins['note-chain']
let tfiles = nc.chain.get_selected_files()
for(let tfile of tfiles){
	let level = nc.editor.get_frontmatter(tfile,'level')
	if(level){
		await nc.editor.set_frontmatter(tfile,'level',level.slice(1))
	}
}
```


