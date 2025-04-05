class DailyJob {
    constructor() {
        this.START_TIME = this.parse_st('06:45'); // 每天的起始时间
        this.buffer = 10; // 缓冲时间
        this.dv = app.plugins.plugins.dataview.api;
        this.nc = app.plugins.plugins['note-chain'];
        this.PATTERN = /\n\> \[\!note\]\+ 事项 Done\n/;
        this.milestones = ['睡觉']
        this.groups = ['作息', '工作', '家庭', '个人']
        this.default_group = '工作'
    }

    parse_st(st) {
        let t = moment(`2000-01-01 ${st}:00`, "YYYY-MM-DD HH:mm:ss");
        return t;
    }

    parse_xt(xt) {
        if (typeof (xt) == 'string') {
            let items = xt.match(/^(\d+\.?\d*)(.*)$/);
            if (['min', 'm', 'minute', 'minutes'].contains(items[2])) {
                return parseInt(items[1]);
            }

            if (['h', 'hour', 'hours'].contains(items[2])) {
                return parseInt(parseFloat(items[1]) * 60);
            }
        } else if (xt.values) {
            let v = xt.values;
            return v.hours * 60 + v.minutes;
        }
    }

    get_et(st, xt) {
        return st.clone().add(xt, 'minutes');
    }

    parse_fields(item) {
        let res = {};
        res['st'] = this.parse_st(item.fields.get('st')[0]);
        res['xt'] = this.parse_xt(item.fields.get('xt')[0]);
        res['et'] = res['st'].clone().add(res['xt'], 'minutes');
        res['do'] = item.fields.get('do')[0];
        res['list'] = item;
        return res;
    }


    get_jobs(tfile) {
        if (!tfile) {
            tfile = this.nc.chain.get_last_daily_note();
        }
        if (Array.isArray(tfile)) {
            let jobs = [];
            for (let c of tfile) {
                let cjobs = this.get_jobs(c);
                if (cjobs) {
                    for (let job of cjobs) {
                        jobs.push(job);
                    }
                }
            }
            return jobs;
        } else {
            if (typeof (tfile) == 'string') {
                tfile = this.nc.chain.get_tfile(tfile);
            }
            if (!tfile) { return null }
            let meta = this.dv.index.pages.get(tfile.path)
            let items = meta.lists.filter(
                x => x.fields.get('st') && x.fields.get('xt') && x.fields.get('do')
            )
            items = items.map(item => this.parse_fields(item));
            return items;
        }
    }


    generate_start_times(jobs, is_today = true) {
        // 从 st 到当前时间
        let st = this.START_TIME;
        let timeList = [];
        let t = this.parse_st(moment().format('HH:mm'));
        if (!is_today) {
            t = this.parse_st(moment().format('23:55'));
        }
        for (let hour = st.hour(); hour <= t.hour(); hour++) {
            let startMinute = (hour === st.hour()) ? st.minute() : 0;
            let endMinute = (hour === t.hour()) ? t.minute() : 60;
            for (let minute = startMinute; minute < endMinute; minute += 5) {
                let time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                let ct = this.parse_st(time);
                let flag = true;
                for (let item of jobs) {
                    if (item.st <= ct && item.et > ct) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    timeList.push(time);
                }
            }
        }
        let et = this.get_max_endt(jobs).format('HH:mm');
        if (!timeList.contains(et)) {
            timeList.push(et)
        }
        timeList = timeList.sort((a, b) => a.localeCompare(b));
        return timeList
    }


    get_max_endt(jobs) {
        if (jobs.length == 0) {
            return this.START_TIME
        } else {
            return moment.unix(
                Math.max(...jobs.map(x => x.et)) / 1000
            )
        }
    }

    async select_start_time(jobs, is_today = true) {
        let timeList = this.generate_start_times(jobs, is_today);
        if (timeList.length == 0) {
            new Notice('已记录！')
            return null;
        }
        let st = await this.nc.dialog_suggest(timeList, timeList, '开始时间', true)
        if (!st) { return null }
        if (st.match(/^\d{4}$/)) {
            st = st.slice(0, 2) + ':' + st.slice(2, 4);
        }
        if (st.match(/^\d{2}:\d{2}$/)) {
            return st;
        }
        return null;
    }

    async select_x_time() {
        let xitmes = ['5min', '10min', '15min', '20min', '25min', '30min', '45min', '1hour', '2hour', '3hour'];
        let xt = await this.nc.dialog_suggest(xitmes, xitmes, '持续时间', true)
        if (!xt) { return null }
        let items = xt.match(/^(\d+\.?\d*)(min|hour|day|h|m)?$/)
        if (items && items[1] && items[2]) {
            let xt = `${items[1]}${items[2]}`
            return this.parse_xt(xt);
        } else if (items && items[1]) {
            return parseInt(items[1]);
        }
        return null;
    }

    count_elements(arr) {
        const countMap = arr.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(countMap).map(([element, count]) => ({ element, count }));
    }

    async select_jobs(st, xt) {
        let xitmes = [];
        let tfiles = this.nc.chain.get_chain(this.tfile, 7, 2, false);
        let jobs = this.get_jobs(tfiles);
        st = this.parse_st(st);
        let t0 = this.get_et(st, -this.buffer)
        let t1 = this.get_et(st, xt + this.buffer);
        jobs = jobs.filter(x => {
            return (x.st <= t0 && x.et >= t0) || (x.st <= t1 && x.et >= t1)
        })

        xitmes = jobs.map(x => x.do);
        let cels = this.count_elements(xitmes);
        let ks = cels.map(x => `${x.element}(${x.count})`);
        let vs = cels.map(x => `${x.element}`);
        xitmes = [...new Set(xitmes)];
        let job = await this.nc.dialog_suggest(ks, vs, '事项', true)
        return job;
    }


    job_to_line(st, xt, job) {
        let ctx = `- ⏰ (st::${st}) 🎯(do::${job}) ⏳(xt::${xt}m) `;
        return ctx;
    }

    job_from_line(aline) {

    }

    async insert_ctx(tfile, msg, pattern) {
        let file_ctx = await app.vault.cachedRead(tfile);
        let idx = file_ctx.search(pattern);
        let match = file_ctx.match(pattern);
        let ctx = '';
        if (idx == -1) {
            ctx = `${file_ctx}\n\n${msg}`
        } else {
            ctx = `${file_ctx.slice(0, idx + match[0].length)}\n${msg}${file_ctx.slice(idx + match[0].length)}`
        }

        await app.vault.modify(tfile, ctx)
    }


    async run(job = null) {
        let tfile = this.nc.chain.get_last_daily_note();
        let jobs = this.get_jobs(tfile);
        let is_today = tfile.basename == moment().format('YYYY-MM-DD')
        let st = await this.select_start_time(jobs, is_today);
        if (!st) { return }

        let xt = await this.select_x_time();
        if (!xt) { return }
        if (!job) {
            job = await this.select_jobs(st, xt);
        }
        if (!job) { return }
        let ctx = this.job_to_line(st, xt, job);

        await this.insert_ctx(tfile, ctx, this.PATTERN);
    }

    get_jobs_tree() {
        let tfile = this.nc.chain.get_tfile('DailyJob 事项');
        let meta = this.dv.index.pages.get(tfile.path);
        return meta.lists;
    }

    _get_match_job_(job_item, tree) {
        let ctx = job_item.do;
        let job = ctx.split(/[\(（]/)[0];
        let item = tree.filter(x => x.text == job)[0];
        if (item) { return item; }

        item = tree.filter(x => {
            if (x.text.startsWith('`') && x.text.endsWith('`')) {
                let regex = new RegExp(x.text.slice(1, x.text.length - 1));
                if (regex.test(job_item.do)) {
                    return true;
                }
            }
            return false;
        })[0];
        if (item) { return item; }

        return null;
    }

    _parent_by_do_(job_item, tree) {
        let item = this._get_match_job_(job_item, tree)
        if (!item) { return null }
        let parent = item.parent;
        if (parent) {
            parent = tree.filter(x => x.line == parent)[0]
            while (parent) {
                let tmp = tree.filter(x => x.line == parent.parent)[0]
                if (tmp) {
                    parent = tmp;
                } else {
                    break;
                }
            }
            return parent;
        }
        return null;
    }
    get_parent_job(job_item, tree) {
        let group = this._parent_by_do_(job_item, tree);
        if (group) { return group };
        return null;
    }

    gantt() {
        let jobs = this.get_jobs();
        jobs = jobs.sort((a, b) => (a.st - b.st));

        let tree = this.get_jobs_tree();
        let groupedJobs = {};

        for (let job of jobs) {
            let parentJob = this.get_parent_job(job, tree);
            let section = parentJob ? parentJob.text : this.default_group; // 如果没有分组，使用 '无分组'

            if (!groupedJobs[section]) {
                groupedJobs[section] = [];
            }
            groupedJobs[section].push(job);
        }

        let items = [];
        for (let section of this.groups) {
            if (!(section in groupedJobs)) {
                continue
            }
            items.push(`section ${section}`);
            for (let job of groupedJobs[section]) {
                if (this.milestones.contains(job.do)) {
                    items.push(`\t${job.do} : milestone, ${job.st.format('HH:mm')},${0}m`);
                } else {
                    items.push(`\t${job.do} : ${job.st.format('HH:mm')},${job.xt}m`);
                }
            }
        }
        if (items.length == 0) {
            items.push('未开始 : 06:45,1m')
        }
        let gantt = `
\`\`\`mermaid
gantt
    dateFormat HH:mm
    axisFormat %H:%M
    tickInterval 1hour
${items.join('\n')}
\`\`\`
`;
        return gantt;
    }


    summarize_jobs(jobs) {
        const result = {};
        for (const job of jobs) {
            let name = job.do;
            let duration = job.xt;
            if (!result[name]) {
                result[name] = 0;
            }
            result[name] += duration;
        }
        return result;
    }

    jobs_to_pie(jobs){
        let data = this.summarize_jobs(jobs);
        const entries = Object.entries(data);
        entries.sort((a, b) => b[1] - a[1]);
        let chart = '```mermaid\npie\n';
        for (const [key, value] of entries) {
            chart += `    "${key}" : ${value}\n`;
        }
        chart += '```';
        return chart;
    }


    async invoke() {
        this.run();
    }


}
