---
tags:
  - Index
ctime: 2023-09-13 17:50
mtime: 2023-09-13 17:52
status: "[[00 Index/Index|🧭]]"
PrevNote: "[[Files - 双链]]"
NextNote: "[[Files - 同名笔记]]"
words:
  2024-06-16: 43
  2024-10-16: 52
notechain:
  level: "\t"
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


