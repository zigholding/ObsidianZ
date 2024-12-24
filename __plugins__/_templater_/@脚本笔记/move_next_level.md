---
PrevNote: "[[@脚本笔记]]"
words:
  2024-12-10: 55
  2024-12-23: 56
level: ""
NextNote: "[[move_none_level]]"
notechain:
  in_a_word: 已选笔记追加等级
---

快捷键：`Ctrl+Alt+L`

```js //templater
let nc=app.plugins.plugins['note-chain']
let tfiles = nc.chain.get_selected_files()
for(let tfile of tfiles){
	let level = nc.editor.get_frontmatter(tfile,'level')
	if(!level){
		await nc.editor.set_frontmatter(tfile,'level',"\t")
	}else{
		await nc.editor.set_frontmatter(tfile,'level',level+"\t")
	}
}
```

