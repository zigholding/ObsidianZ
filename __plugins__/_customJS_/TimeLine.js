class TimeLine {
    daysInMonth(month, year, input) {
        return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
    }

    isLeapYear(p_intYear) {
        return (p_intYear % 100 === 0) ? (p_intYear % 400 === 0) : (p_intYear % 4 === 0);
    }

    dayOfTheYear(date) {
        return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    }

    createYearData(year, eventList=null,height=40,monthNames=null) {
        if(eventList==null){
            eventList = {};
        }
        if(monthNames==null){
            monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        }
        let names = {
            January:monthNames[0],
            February:monthNames[1],
            March:monthNames[2],
            April:monthNames[3],
            May:monthNames[4],
            June:monthNames[5],
            July:monthNames[6],
            August:monthNames[7],
            September:monthNames[8],
            October:monthNames[9],
            November:monthNames[10],
            December:monthNames[11],
        }

        var currentDate = new Date();
        var theYear = currentDate.getFullYear();
        if (year === undefined || year == theYear) {
            var dayOfYear = this.dayOfTheYear(currentDate);
        } else {
            var theYear = year;
            var currentDate = new Date(theYear, 11, 31);
            if (this.isLeapYear()) {
                var dayOfYear = 366;
            } else {
                var dayOfYear = 365;
            }
        }
        let currentPos = dayOfYear * 10;
        let currentPosLabel = monthNames[currentDate.getMonth()] + " " + currentDate.getDate();

        var barX = [];
        var barWidth = [];
        for (const x of Array(12).keys()) {
            barWidth.push(this.daysInMonth(x, theYear) * 10);
            if (barX.length == 0) {
                barX.push(0);
            } else {
                barX.push(barX[barX.length - 1] + barWidth[barX.length - 1]);
            }
        }
        if (this.isLeapYear(theYear)) {
            var daysOfYearW = 3660;
        } else {
            var daysOfYearW = 3650;
        }
        
        const timeHtmlPartI = `<svg viewBox="0 -50 ${daysOfYearW} ${150+height}">
    <title>Timeline ${theYear}</title>
    <g class='bars'>
        <rect fill='#D1E2F3' x='${barX[0]}' width='${barWidth[0]}' height='${height}'></rect>
        <rect fill='#CCE0E2' x='${barX[1]}' width='${barWidth[1]}' height='${height}'></rect>
        <rect fill='#C2DCC5' x='${barX[2]}' width='${barWidth[2]}' height='${height}'></rect>
        <rect fill='#B8D7A8' x='${barX[3]}' width='${barWidth[3]}' height='${height}'></rect>
        <rect fill='#C5A68D' x='${barX[4]}' width='${barWidth[4]}' height='${height}'></rect>
        <rect fill='#D37B74' x='${barX[5]}' width='${barWidth[5]}' height='${height}'></rect>
        <rect fill='#DA6467' x='${barX[6]}' width='${barWidth[6]}' height='${height}'></rect>
        <rect fill='#D76C6C' x='${barX[7]}' width='${barWidth[7]}' height='${height}'></rect>
        <rect fill='#D8A8AC' x='${barX[8]}' width='${barWidth[8]}' height='${height}'></rect>
        <rect fill='#D1E2F3' x='${barX[9]}' width='${barWidth[9]}' height='${height}'></rect>
        <rect fill='#E5EFF9' x='${barX[10]}' width='${barWidth[10]}' height='${height}'></rect>
        <rect fill='#DAE0A3' x='${barX[11]}' width='${barWidth[11]}' height='${height}'></rect>
    </g>
    <g class='labels' style="font-size:50px; font-family:arial" text-anchor="middle">
        <text fill='#D1E2F3' x='${barX[0]}' y='${80+height}' text-anchor="start">${names["January"]}</text>
        <text fill='#CCE0E2' x='${barX[1]}' y='${80+height}' text-anchor="start">${names["February"]}</text>
        <text fill='#C2DCC5' x='${barX[2]}' y='${80+height}' text-anchor="start">${names["March"]}</text>
        <text fill='#B8D7A8' x='${barX[3]}' y='${80+height}' text-anchor="start">${names["April"]}</text>
        <text fill='#C5A68D' x='${barX[4]}' y='${80+height}' text-anchor="start">${names["May"]}</text>
        <text fill='#D37B74' x='${barX[5]}' y='${80+height}' text-anchor="start">${names["June"]}</text>
        <text fill='#DA6467' x='${barX[6]}' y='${80+height}' text-anchor="start">${names["July"]}</text>
        <text fill='#D76C6C' x='${barX[7]}' y='${80+height}' text-anchor="start">${names["August"]}</text>
        <text fill='#D8A8AC' x='${barX[8]}' y='${80+height}' text-anchor="start">${names["September"]}</text>
        <text fill='#D1E2F3' x='${barX[9]}' y='${80+height}' text-anchor="start">${names["October"]}</text>
        <text fill='#E5EFF9' x='${barX[10]}' y='${80+height}' text-anchor="start">${names["November"]}</text>
        <text fill='#DAE0A3' x='${barX[11]}' y='${80+height}' text-anchor="start">${names["December"]}</text>
    </g>
    `
        if (eventList !== undefined) {
            var timeHtmlEvents = `<g class="events" style="font-size:60px;" text-anchor="middle">`
            for (var en in eventList) {
                let ed = new Date(theYear + '/' + eventList[en][0]);
                let ePos = this.dayOfTheYear(ed) * 10;
                let eTitle = "Event";
                let eIcon = "🚩";
                let eLength = eventList[en].length;
                if (eventList[en][1] !== undefined) {
                    eTitle = eventList[en][1];
                }
                if (eventList[en][2] !== undefined) {
                    eIcon = eventList[en][2];
                }
                timeHtmlEvents += `
        <text fill="black" x="${ePos}" y="3">
            <title>${eTitle}</title>${eIcon}</text>`
            }
            timeHtmlEvents += `
    </g>`
        }


        const timeHtmlPartII = `
    </svg>`;

        return timeHtmlPartI + timeHtmlEvents + timeHtmlPartII;
    }
}