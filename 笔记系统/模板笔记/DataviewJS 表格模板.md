---
words:
  2025-06-23: 24
PrevNote: "[[年度笔记模板]]"
---

```js
let pages = dv.pages(FROM)
    .where(WHERE)
    .sort(SORT)
    .slice(0,LIMIT);

let uid = [];

dv.table(
    [],
    pages.map(p => {
	    uid.push(p);
	    return [
		    
		]
	})
);
```

