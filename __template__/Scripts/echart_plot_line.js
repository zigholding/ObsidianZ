function echart_plot_line(data,app,dv,container){
	const echarts = app.plugins.plugins['obsidian-echarts'].echarts()
	let vmax = Math.max(...data.map(x=>x[1]));
	vmax = 5*(Math.floor(vmax/5)+1);
	const options = {
	  xAxis: {
		type: 'category',
		data: data.map(x=>x[0])
	  },
	  yAxis: {
		type: 'value'
	  },
	  series: [
		{
		  data: data.map(x=>x[1]),
		  type: 'line'
		}
	  ]
	};
	app.plugins.plugins['obsidian-echarts'].render(options, container);
	return options
}

module.exports = echart_plot_line;