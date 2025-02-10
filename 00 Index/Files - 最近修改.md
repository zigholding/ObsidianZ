---
PrevNote: "[[Files - 最近访问]]"
NextNote: "[[Files - 当日修改]]"
---


```dataview
// Files - 最近修改.md, by Zigholding
TABLE
	dateformat(file.mtime,"MM-dd HH:MM:ss") as mtime
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 15
```

