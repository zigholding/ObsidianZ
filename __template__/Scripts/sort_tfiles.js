
let metadataCache = app.metadataCache;


function xreverse(res,reverse){
	if(reverse){
		return res.reverse()
	}else{
		return res;
	}
}

/**
 * 返回 TFile 对象
 * @param {string} ( - 文件路径，/index.md, index,index.md,[[index]]
 */
function sort_tfiles(files,mode,reverse=false){
	if(mode.localeCompare("name")==0){
		let res = files.sort(
			(a,b)=>(a.name.localeCompare(b.name))
		);
		return xreverse(res,reverse);
	}else if(mode.localeCompare("mtime")==0){
		let res = files.sort(
			(a,b)=>(a.stat.mtime-b.stat.mtime)
		)
		return xreverse(res,reverse);
	}else if(mode.localeCompare("ctime")==0){
		let res = files.sort(
			(a,b)=>(a.stat.ctime-b.stat.ctime)
		)
		return xreverse(res,reverse);
	}else if(mode.localeCompare("chain")==0){
		console.log("--->",mode,reverse);
		let res = files.sort(
			(a,b)=>{
				let ameta = app.metadataCache.getFileCache(a).frontmatter;
				let bmeta = app.metadataCache.getFileCache(b).frontmatter;
				if(!ameta & !bmeta){
					return 0;
				}else if(!ameta){
					return bmeta[mode];
				}else if(!bmeta){
					return ameta[mode];
				}else{
					console.log(a.name,b.name,ameta[mode]-bmeta[mode]);
					return ameta[mode]-bmeta[mode];
				}
			}
		)
		return xreverse(res,reverse);
	}else{
		let res = files.sort(
			(a,b)=>{
				let ameta = app.metadataCache.getFileCache(a).frontmatter;
				let bmeta = app.metadataCache.getFileCache(b).frontmatter;
				if(!ameta & !bmeta){
					return 0;
				}else if(!ameta){
					return bmeta[mode];
				}else if(!bmeta){
					return ameta[mode];
				}else{
					console.log(a.name,b.name,ameta[mode]-bmeta[mode]);
					return ameta[mode]-bmeta[mode];
				}
			}
		)
		return xreverse(res,reverse);
	}

	
}

module.exports = sort_tfiles;
