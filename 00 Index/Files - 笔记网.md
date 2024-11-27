---
ctime: 2023-12-02 15:27
tags:
  - conote
  - Index
paramNType: 0
paramLevel: 2
paramLimit: 15
paramXTags:
  - Period/Daily
status: "[[Index|🧭]]"
NextNote: "[[Files - 出链]]"
PrevNote: "[[Files - 笔记链]]"
words:
  2024-06-16: 320
  2024-08-29: 323
  2024-10-16: 347
---


```dataviewjs
// Files - 笔记网.md, by Zigholding

function has_same_value(arr1,arr2){
	if(!arr1) return false;
	for(let x of arr1){
		if(arr2.includes(x)){
			return true;
		}
	}
	return false;
}

function get_neighors(path,ntype=0){
	let meta = dv.page(path); 
	if (!meta){
		console.log("不存在文件：",path);
		return [];
	} else {
		if(ntype==-1){
			return meta.file.inlinks.array()
		}else if(ntype==1){
			return meta.file.outlinks.array()
		}else{
			return meta.file.inlinks.concat(
				meta.file.outlinks
			).array()
		}
	}
}

function get_indirectly_links(
	path,N=0,LIMIT=20,paramXTags=[],ntype=0
){
	// 查询结果 {path:level}
	if(N<0) return {};
	if(path==null){
		path = dv.app.workspace.lastActiveFile.path
	}
	let meta = dv.page(path); 
	if (!meta){
		return {path:[0,path]};
	}else{
		path = meta.file.path;
	}
	let rlinks = {};
	let seeds = []
	seeds.push(path);
	rlinks[path] = [0,path];
	while(seeds.length >0){
		let curr = seeds.shift();
		let level = rlinks[curr][0];
		
		if(level>=N){
			continue;
		}
	
		let neighbors = get_neighors(curr,ntype=ntype);
		let cmeta = dv.page(curr);
		if(cmeta){
			if(has_same_value(cmeta.tags,paramXTags)){
				continue;
			}
		}
		for(let link of neighbors){
			if(!dv.func.endswith(link.path,".md")){
				continue
			}
			if(Object.keys(rlinks).length>LIMIT){
				break;
			}
			let cpath = link.path;
			if(cpath in rlinks){
				rlinks[cpath][0] = Math.min(rlinks[cpath][0],level+1);
			}else{
				seeds.push(cpath);
				rlinks[cpath] = [level+1,curr];
			}
		}
	}
	return rlinks;
}

function get_link(path){
	let meta = dv.page(path); 
	if(!meta){
		return path;
	}else{
		return meta.file.link;
	}
}

function mfunc(rlinks){
	let res = [];
	for(let path in rlinks){
		let meta = dv.page(path); 
		if (!meta){
			res.push([path,rlinks[path][0],get_link(rlinks[path][1])]);
		}else{
			let item = [
				rlinks[path][0],
				meta.file.link,
				get_link(rlinks[path][1])
			];
			res.push(item);
		}
	}
	return res;
}

let cpage = dv.current(); 

let nc = app.plugins.getPlugin('note-chain')
let cfile = nc.chain.get_last_activate_leaf().view.file;

let rlinks = get_indirectly_links(
	cfile.name,
	cpage.paramLevel,
	cpage.paramLimit,
	cpage.paramXTags,
	cpage.paramNType
);
console.log(rlinks)
let table = mfunc(rlinks);
dv.table(
	["层数", "笔记网","上层笔记"],
	table
);
```


