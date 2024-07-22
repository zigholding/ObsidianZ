<%*
// 插件：note-chain
let nc = app.plugins.getPlugin("note-chain");
let curr = tp.config.target_file;
let path = curr.parent.path+'/'+curr.parent.name+'.md';
let dst = await nc.chain.get_tfile(path);
if(dst==null){
	dst = await tp.file.create_new(
		'',curr.parent.name,
		false,curr.parent
	);
}

await nc.chain.open_note(dst,true);
await sleep(1000);

let longform = {
	'format':'scenes',
	'title':curr.parent.name,
	'workflow':'Default Workflow',
	'sceneFolder':'/',
	'scenes':[],
	'ignoredFiles':[],
}

await app.fileManager.processFrontMatter(
	dst,
	fm =>{
		if(fm['longform']==null){
			fm['longform'] = longform;
		}
	}
)
await app.commands.executeCommandById(
	"note-chain:longform4notechain"
)
-%>