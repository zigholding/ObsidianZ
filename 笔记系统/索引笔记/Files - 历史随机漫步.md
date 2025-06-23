---
PrevNote: "[[Files - 历史漫步]]"
NextNote: "[[Folders - 目录文件数]]"
words:
  2025-06-17: 98
  2025-06-18: 46
  2025-06-23: 50
tags:
  - Publish/ObsidianZ
emoji: 📣
---

```textarea
textarea: false
buttons:
  - [刷新,dataview:dataview-force-refresh-views]
```

```dataviewjs
let tfiles = ea.random.random_notes(3,(x)=>ea.nc.editor.get_frontmatter(x,'words'));
let mc = ea.ea.MediaCardAPI(dv,this.container,"[[Media Card 默认封面]]");
mc.render_notes_to_cards(tfiles,{width: app.isMobile?300:450});
```

