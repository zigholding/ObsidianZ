function efunc(offset){
	let leaves = app.workspace.getLeavesOfType('markdown');
	let idx = leaves.map(x=>x==app.workspace.activeLeaf).indexOf(true);
	idx = idx+offset;
	if(idx<0 || idx>leaves.length-1){
		return null;
	}
	return leaves[idx];
}

module.exports = efunc;