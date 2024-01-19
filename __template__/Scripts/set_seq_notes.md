<%* 
if(tp.config.template_file.path!=tp.config.target_file.path){
	let config = tp.user.get_tp_config(tp);
	const files = app.vault.getMarkdownFiles().filter(
		file=>{
			return file.parent==tp.config.target_file.parent;
		}
	).sort(
		(a,b)=>(a.stat.ctime-b.stat.ctime)
	);  
	if(config.frontmatter.mode.localeCompare("重置按创建日期关联")==0){
		console.log("here");
		for(let i=0;i<files.length-1;i++){
			 await tp.user.set_seq_notes(files[i],files[i+1]);
		 }
		 app.fileManager.processFrontMatter(files[0],fm =>{
			fm["PrevNote"] = null;
		});
		app.fileManager.processFrontMatter(files[files.length-1],fm =>{
			fm["NextNote"] = null;
		});
	}else{
		for(let i=0;i<files.length-1;i++){
			 console.log(files[i].path);
			 let meta = app.metadataCache.getFileCache(files[i]);
			 if(!meta | (!meta.frontmatter.PrevNote & !meta.frontmatter.NextNote)){
				 await tp.user.set_seq_notes(files[i],files[i+1]);
			 }
		 }
		 console.log(files[files.length-1].path);
		 let meta = app.metadataCache.getFileCache(files[files.length-1]);
		 if(!meta | (!meta.frontmatter.PrevNote & !meta.frontmatter.NextNote)){
			 await  tp.user.set_seq_notes(files[files.length-2],files[files.length-1]);
		 }
	}
}else{
	let config = tp.user.get_tp_config(tp);
	console.log(config.frontmatter.mode.localeCompare("重置按创建日期关联"));
	console.log(tp.user.get_tp_config(tp));
}
%>