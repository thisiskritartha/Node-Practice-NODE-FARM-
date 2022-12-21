const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////////////////////////////
///SERVER
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res)=>{
    
   const {query, pathname} = url.parse(req.url, true);

    //Overview Page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
       const cardHtml = dataObj.map(e => replaceTemplate(tempCard, e)).join('');
       const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
      res.end(output);

        //Product Page
    } else if(pathname === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

        //API PAGE
    }else if(pathname === '/api'){
        res.writeHead(200, { 
            'Content-type': 'application/json'
         });
        res.end(data);
    }
    //Not found page
     else{
        res.writeHead(404, {
           'Content-Header': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Path doesn\'t exit.</h1>');
    }
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('Listening to the request from Port 8000....');
})




///////////////////////////////////////////////////
//////FILES
//Blocking and Synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is all about avagardo: ${textIn} \n Created on: ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been Created !');

//Non-blocking and Asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     console.log(data1);
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3)=> {
//             fs.writeFile('./txt/final.txt', `${data2} \n ${data3}`, err => {
//                 console.log('The file has been written');
//             });
//         });
//     });
// });
// console.log('This TExt.');
