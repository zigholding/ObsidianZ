---
target: test
tags:
  - Index
PrevNote: "[[IDX-项目]]"
NextNote: "[[IDX-电脑常用命令]]"
ctime: 2024-05-26 13:31
words:
  2024-06-16: 70
---

```dataview
TABLE without ID
	file.link as 标题, 
	this.target,
	status,
	NID,
	PrevNote,
	NextNote,
	dateformat(file.mtime,"MM-dd HH:mm") as 修改,
	round(file.size/3) as 字数
WHERE (
	(
		contains(
			file.folder, 
			this.target
		)
	) or
	(
		contains(
			file.tags,
			this.target
		)
	) or
	(
		contains(
			file.outlinks,
			link(this.target)
		)
	) or
	(
		contains(
			file.inlinks,
			link(this.target)
		)
	)
) and 
file.name!=this.file.name
SORT NID,file.mtime desc
LIMIT 100
```

