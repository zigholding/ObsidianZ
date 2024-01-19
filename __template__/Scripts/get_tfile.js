
let fileManager = app.fileManager;
let metadataCache = app.metadataCache;

/**
 * 返回 TFile 对象
 * @param {string} ( - 文件路径，/index.md, index,index.md,[[index]]
 */
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

module.exports = get_tfile;
