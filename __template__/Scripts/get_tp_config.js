
let metadataCache = app.metadataCache;

/**
 * 返回 TFile 对象
 * @param {string} ( - 文件路径，/index.md, index,index.md,[[index]]
 */
function get_tp_config(tp){
	let file = app.vault.fileMap[tp.config.template_file.path.slice(0,-3)+"_config.md"];
	if(file){
		return app.metadataCache.getFileCache(file);
	}else{
		return null;
	}
}

module.exports = get_tp_config;
