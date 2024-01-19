<%* 
	console.clear();
	let config = tp.user.get_tp_config(tp);
	let files = tp.user.get_file_chain(
		tp,tp.config.target_file,
		config.frontmatter.prev,
		config.frontmatter.next
	);
	if(config.frontmatter.sameFolder){
		files= files.filter(
			(file)=>(
				(file!=tp.config.target_file) | (config.frontmatter?.withSelf)
			)&(
				file.path.startsWith(tp.config.target_file.parent.path)
			)
		); 
	}
	console.log(files);
	const note = (
		await tp.system.suggester(
			(file) => file.path.slice(tp.config.target_file.parent.path.length+1).slice(0,-3), files
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