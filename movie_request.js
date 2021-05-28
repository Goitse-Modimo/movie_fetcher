const http = require("https");

class OMDB {
	constructor(search){
		this.search = search;
		// this.refinedSearch = ;
	}
	refinedSearch () {
		if (this.search && this.search != '') {
			return this.search.split(' ').join('%');
		}
	}
	options() {
		// body...
		return {
			"method": "GET",
			"hostname": "imdb8.p.rapidapi.com",
			"port": null,
			"path": `/auto-complete?q=${this.refinedSearch()}`,
			"headers": {
				"x-rapidapi-key": "21c853834emshe27697c56c8757fp15d0e4jsnc310137f4305",
				"x-rapidapi-host": "imdb8.p.rapidapi.com",
				"useQueryString": true
			}
		}
	}

	getSearchResults() {
		// body...
		return new Promise((resolve, reject)=> {
			var options = this.options();

			const req = http.request(options, function (res) {
				const chunks = [];
				res.on("data", function (chunk) {
					chunks.push(chunk);
				});
				res.on("end", function () {
					const body = Buffer.concat(chunks).toString();
					resolve(JSON.parse(body));
				});
			});

			req.end();
		});
		
	}

}
module.exports = OMDB;