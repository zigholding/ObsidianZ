---
ctime: 2023-08-29 23:38
mtime: 2023-08-29 23:38
tags:
  - Index
PrevNote: "[[00 Index]]"
NextNote: "[[IDX-入链]]"
words:
  2024-06-16: 79
---

所有出入链接 `[[🧭Index]]` 或标签含 `🧭Index`的[[索引笔记]]。

```dataview
table without ID  
	file.link as LINK
where (
	contains(file.tags, this.file.name) or
	contains(file.inlinks, link(this.file.name)) or 
	contains(file.outlinks, link(this.file.name)) or
	status=link(this.file.name)
	
) and 
file.name!=this.file.name and
file.name!="索引笔记" and
!contains(file.folder,"__template__")

sort file.path
```


