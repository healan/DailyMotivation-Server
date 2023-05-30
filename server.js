import express, { text } from 'express';
import { translate } from '@vitalets/google-translate-api';
import cors from 'cors';

var app = express();
import pkg from 'body-parser';
const { json, urlencoded } = pkg;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors({
  origin: '*'
})); 


// var Promise = require('promise');

const translateQuote = (option, author, quote) => {
    // const option = 'ko';

    const translatePromise = new Promise((resolve, reject) => {
        if(option === 'ko'){
            translate(quote, { to: 'ko' })
                    .then(({text})=>{
                        console.log(23, text);
                        resolve(text);
                    })
                    .catch((err)=>{console.log(29, err)})

        }else if(option === 'zh'){
            translate(quote, { to: 'zh' })
                    .then(({text})=>{
                        resolve(text);
                    })
                    .catch((err)=>{console.log(35, err)})

        };
    });

    return translatePromise
};


app.get('/test', (req, res) => {
    console.log(16, req);
    res.send('ok');
});

app.post('/quote/translate/', (req, res) => {

    let author = req.body.author;
    let quote = req.body.quote;
    let option = req.body.option;
    let text;

    console.log(48, author, quote, option);

    translateQuote(option, author, quote)
        .then((res)=>{
            console.log(60, res);
            text = res;
        })
        .catch((err)=>{console.log(62, err)});

    res.send({
        code :200,
        text: text
    });
    
});

app.listen(2900, function () {
   console.log('app listening on port 2900!');
});