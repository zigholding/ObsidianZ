---
PrevNote: "[[脚本笔记]]"
words:
  2025-02-08: 584
  2025-02-28: 570
  2025-03-29: 353
  2025-03-30: 20
notechain:
  level: "\t"
NextNote: "[[Alias - 修改别名]]"
tags:
  - Publish/ObsidianZ
  - 脚本笔记
emoji: 📣
---



```js //templater
let area = tp.config.extra.area;
let ctx = area.value.trim()
await customJS.DailyJob.run(ctx)
area.value=''
```



