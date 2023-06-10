const express = require("express");

const { getLinks } = require('./utils/linksUtils');
const { differenceInSet } = require('./utils/setUtils');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.post("/parse", async function (request, response) {
    let links = new Set();
    let fetchedLinks = new Set();

    const arrayLinks = await getLinks(request.body.domainName);
    arrayLinks.forEach(value => links.add(value));
    fetchedLinks.add(request.body.domainName);

    while (differenceInSet(links, fetchedLinks).length !== 0) {
        const linkToFetch = differenceInSet(links, fetchedLinks)[0];
        const arrayLinks = await getLinks(linkToFetch);
        if(arrayLinks){
            arrayLinks.forEach(value => links.add(value));
        }
        fetchedLinks.add(linkToFetch);
    }

    response.send(Array.from(links));
});


app.listen(3000);

