const express = require('express')
const app = express()
const port = process.env.CHRON_PORT || 3000
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const options = {
    customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use(express.json())
app.get('/', (req, res) => {
    res.send('This is a balenaBlock!')
})

app.get('/listJobs', async(req, res) => {
    // get all cron jobs
    let list = await exec(`crontab -l`)
    let result = {jobs: []};
    let jobs = list.stdout.split(/\r?\n/);
    jobs.forEach(job => {
        result.jobs.push(job)
    });
    res.send(result.jobs);
})

app.post('/createJob', async (req, res) => {
    // create a job
    /* {
        minute: 
        hour:
        day of  month:
        month:
        day of week:
        shortcut:
        command:
    }*/
    let cron = {
        minute: req.body.minute || '*',
        hour: req.body.hour || '*',
        dayMonth: req.body.dayMonth || '*',
        month: req.body.month || '*',
        dayWeek: req.body.dayMonth || '*',
        shortcut: req.body.shortcut || null,
        command: req.body.command
    }

    try{
        if(cron.shortcut !== null){
            await exec(`crontab -l | { cat; echo "${cron.shortcut} ${cron.command}"; } | crontab -`)
        } else{
            await exec(`crontab -l | { cat; echo "${cron.minute} ${cron.hour} ${cron.dayMonth} ${cron.month} ${cron.dayMonth} ${cron.command}"; } | crontab -`)
        }
        res.send('OK');
    } catch(e){
        res.status(400).send(`Got error: ${e.message}`)
    }
})

app.post('/removeJob', async (req, res) => {
    // remove a job
    try{
        let index = req.body.index + 1
        await exec(`crontab -l | sed ${index}d | crontab -`)
        res.send('OK');
    } catch(e){
        res.status(400).send(`Got error: ${e.message}`)
    }
})

app.listen(port, () => {
    console.log(`Example balenaBlock listening at http://localhost:${port}`)
})
