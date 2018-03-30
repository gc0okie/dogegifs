//doge gifs yes ok go
const express = require('express');
const async = require('async');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
const giphy = require('giphy-api')

app.use(express.json());

app.post('/', (req, res1) => 
{
    num_gifs = parseInt(req.body.text);
    if (num_gifs != parseInt(num_gifs) || num_gifs > 20){
        num_gifs = 1;
    }
    var url_to_slack = new Array();
    async.waterfall([
        (callback) => {
        var giphy = require('giphy-api')('hQZZ5e4DdsdQqY4prZpckQetnyZZpbqP');
        giphy.search({
            q: 'doge',
            limit: num_gifs,
            offset: Math.floor(Math.random() * Math.floor(100)),
            rating: 'g',
            fmt: 'json'
            }, (err, res) => {
                for (i in res.data) {
                    var img_url = res.data[i].images.fixed_height_downsampled.url
                    let img = {
                        fallback: 'doge',
                        title: 'doge',
                        image_url: img_url};
                    url_to_slack.push(img);
                    console.log(i, '\n', JSON.stringify(url_to_slack), '\n');
                }
                callback(null, url_to_slack)
            }
        )},
        (url_to_slack, callback) => {
            console.log('test \n', url_to_slack);
            let data_to_slack = { 
                username: 'doge bot lol',
                icon_emoji: ':dog:',
                response_type: 'in_channel', // public to the channel 
                text: 'thank u for use doge gif', 
                attachments: url_to_slack};
            console.log(data_to_slack);
            res1.json(JSON.parse(JSON.stringify(data_to_slack)))
        },
    ]);
});

app.get('/', (req, res) => 
{
    res.send('doge gifs!')
});


//#region
/*
const gifs = [
    {id: 1, name: 'wow'},
    {id: 2, name: 'very'}
]

app.get('/', (req, res)=> {
    res.send('Hello World');
});

app.get('/gifs/', (req, res)=> {
    res.send(req.query);
});

app.post('/gifs/', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body,schema);
    //console.log(result);

    if (result.error) {
        //400 bad req
        res.status(400).send(result.error.details[0].message);
        return;
    }
        
    const gif = {
        id: gifs.length + 1,
        name: req.body.name
    };
    gifs.push(gif);
    res.send(gif);
    console.log(gif)
});
*/
//#endregion

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...testing...`));