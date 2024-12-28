---
words:
  2024-12-28: 134
PrevNote: "[[Files - 出链]]"
N: 4
NextNote: "[[今日事项4D]]"
---




```
> [!NOTE]+ 历史漫步
> 
> ```dataviewjs
> dv.span("<br>![[Files - 历史漫步#卡片|no-head]]<br>");
> ```
> 

```

## 卡片

```dataviewjs

let nc=app.plugins.getPlugin('note-chain')
let ng = await nc.utils.get_str_func(app,'cJS.NoteGallery')

let N= nc.editor.get_frontmatter(
	nc.chain.get_tfile('Files - 历史漫步'),'N'
)
let dnote,tfiles = ng.get_daily_random_notes(N)
let code = ng.code_block_for_notes(tfiles)
dv.span(code)
```

## 列表

```dataviewjs
let nc=app.plugins.getPlugin('note-chain')
let ng = await nc.utils.get_str_func(app,'cJS.NoteGallery')
let N= nc.editor.get_frontmatter(
	nc.chain.get_tfile('Files - 历史漫步'),'N'
)
let dnote,tfiles = ng.get_daily_random_notes(N)
tfiles = tfiles.map(
  x=>dv.page(x.path)
).filter(x=>x)
let title = '漫步历史'
if(dnote){
	title = dnote.basename
}
dv.table(
  [title],
  tfiles.map(x=>[x.file.link])
)
```

