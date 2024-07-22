function efunc(){
	let pattern=/^\d{4}-\d{2}-\d{2}$/;
	let tfile = app.workspace.getActiveFile();
	if(tfile && tfile.basename?.match(pattern)){
		return tfile;
	}
	else{
		let nc=app.plugins.getPlugin('note-chain');
		
		let recent = app.plugins.getPlugin('recent-files-obsidian');
		if(recent){
			let files = recent.data.recentFiles.filter(x=>x.basename.match(pattern));
			if(files.length>0){
				tfile = nc.chain.get_tfile(files[0].basename);
				return tfile;
			}
		}else{
			let fname = moment().format('YYYY-MM-DD');
			tfile = nc.chain.get_tfile(fname);
			if(tfile){
				return tfile;
			}
			
			let files = app.vault.getMarkdownFiles().filter(
				x=>x.basename.match(pattern)
			);
			files = nc.chain.sort_tfiles(files,'name');
			if(files.length>0){
				return files[files.length-1];
			}
			
		}
		return null;
	}
}

module.exports = efunc;