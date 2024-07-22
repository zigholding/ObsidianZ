function ufunc(app,dv,year,container,callback){
	const echarts = app.plugins.plugins['obsidian-echarts'].echarts()
	function get_daily_data(year){
		let pages = dv.pages();
		let data = pages.groupBy(
			p=>{
				let t = p.file.ctime;
				return `${t.year}-${t.month}-${t.day}`
			}
		).sort(
			g=> g.key
		).map(
			g=>([g.key,callback(g.rows)])
		).array();
		return data;
	}
	
	function rolling_mean(data, windowSize) {
	  if (data.length === 0 || windowSize <= 0) {
		return [];
	  }
	  
	  const result = [];
	  let sum = 0;

	  for (let i = 0; i < data.length; i++) {
		sum += data[i];
		
		if (i >= windowSize) {
		  sum -= data[i - windowSize];
		  result.push(sum / windowSize);
		} else if (i === windowSize - 1) {
		  result.push(sum / windowSize);
		}
	  }

	  return result;
	}

	let data = get_daily_data(year);
	let vmax = Math.max(...data.map(x=>x[1]));
	vmax = 5*(Math.floor(vmax/5)+1);
	const options = option = {
	  xAxis: {
		type: 'category',
		data: data.map(x=>x[0])
	  },
	  yAxis: {
		type: 'value'
	  },
	  series: [
		{
		  data: rolling_mean(data.map(x=>x[1]),10),
		  type: 'line'
		}
	  ]
	};
	app.plugins.plugins['obsidian-echarts'].render(options, container);
	return options
}
module.exports = ufunc;