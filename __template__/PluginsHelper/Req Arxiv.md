<%*
function extract_info(req){
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(req.text, 'text/xml');
	const entry = xmlDoc.getElementsByTagName('entry')[0];
	let info = {};
	info['url'] = entry.getElementsByTagName('id')[0].textContent;
	info['ID'] = info['url'].split('/')[4];
	info['title'] = entry.getElementsByTagName('title')[0].textContent;
	info['submitted'] = entry.getElementsByTagName('published')[0].textContent.split('T')[0];
	info['revised'] = entry.getElementsByTagName('updated')[0].textContent.split('T')[0];
	let a=[];for(let i of entry.getElementsByTagName('author')){a.push(i.textContent.trim())};
	info['author']=a;
	info['abstract'] = entry.getElementsByTagName('summary')[0].textContent.replace(/\n/g,' ').trim();
	info['tag'] = entry.getElementsByTagName('category')[0].getAttribute('term').replace(/\./g,'/')
	return info;
}
tp.system.prompt('Inpu ID (eg 1611.07004v3)').then((id)=>{
	let url = `https://export.arxiv.org/api/query?id_list=${id}`;
	requestUrl(url).then((req)=>{
		let info = extract_info(req);
		console.log(info);
		tp.file.cursor_append(`> [!Summary]- Abstract: [${info['title']}](${info['url']})\n> \n> ${info['abstract']}\n> \n> - [ ] ${info['title']} #arxiv #${info['tag']} (submitted::${info['submitted']}) (revised::${info['revised']})\n`);
		app.tmp = info.abstract;
		delete info['abstract'];
		delete info['url'];
		delete info['tag'];
		delete info['author'];
		app.fileManager.processFrontMatter(
			tp.config.target_file,(fm)=>{
			fm['arxiv'] = info;
		})
	});
});
-%>