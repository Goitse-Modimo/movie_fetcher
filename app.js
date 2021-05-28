'use strict'

const http = require("https");
const OMDB = require('./movie_request.js');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funtion that listens for user input and returns a promise.
const searchInput = () => {
  return new Promise((resolve, reject) => {
    rl.question("Enter movie name or character " , (answer) => {
      resolve(answer);
    });
  });
}

// Function that writes data from api to a markdown file.
function writeToMarkdown(data) {
	// body...
	if (data) {
		var results = data.d;
		for (var i = results.length - 1; i >= 0; i--) {


			var contant = `
			# ${results[i].l}
			**Year:** ${results[i].y}
			**Actors:** ${results[i].s}
			**Ranking:** ${results[i].rank}
			`;
			fs.writeFile(path.join(__dirname, "/data", `${data.q}.md`), data.q, err => {
				if (err) throw err;
			});
			fs.appendFile(`./data/${data.q}.md`, contant, function (err) {
			  if (err) throw err;
			});
		}
		console.log(`Search results found in: ./data/${data.q}.md`);
	} else {
		console.error('Data parameter required!');
	}
}
// Main function
const main = async () => {

  var search = await searchInput();  			// Search input from user.
  var omdm =  new OMDB(search);   				// instence of OMDB class.
  var res = await omdm.getSearchResults(); 		// Stores an object of the response from the query. 
  await writeToMarkdown(res); 					// Call function that writes to a markdown file

  rl.close();									// Close readline.
}

main();
