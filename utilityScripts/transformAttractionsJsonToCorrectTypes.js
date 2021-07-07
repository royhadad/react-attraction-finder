const fs = require('fs')

fs.readFile('./server/attractions.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const parsedData = JSON.parse(data);
    const mappedData = parsedData.map((a) => ({...a, X: Number(a.X), Y: Number(a.Y)}));
    console.log(mappedData)
    const finishedJson = JSON.stringify(mappedData);

    fs.writeFile('attractionsMapped.json', finishedJson, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
    });
})