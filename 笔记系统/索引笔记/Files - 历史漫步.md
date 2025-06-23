---
words:
  2024-12-28: 148
  2025-05-05: 164
  2025-05-13: 148
  2025-06-17: 150
  2025-06-18: 68
  2025-06-19: 84
  2025-06-22: 89
  2025-06-23: 93
PrevNote: "[[Files - 空链笔记]]"
NextNote: "[[Files - 历史随机漫步]]"
tags:
  - Publish/ObsidianZ
emoji: 📣
---


## 卡片

```dataviewjs
let tfiles = ea.random.random_daily_notes(3,true,(x)=>ea.nc.editor.get_frontmatter(x,'words'))
let mc = ea.ea.MediaCardAPI(dv,this.container,"[[Media Card 默认封面]]");
mc.render_notes_to_cards(tfiles,{width:600});
```

## 列表


```dataviewjs
let tfiles = ea.random.random_daily_notes(3,true,(x)=>ea.nc.editor.get_frontmatter(x,'words'))
let dnote = ea.nc.chain.get_last_daily_note()

let title = dnote? dnote.basename:'漫步历史';

dv.table(
    [title],
    tfiles.map(x => [dv.func.link(x.path,x.basename)])
)
```


