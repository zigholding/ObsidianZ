
> [!NOTE] 重复笔记

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
		
		if(pairs[file.basename]){
			pairs[file.basename].push(file.path);
			if(debug){
				let table = myfunc(pairs[file.basename]);
				dv.table(
					[
					"笔记", "ctime",
					"mtime","size","in","out"
					],
					table
				);
				break;
			}
		}else{
			pairs[file.basename] = [file.path]
		}
	}
	return Object.values(pairs).filter(
		paths => paths.length > 1
	);
}

let res = get_duplicates_files(app);
if(res.length==0){
	dv.span("没有重复笔记");
}
```


> [!NOTE] 空链笔记

```dataviewjs
let N=100;
let K=3; // 统计返链>K的空链
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
dv.span(`<br>总共有${M}条（出链≥${K}）的空链笔记。`)
```
