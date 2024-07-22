<%*
function filter(tfile){
	//return tfile.basename=='Untitledafs';
	if(!tfile){return false;}
	if(tfile.deleted){return false;}
	if(tfile.extension!='md'){return false;}
	let items = ['__template__'];
	for(let item of items){
		if(tfile.path.startsWith(item)){
			return false;
		}
	}
	return true;
}

function count_words(ctx,ignore=/[\s!"#$%&'()*+,./:;<=>?@[\]^_`{|}，。！？【】、；：“”‘’《》（）［］—…￥]/g){
	let headerRegex = /^---\s*([\s\S]*?)\s*---/
	let match = headerRegex.exec(ctx);
	if(match){
		let header = match[1].trim();
		ctx = ctx.slice(match[0].length).trim();
	}
	
	let N = ctx.replace(ignore, '').length;
	let enregex = /[a-zA-Z0-9-]+/g;
	let matches = ctx.match(enregex);
	if(matches){
		let elen=0;
		matches.forEach(x=>elen=elen+x.length);
		N = N-elen+matches.length;
	}
	return N;
}

async function set_mtime_value(tfile,key,val){
	await app.fileManager.processFrontMatter(
		tfile,
		(fm) =>{
			let t = moment.unix(tfile.stat.mtime/1000);
			let mtime = t.format('YYYY-MM-DD');
			if(fm[key]==null){
				if(val>0){
					fm[key] = {};
					if(mtime==(new moment()).format('YYYY-MM-DD') && mtime!=moment.unix(tfile.stat.ctime/1000).format('YYYY-MM-DD')){
						fm[key][t.add(-1,'days').format('YYYY-MM-DD')] = val;
					}else{
						fm[key][mtime] = val;
					}
				}
			}else{
				let ts = Object.keys(fm[key]).sort((b,a)=>a.localeCompare(b)).filter(x=>!(x==mtime));
				if(ts.length==0){
					if(val>0){
						fm[key][mtime] = val;
					}else if(fm[key][mtime]){
						fm[key][mtime] = val;
					}
				}else{
					if((val-fm[key][ts[0]])!=0){
						fm[key][mtime] = val;
					}else if(fm[key][mtime]){
						delete fm[key][mtime];
					}
				}
			}
		}
	)
}

async function update_word_count(tfile){
	if(!filter(tfile)){return;}
	let file = tfile;
	let ctx = await app.vault.cachedRead(tfile);
	let N = count_words(ctx);
	//le.log(N,ctx)
	await set_mtime_value(tfile,'words',N);
}

async function update_word_count_of_vault(){
	let tfiles = app.vault.getMarkdownFiles().filter(x=>filter(x				));
	let i = 0;
	for(let tfile of tfiles){
		new Notice(`${i}/${tfiles.length}:${tfile.name}`,3000);
		await update_word_count(tfile);
		i = i+1;
	}
}

function regeister_active_leaf_change(){
	new Notice('注册事件：统计字数',5000);
	app.workspace.on('active-leaf-change',async (leaf)=>{
		if(!(leaf.view?.file?.extension=='md')){
			return;
		}
		
		await update_word_count(leaf.view.file);
		if(app.curr_active_file==null){
			app.curr_active_file = leaf.view.file;
			return;
		}
		if(app.curr_active_file != leaf.view.file){
			await update_word_count(app.curr_active_file);
			app.curr_active_file = leaf.view.file
		}
	})
}
//update_word_count(app.workspace.getActiveFile())
//update_word_count_of_vault()
if(false && !app.flag_regeister_active_leaf_change){
	regeister_active_leaf_change();
	app.flag_regeister_active_leaf_change=true;
}
-%>
