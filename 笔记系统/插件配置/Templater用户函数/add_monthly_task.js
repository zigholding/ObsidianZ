function efunc(tstr,ctx,date){
	// 日记 birthday 日期和 target 一致
	let tR = '';
	let t = new moment(tstr);
	if(t._isValid){
		tstr = t.format('YYYY-MM-DD');	
		date = t.daysInMonth()+(date>=0?0:date+1);
		if(t.date() == date){
			tR+=`\n- [ ] ${ctx} 📅 ${tstr}`;
		}
	}
	return tR;
}

module.exports = efunc;