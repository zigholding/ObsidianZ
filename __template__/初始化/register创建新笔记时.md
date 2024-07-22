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
console.log('注册事件：创建笔记');
app.vault.on(
	"create", async (file) =>{
		if(filter(file)){
			await sleep(100);
			await app.fileManager.processFrontMatter(
				file,
				fm =>{
					let t = moment.unix(file.stat.ctime/1000);
					fm['ctime']=t.format('YYYY-MM-DD HH:mm');
				}
				
			)
		}
	}
)
-%>