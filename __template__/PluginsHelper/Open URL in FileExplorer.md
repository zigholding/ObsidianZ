<%*
// 需要安装 Templater/Dataview/Note-Chain
let nc=app.plugins.getPlugin("note-chain");
let ve=app.plugins.getPlugin("vault-exporter");
async function main(tfile,inlinks=false,outlinks=true,only_attachment=false){
	let items = [];
    if(inlinks){
        let links = nc.chain.get_inlinks();
        for(let i of links){
            if(only_attachment&& (i.extension==='md')){continue;}
			if(i.extension==='md'){
				items['⬅🔗️'+i.basename] = i.path;
			}else{
				items['⬅️🔗'+i.name] = i.path;
			}

        }
    }
    if(outlinks){
        let links = nc.chain.get_outlinks();
        for(let i of links){
            if(only_attachment&& (i.extension==='md')){continue;}
			if(i.extension==='md'){
				items['🔗➡️'+i.basename] = i.path;
			}else{
				items['🔗➡️'+i.name] = i.path;
			}
        }
    }
	if(Object.keys(items).length==0){return;}
	let item = await nc.chain.tp_suggester(
        nc.utils.array_prefix_id(Object.keys(items)),
        Object.values(items),
    )
    if(!item){return;}
    let note = nc.chain.get_tfile(item);
    if(note){
		let item = ve.fsEditor.abspath(note);
		item = ve.fsEditor.path.dirname(item);
		open(`file:///${item}`);
		return;
    }
}
let tfile = nc.chain.current_note;
await main(tfile,true,true,false);
-%>