
let fileManager = app.fileManager;
let metadataCache = app.metadataCache;

/**
 * 判断某个 md 文件是否是发布文件。
 * @param {string} ( - 文件路径
 */
function set_seq_notes(pre,nxt){
	if(!pre){return;}
	if(!nxt){return;}
	
	fileManager.processFrontMatter(nxt,fm =>{
		fm["PrevNote"] = `[[${pre.basename}]]`;
	});
	
	fileManager.processFrontMatter(pre,fm =>{
		fm["NextNote"] = `[[${nxt.basename}]]`;
	});
	return "";
	
	let meta = metadataCache.getFileCache(pre);
	if(typeof(meta.frontmatter.NextNotes)=="undefined"){
		fileManager.processFrontMatter(pre,fm =>{
			fm["NextNotes"] = [`[[${nxt.basename}]]`];
		})
	} else if(typeof(meta.frontmatter.NextNotes)=="string"){
		if(meta.frontmatter.NextNotes==`[[${nxt.basename}]]`){
			fileManager.processFrontMatter(pre,fm =>{
				fm["NextNotes"] = [`[[${nxt.basename}]]`];
			})
		}else{
			fileManager.processFrontMatter(pre,fm =>{
				fm["NextNotes"] = [
					meta.frontmatter.NextNotes,
					`[[${nxt.basename}]]`
				];
			})
		}
	} else if (!meta.NextNotes.includes(`[[${nxt.basename}]]`)){
		meta.NextNotes.push(`[[${nxt.basename}]]`);
		fileManager.processFrontMatter(pre,fm =>{
			fm["NextNotes"] = meta.NextNotes;
		})
	}else{
		fileManager.processFrontMatter(pre,fm =>{
			fm["NextNotes"] = [`[[${nxt.basename}]]`];
		})
	}
	return "";
}

module.exports = set_seq_notes;
