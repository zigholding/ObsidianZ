---
tags:
  - Index
PrevNote: "[[Files - 最近访问]]"
NextNote: "[[Files - 当日修改]]"
ctime: 2024-05-26 13:31
words:
  2024-06-16: 23
  2024-10-16: 32
  2025-05-05: 48
  2025-06-10: 32
---

```dataview
// Files - 最近修改.md, by Zigholding
TABLE
	dateformat(file.mtime,"MM-dd HH:MM:ss") as mtime
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 25
```


