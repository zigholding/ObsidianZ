<%* 
	console.clear();
	let config = tp.user.get_tp_config(tp);
	const filteredFiles_ = app.vault.getMarkdownFiles().filter(
		(file)=>(
			(file!=tp.config.target_file) | (config.frontmatter?.withSelf)
		)&(
			file.path.startsWith(tp.config.target_file.parent.path)
		)
	); 
	let filteredFiles = tp.user.sort_tfiles(
		filteredFiles_,config.frontmatter.mode,config.frontmatter.reverse
	);
	const note = (
		await tp.system.suggester(
			(file) => file.path.slice(tp.config.target_file.parent.path.length+1).slice(0,-3), filteredFiles
		)
	); 
	 if(note){
		 if(config.frontmatter?.newTab){
			app.workspace.getLeaf(true).openFile(note);
		}else{
			app.workspace.activeLeaf.openFile(note);
		}
	 }
%>