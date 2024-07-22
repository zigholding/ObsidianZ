---
ctime: 2023-09-13 17:50
mtime: 2023-09-13 17:52
tags:
  - Index
status: "[[00 Index/Index|🧭]]"
PrevNote: "[[IDX-最近修改]]"
NextNote: "[[IDX-项目]]"
words:
  2024-06-16: 43
---

```dataview
TABLE
	length(file.inlinks) as 入链,
	length(file.outlinks) as 出链
WHERE length(file.inlinks)>0 and
!contains(file.folder,"日记20") and
!contains(file.folder,"Archive")
SORT ((length(file.inlinks)+1)*(length(file.outlinks)+1)) DESC
limit 20
```


