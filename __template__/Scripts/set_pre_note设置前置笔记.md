<%* 
if(tp.config.template_file.path!=tp.config.target_file.path){
	const filteredFiles = app.vault.getMarkdownFiles().sort(
		(a,b)=>(b.stat.mtime-a.stat.mtime)
	).filter(
		(file)=>file!=tp.config.target_file &file.parent==tp.config.target_file.parent
	); 
	const note = (
	await tp.system.suggester(
		(file) => file.path, filteredFiles
	)
	); 
	tp.user.set_seq_notes(note,tp.config.target_file);
}else{
	console.log(app.plugins.plugins.dataview.api);
}
%>