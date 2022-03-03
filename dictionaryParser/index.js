const fs = require("fs");

//open ./assets/words.txt

const fiveLetterWords = [];

fs.readFile("./assets/words.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(typeof data);

  //split the data into an array of words

  const words = data.split("\n");

  //loop through the words array
  words.forEach((word) => {
    //if the word is 5 letters long, push it to the fiveLetterWords array
    if (word.length === 5) {
      fiveLetterWords.push(word);
    }
  });

  //write the fiveLetterWords array to a new file called fiveLetterWords.txt

  fs.writeFile(
    "./assets/fiveLetterWords.json",
    JSON.stringify(fiveLetterWords),
    (err) => {
      if (err) throw err;
      console.log("File written");
    }
  );
});
