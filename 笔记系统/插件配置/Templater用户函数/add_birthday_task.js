function efunc(tstr,offset=0){
	// 日记 birthday 日期和 target 一致
	let tR = '';
	dv=app.plugins.plugins.dataview.api;
	let pages = dv.pages().where(p=>p.birthday).array();
	for(let page of pages){
		if(page.birthday?.toFormat){
			let bday = page.birthday.plus(-offset*86400*1000).toFormat('MM-dd');
			if(bday==tstr.slice(5)){
				tR+=`\n- [ ] #个人 🎂${page.file.name}生日🎁 📅 ${tstr} \n`
			}
		}
	}
	return tR;
}

module.exports = efunc;