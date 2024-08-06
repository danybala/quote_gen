// get quotes from api

let apiData = [];


// Show new quote
function newQuote() {
    // pick a random quote from apiQuotes array

	const quote = apiData[Math.floor(Math.random() * apiData.length)];
	console.log(quote);

}

async function getData(mode) {
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
	const apiURL = `${proxyURL}https://zenquotes.io/api/${mode}/`;
	try {
		const response = await fetch(apiURL);
		apiData = await response.json();
        newQuote();
	} catch (error) {
		// catch error here
	}
}

// On load
getData('quotes');
