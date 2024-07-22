<%*
function gen_node(tfile,x=0,y=0,width=400,height=400){
	let file;
	if(tfile.getFileCount){
		file = tfile.path+'/'+tfile.name+'.md';
	}else{
		file = tfile.path;
	}
	return {
		"id":tfile.name,
		"type":"file",
		"file":file,
		"x":x,
		"y":y,
		"width":width,
		"height":height
	}
}

function get_idx(i,r,c){
	let row = Math.floor((i - 1) / c) + 1;
	let col = row % 2 === 1 ? (i - 1) % c + 1 : c - ((i - 1) % c);
	return [row, col];
}
	
function gen_nodes(tfiles,nrow=1,ncol=1,width=400,height=400,wmarin=100,hmargin=100){
	if(nrow*ncol<tfiles.length){
		ncol = Math.ceil(tfiles.length/nrow);
	}
	res = [];
	let i = 0;
	for(let tfile of tfiles){
		i = i+1;
		let pos = get_idx(i,nrow,ncol);
		let node = gen_node(tfile,x=pos[1]*(width+wmarin),y=pos[0]*(height+hmargin),width=width,height=height);
		res.push(node);
	}
	return res;
}

function gen_random_string(length) {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  
  return randomString;
}

function gen_edges(tfiles,nrow=1,ncol=1){
	if(nrow*ncol<tfiles.length){
		ncol = Math.ceil(tfiles.length/nrow);
	}
	
	res = [];
	let i = 0;
	while(i<tfiles.length-1){
		let pos = get_idx(i+1,nrow,ncol);
		let edge;
		if(pos[0] % 2 == 1){
			if(pos[1]==ncol){
				edge = {
					'id':gen_random_string(10),
					'fromNode':tfiles[i].name,
					'fromSide':'bottom',
					'toNode':tfiles[i+1].name,
					'toSide':'top',
				}
			}else{
				edge = {
					'id':gen_random_string(10),
					'fromNode':tfiles[i].name,
					'fromSide':'right',
					'toNode':tfiles[i+1].name,
					'toSide':'left',
				}
			}			
		}else{
			if(pos[1]==1){
				edge = {
					'id':gen_random_string(10),
					'fromNode':tfiles[i].name,
					'fromSide':'bottom',
					'toNode':tfiles[i+1].name,
					'toSide':'top',
				}
			}else{
				edge = {
					'id':gen_random_string(10),
					'fromNode':tfiles[i].name,
					'fromSide':'left',
					'toNode':tfiles[i+1].name,
					'toSide':'right',
				}
			}	
		}
		res.push(edge);
		i = i+1;
	}
	return res;
}

function gen_canvs(tfiles,canvas,nrow=-1,ncol=-1,width=400,height=400,wmarin=100,hmargin=100){
	nrow=Math.round(nrow);
	ncol=Math.round(ncol);
	let N = tfiles.length;
	if(nrow<=0){
		nrow=Math.round(Math.sqrt(N));
	}
	if(ncol<=0){
		ncol=Math.round(Math.sqrt(N));
	}


	res = {
		"nodes":gen_nodes(tfiles,nrow=nrow,ncol=ncol,width=width,height=height,wmarin=wmarin,hmargin=hmargin),
		"edges":gen_edges(tfiles,nrow=nrow,ncol=ncol)
	}

	msg = JSON.stringify(res)
	
	ve=app.plugins.getPlugin('vault-exporter');
	if(ve.fsEditor.isfile(canvas)){
		ve.fsEditor.modify(
			canvas,(path,data)=>{return msg}
		)
	}else{
		ve.fsEditor.fs.writeFile(canvas, msg, 'utf8', (err) => {});
	}
}


nc=app.plugins.getPlugin('note-chain');
ve=app.plugins.getPlugin('vault-exporter');
nc.chain.init_children();

let tfile = nc.chain.current_note;
tfiles = nc.chain.children[tfile.parent.path];

let dname = ve.fsEditor.path.dirname(ve.fsEditor.abspath(tfile));
let bname = ve.fsEditor.path.basename(dname);
let canvas = dname+'/'+bname+'.canvas';
gen_canvs(tfiles,canvas,nrow=-1,ncol=-1,width=400,height=400,wmarin=100,hmargin=100);
await nc.explorer.sort(1000,true);
nc.chain.open_note(nc.chain.get_tfile(bname+'.canvas'))
%>