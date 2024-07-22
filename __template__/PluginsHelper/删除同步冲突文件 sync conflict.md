<%*
// 删除 syncthing 同步产生的冲突文件
let files = app.vault.getFiles()
for(let file of files){
	if(file.name.contains('.sync-conflict-')){
		new Notice(file.name,5000);
		await app.fileManager.trashFile(file);
	}
}
-%>