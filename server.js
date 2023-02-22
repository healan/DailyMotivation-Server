import express from 'express';
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

const option = 'zh';

if(option === 'ko'){
    const { text }  = await translate('Remember that the best relationship is one in which your love for each other exceeds your need for each other', { to: 'ko' });
    console.log(10, text);
}else if(option === 'zh'){
    const { text } = await translate('Remember that the best relationship is one in which your love for each other exceeds your need for each other', { to: 'zh' });
    console.log(12, text);
};

app.get('/test', (req, res) => {
    console.log(16, req);
    res.send('ok');
});

app.post('/quote/translate/', (req, res)=>{
    console.log(17, req.body);

    // return res.status(200).json({
    //     code: 200,
    //     text: 'text'
    // })
    res.send({
        code :200,
        text: 'text'
    })
});

app.listen(2900, function () {
   console.log('app listening on port 2900!');
});