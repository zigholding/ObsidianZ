function render_daily_notes_count(app,dv,year,container){
	const echarts = app.plugins.plugins['obsidian-echarts'].echarts()
	function get_daily_data(year){
		let pages = dv.pages();
		let data = pages.filter(
			p=>{
				if(p.ctime==null){
					return false;
				}else if(typeof(p.ctime)=='string'){
					return p.ctime.startsWith(year.toString())
				}else{
					try{
						return p.ctime.year==year;
					}catch(error){
						return false;
					}
				}
			}
		).groupBy(
			p=>{
				if(typeof(p.ctime)=='string'){
					return p.ctime.slice(0,10);
				}else{
					return `${p.ctime.year}-${p.ctime.month}-${p.ctime.day}`
				}
			}
		).sort(
			g=> g.key
		).map(
			g=>([g.key,g.rows.length])
		).array();
		return data;
	}

	let data = get_daily_data(year);
	let vmax = Math.max(...data.map(x=>x[1]));
	vmax = 5*(Math.floor(vmax/5)+1);
	const options = {
	  width:1200,
	  height: 300,
	  title: {
		top: 30,
		left: 'center',
		text: `${year}年每日新建笔记数`
	  },
	  tooltip: {},
	  visualMap: {
		min: 0,
		max: vmax,
		orient: 'horizontal',
		left: 'center',
		top: 65,
		show:false
	  },
	  calendar: {
		top: 120,
		left: 30,
		right: 30,
		cellSize: ['auto', 13],
		range: year.toString(),
		itemStyle: {
		  borderWidth: 0.5
		},
		yearLabel: { show: false }
	  },
	  series: {
		type: 'heatmap',
		coordinateSystem: 'calendar',
		data: data
	  }
	};
	app.plugins.plugins['obsidian-echarts'].render(options, container);
	return options
}
module.exports = render_daily_notes_count;