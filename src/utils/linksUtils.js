const {fetcher} = require("../fetcher");

function findLinks(text) {
    const regex = /href="(.*?)"/gm;
    const array = text.match(regex);
    if (!array) {
        return null;
    }
    return array.map(value => value.replace(/href="|"/g, ""));
}

async function getLinksObject(url) {
    const res = await fetcher(url);
    const text = await res.text();
    const links = findLinks(text);
    if(!links){
        return [{
            status: res.status,
            watched: true,
            urlToFetch: null,
            urlParent: url,
        }];
    }
    return links.map((value) => ({
        urlToFetch: value,
        urlParent: url,
        status: res.status,
        watched: false,
    }));
}



module.exports = {getLinksObject};
