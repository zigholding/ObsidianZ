<%*
function filter(tfile){
	let items = ['__template__'];
	for(let item of items){
		if(tfile.path.startsWith(item)){
			return false;
		}
	}
	return true;
}
let files = app.vault.getMarkdownFiles();
files = files.filter(x=>filter(x));
console.log(files);
let i = 1;
for(let file of files){
	try{
		console.log(`${i}/${files.length}:${file.basename}`);
		i = i+1;
		await app.fileManager.processFrontMatter(
			file,
			fm =>{
				if(fm['ctime']==null||fm['ctime']=='Invalid date'){
					let t = moment.unix(file.stat.ctime/1000);
					fm['ctime']=t.format('YYYY-MM-DD HH:mm');
					console.log('--->',fm['ctime'])
				}
			}
		)
	}catch(error){
		console.log(error);
	}
}
-%>