---
PrevNote: "[[move_next_level]]"
NextNote: "[[move_prev_level]]"
notechain:
  in_a_word: 已选笔记删除等级
words:
  2024-12-10: 42
  2024-12-23: 43
level: ""
---

快捷键：`Ctrl+Alt+K`

```js //templater
let nc=app.plugins.plugins['note-chain']
let tfiles = nc.chain.get_selected_files()
for(let tfile of tfiles){
	let level = nc.editor.get_frontmatter(tfile,'level')
	if(level){
		await nc.editor.set_frontmatter(tfile,'level',"")
	}
}
```