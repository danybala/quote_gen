// get quotes from api

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xButton = document.getElementById("x");
const newQuoteBtn = document.getElementById("new-quote");

let apiData = [];


// Show new quote
function newQuote() {
    // pick a random quote from apiQuotes array

	const quote = apiData[Math.floor(Math.random() * apiData.length)];
	authorText.textContent = quote.a;
	quoteText.textContent = quote.q;
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
