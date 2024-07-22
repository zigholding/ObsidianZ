---
tags:
  - Index
PrevNote: "[[IDX-最近访问]]"
NextNote: "[[IDX-双链数量]]"
ctime: 2024-05-26 13:31
words:
  2024-06-16: 23
---

```dataview
TABLE
	dateformat(file.mtime,"MM-dd HH:MM:ss") as ctime
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 15
```
