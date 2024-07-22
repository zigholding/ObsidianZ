
```dataviewjs
function getDailyWordCounts(files, begt=14, endt=0) {
	if(typeof(begt)=='number'){
		begt = moment().add(-begt,'days').format('YYYY-MM-DD')
	}
	if(typeof(endt)=='number'){
		endt = moment().add(-endt,'days').format('YYYY-MM-DD')
	}
	
    let startDate = new Date(begt);
    let endDate = new Date(endt);
    let dailyWordCounts = {};

    // Initialize dailyWordCounts with all dates in the range
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        let dateStr = date.toISOString().split('T')[0];
        dailyWordCounts[dateStr] = 0;
    }
	
    // Sum up the word counts for each date
    files.forEach(file => {
        let lastWordCount = 0;
		let earliestDate = new Date(Object.keys(file).sort()[0]);

        // Initialize lastWordCount with the earliest date's word count in the file
        if (earliestDate < startDate) {
            lastWordCount = file[earliestDate.toISOString().split('T')[0]];
        }
		
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            let dateStr = date.toISOString().split('T')[0];
            if (file.hasOwnProperty(dateStr)) {
                lastWordCount = file[dateStr];
            }
            dailyWordCounts[dateStr] += lastWordCount;
        }
    });

    return dailyWordCounts;
}

function getDailyNewWordCounts(dailyWordCounts,first_as_zero=true) {
    let dailyNewWordCounts = {};
    let previousTotal = 0;
	let first = null;

    for (let date in dailyWordCounts) {
		if(first==null){
			first = date;
		}
        let currentTotal = dailyWordCounts[date];
        dailyNewWordCounts[date] = currentTotal - previousTotal;
        previousTotal = currentTotal;
    }
	if(first_as_zero){
		dailyNewWordCounts[first] = 0;
	}
    return dailyNewWordCounts;
}


function generateMermaidChart(data,title=' ',interval=1) {
    // 提取日期和数值
    console.clear();
    const dates = Object.keys(data);
	for(let i=0;i<dates.length;i=i+1){
		console.log((i%interval))
		if((i%interval) !=0){
			dates[i] = '.';
		}else{
			dates[i] = dates[i].slice(5);
		}
	}
	console.log(dates)
    const values = Object.values(data);

    // 构建 Mermaid 图表代码
    const mermaidCode = `---
config:
  theme: dark
  xyChart:
    width: 1000
    height: 600
    titlePadding: 5
    titleFontSize: 10
    xAxis:
      labelFontSize: 10
      labelPadding: 10
      titleFontSize: 10
      titlePadding: 20
      tickLength: 10
      tickWidth: 5
      axisLineWidth: 5
    yAxis:
      labelFontSize: 20
      labelPadding: 10
      titleFontSize: 30
      titlePadding: 20
      tickLength: 10
      tickWidth: 5
      axisLineWidth: 5
    plotReservedSpacePercent: 60
---
xychart-beta
    title "${title}"
    x-axis [${dates.map(date => `"${date}"`).join(', ')}]
    y-axis "${title}" 0 --> ${Math.max(...values) + 10}
    bar [${values.join(', ')}]
    line [${values.join(', ')}]`;

    return '```mermaid\n'+mermaidCode+'\n```';
}
let nc=app.plugins.getPlugin('note-chain');
let wfiles = nc.chain.get_all_tfiles().map(x=>nc.editor.get_frontmatter(x,'words')).filter(x=>x);
let words = getDailyWordCounts(wfiles,'2024-06-16');
let res = getDailyNewWordCounts(words)
let msg = generateMermaidChart(res,' ',1)
dv.span(msg)
```

