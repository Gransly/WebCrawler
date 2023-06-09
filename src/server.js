const express = require("express");

const { fetcher } = require('./fetcher.js');

/*
    TODO: краулер страницы
    POST http://localhost:3000/parse
    body: { domainName: string}
    return string[]
*/
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.post("/parse", function(request, response){
    response.send(fetcher(request.body.domainName));
});

app.listen(3000);