<%*
// 需要安装 Templater/Dataview/Note-Chain
// 设置当前笔记为某笔记的后置笔记，同时移动至相同文件夹
let nc=app.plugins.getPlugin("note-chain");
let cfile = nc.chain.current_note;
let tfiles = nc.chain.get_all_tfiles('mtile').filter(x=>x!=cfile);
let anchor = await nc.chain.sugguster_note(tfiles);

await nc.chain.chain_insert_folder_after(cfile,anchor);
if(cfile.parent!=anchor.parent){
	let dst = anchor.parent.path+'/'+cfile.name;
	await app.fileManager.renameFile(cfile,dst);
}
await nc.explorer.sort();
-%>

