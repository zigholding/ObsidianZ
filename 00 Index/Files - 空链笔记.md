---
PrevNote: "[[Files - 出链]]"
words:
  2024-10-15: 90
NextNote: "[[Files - 目录]]"
ctime: 2024-09-01 12:22
---

```dataviewjs
let N=100;
let K=3; // 统计入链>K的空链
let M=0;
for(let page of dv.api.index.links.invMap.keys()){
	if(!app.vault.fileMap[page]){
		if(dv.api.index.links.invMap.get(page).size<K){
			continue;
		}
		if(N>0){
			dv.span(`<br>[[${page}]]<br>`)
			for(let x of dv.api.index.links.invMap.get(page)){
				dv.span(`-----> [[${x}]]<br>`)
			}
			N = N-1;
		}
		M = M+1;
	}
}
dv.span(`<br>总共有${M}条（入链≥${K}）的空链笔记。`)
```
