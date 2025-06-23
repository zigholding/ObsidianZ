---
tags:
  - Publish/ObsidianZ
  - Index
ctime: 2023-09-13 17:50
mtime: 2023-09-13 17:52
status: "[[Index|🧭]]"
PrevNote: "[[Files - 笔记网]]"
NextNote: "[[Files - 同名笔记]]"
words:
  2024-06-16: 43
  2024-10-16: 52
  2025-06-10: 68
emoji: 📣
---

```dataview
// Files - 最近修改.md, by Zigholding
TABLE
	length(file.inlinks) as 入链,
	length(file.outlinks) as 出链
WHERE length(file.inlinks)>0 and
!contains(file.folder,"日记20") and
!contains(file.folder,"Archive")
SORT ((length(file.inlinks)+1)*(length(file.outlinks)+1)) DESC
limit 20
```



- (t::2025-05-05) (name::AI标签)： #双链数量 #笔记统计 #Obsidian
