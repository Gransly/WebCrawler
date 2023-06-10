const express = require("express");

const {getLinksObject} = require('./utils/linksUtils');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.post("/parse", async function (request, response) {

    const firstLink = request.body.domainName;
    let links = [];

    const arrayLinks = await getLinksObject(firstLink);
    arrayLinks.forEach(value => links.push(value));
    while (links.some((value) => value.watched === false)) {
        const linkToFetchIndex = links.findIndex((value) => value.watched === false);
        const linksToAdd = await getLinksObject(links[linkToFetchIndex].urlToFetch);
        links[linkToFetchIndex].watched = true;
        linksToAdd.forEach((linkToAdd) => {
            if (!links.some((link) => link.urlToFetch === linkToAdd.urlToFetch) || !linkToAdd.urlToFetch) {
                links.push(linkToAdd)
            }
        })

    }

    //Bug почему то при вызове /v/e сохраняется статус 500, хотя его должны редиректить со статусом 200
    // Либо баг, либо я что-то не допонял
    const filteredLinksWithoutErrors = links.filter((link => link.status !== 404 && link.status !== 500 && link.urlParent !== firstLink))
        .map((link) => link.urlParent);

    const filteredLinksAll500 = links.filter((link => link.status === 500));
    const filteredLinks500WithContent = filteredLinksAll500.filter((link) => link.urlToFetch).map((link) => link.urlParent);
    // Избавляемся от дупликатов
    const set = new Set(filteredLinksWithoutErrors.concat(filteredLinks500WithContent));

    response.send(Array.from(set));
});


app.listen(3000);
