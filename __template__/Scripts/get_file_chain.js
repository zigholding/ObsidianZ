

function get_tfile(path){
	let files = app.vault.getMarkdownFiles();
	if(files.includes(path)){
		return files[path]
	}
	for(let file of files){
		if(file.name.localeCompare(path)==0){
			return file;
		}
		if(file.basename.localeCompare(path)==0){
			return file;
		}
		if(`[[${file.basename}]]`.localeCompare(path)==0){
			return file;
		}
	}
	return null;
}

function get_file_chain(tp,f,prev=10,next=10){
	let res = Array();
	res.push(f);
	
	let tmp = f;
	for(i=prev;i!=0;i--){
		let meta = app.metadataCache.getFileCache(tmp);
		
		if(!meta){break}

		let name = meta.frontmatter?.PrevNote;
		if(!name){break}

		let note = get_tfile(name);
		if(!note | res.includes(note)){
			break;
		}else{
			res.unshift(note);
			tmp = note;
		}
	}

	tmp = f;
	for(i=next;i!=0;i--){
		let meta = app.metadataCache.getFileCache(tmp);
		
		if(!meta){break}

		let name = meta.frontmatter?.NextNote;
		if(!name){break}

		let note = get_tfile(name);
		if(!note | res.includes(note)){
			break;
		}else{
			res.push(note);
			tmp = note;
		}
	}
	return res;

}

module.exports = get_file_chain;
