const {fetcher} = require("../fetcher");

function findLinks(text) {
    const regex = /href="(.*?)"/gm;
    const array = text.match(regex);
    if (!array) {
        return null;
    }
    return array.map(value => value.replace(/href="|"/g, ""));
}

async function getLinks(url) {
    const res = await fetcher(url);
    const text = await res.text();
    return findLinks(text);
}

module.exports = {getLinks};
