---
NextNote: "[[今日事项Tab]]"
PrevNote: "[[Files - 双链数量]]"
words:
  2024-10-25: 173
  2024-11-03: 288
ctime: 2024-09-01 09:19
---

Obsidian 中，引用两个同名笔记时，其中一个会带上路径，显得很丑。  

因此在我的库中，强制不出现同名笔记。

如果有的话，就删除或修改其中一个。

为方便决定删除哪条笔记，查看 Obsidian 库中的同名笔记，打印创建时间、修改时间、文件大小、入链和出链数量。


![[Pasted image 20241103130822.png]]


```dataviewjs
function myfunc(rlinks){
	let res = [];
	for(let path of rlinks){
		let meta = dv.page(path); 
		if(!meta){
			res.push([]);
			continue;
		}
		app.tmp = meta;
		dv.span(`[[${meta.file.path}]]`);
		dv.span("<br><br>");
		let item = [
			meta.file.link,
			dv.func.dateformat(meta.file.ctime,"yyyy-MM-dd"),
			dv.func.dateformat(meta.file.mtime,"yyyy-MM-dd"),
			Math.round(meta.file.size),
			meta.file.inlinks.length,
			meta.file.outlinks.length,
		];
		res.push(item);
	}
	return res;
}

function get_duplicates_files(app,debug=true){
	const pairs = {};
	let files = Object.keys(app.vault.fileMap);
	for(let path of files){
		let file = app.vault.fileMap[path];
		
		if(!file){continue;}
		if(file.children){continue;}
		if(file.extension.localeCompare('md')!=0){continue;}
		
		if(pairs[file.basename.toLowerCase()]){
			pairs[file.basename.toLowerCase()].push(file.path);
		}else{
			pairs[file.basename.toLowerCase()] = [file.path]
		}
	}
	return Object.values(pairs).filter(
		paths => paths.length > 1
	);
}

let pairs = get_duplicates_files(app);
dv.span(`## 共有 ${pairs.length} 组同名笔记`);
for(let key of Object.keys(pairs)){
	let table = myfunc(pairs[key]);
	dv.table(
		[
		"笔记", "ctime",
		"mtime","size","in","out"
		],
		table
	);
	break // 是否一次显示所有
}
```

