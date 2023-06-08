const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.post("/parse", function(request, response){
    response.send(`<h2>${request.body.domainName}</h2>`);
});

app.listen(3000);