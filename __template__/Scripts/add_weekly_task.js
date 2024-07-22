function efunc(tstr,ctx,weekday){
	// 日记 birthday 日期和 target 一致
	let tR = '';
	let t = new moment(tstr);
	if(t._isValid){
		tstr = t.format('YYYY-MM-DD');
		if(t.weekday() == weekday){
			tR+=`\n- [ ] ${ctx} 📅 ${tstr}`;
		}
	}
	return tR;
}

module.exports = efunc;