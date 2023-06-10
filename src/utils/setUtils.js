function differenceInSet(setA, setB) {
    const diff = new Set(setA);

    for (const elem of setB) {
        diff.delete(elem);
    }

    return Array.from(diff);
}

module.exports = {differenceInSet};
