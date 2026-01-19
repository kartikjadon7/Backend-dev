const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    const words = data.trim().split(/\s+/);
    const count = words.length;

    const result = "Total words: " + count;

    fs.writeFile('output.txt', result, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
});
