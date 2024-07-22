<%*
// 需要安装 Templater/Dataview/Note-Chain
// 空格：%20
// (:%28;):%29
let nc=app.plugins.getPlugin("note-chain");
let ve=app.plugins.getPlugin("vault-exporter");
async function main(tfile,items,inlins=true,outlinks=true,onlymd=false,suffix={}){
    let tmp;
    tmp = nc.editor.get_frontmatter(tfile,'github');
    if(tmp){
        if(tmp.contains('github.com')){
            items['🌐github'] = tmp;
        }else{
            items['🌐github'] = `https://github.com/`+tmp;
        }
    }
    tmp = nc.editor.get_frontmatter(tfile,'huggingface');
    if(tmp){
        if(tmp.contains('huggingface.co')){
            items['🌐huggingface🤗'] = tmp;
        }else{
            items['🌐huggingface🤗'] = `https://huggingface.co/`+tmp;
        }
    }
    tmp = nc.editor.get_frontmatter(tfile,'arxiv');
    if(tmp?.ID){
        items['🌐arxiv'] = `https://arxiv.org/abs/`+tmp?.ID;
    }
  
    let text = await app.vault.cachedRead(tfile)
    const regex = /\[[^(\[\])]*?\]\(.*?\)/g;
    const matches = text.match(regex);
    if (matches) {
        for (const match of matches) {
            // 提取匹配的组
            let key = match.slice(1,match.indexOf(']('));
            let value = match.slice(match.indexOf('](')).slice(2,-1);
            if(value===''){continue;}
            if(key===''){
                key = value;
            }
            if(value.startsWith('http')){
                key='🌐'+key;
            }
            items[key] = value;
        }
    }
    if(inlins){
        let links = nc.chain.get_inlinks();
        for(let i of links){
            if(onlymd&& !(i.extension==='md')){continue;}
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
            if(onlymd&& !(i.extension==='md')){continue;}
			if(i.extension==='md'){
				items['🔗➡️'+i.basename] = i.path;
			}else{
				items['🔗➡️'+i.name] = i.path;
			}
        }
    }
    if(suffix){
        for(let k in suffix){
            items[k] = suffix[k];
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
	    if(note.extension==='pdf'){
		    open(`file:///${ve.fsEditor.abspath(note)}`);
	    }else{
		    nc.chain.open_note(note);
	    }
        //nc.chain.open_note(note);
    }else{
        open(item);
    }
}
  
let items = {};
let suffix = {};
suffix['📁下载目录'] = `file:///C:\\Users\\jianh\\Downloads`
suffix['📁视频录制'] = `file:///C:\Users\\jianh\\Videos\\Captures`
suffix['📁Obsidan'] = `file:///${app.vault.adapter.basePath}`
suffix['📄月度总结'] = `file:///C:\
\Users\\home\\Desktop\\月度总结.pptx`
suffix['🌐Orin Notebook'] = 'http://192.168.74.217:4488/tree/pypiserver#running'
suffix['🌐Markdown转公众号'] = 'https://md.qikqiak.com/';
suffix['🌐Youtube下载'] = 'https://en.savefrom.net/392KB/'
suffix['📞Notepad++']= `file:///C:\\Program Files\\Notepad++\\notepad++.exe`
let tfile = nc.chain.current_note;
await main(tfile,items,true,true,false,suffix);
-%>