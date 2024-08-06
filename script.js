// get quotes from api

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xButton = document.getElementById("x");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiData = [];

function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function complete() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

// Show new quote
function newQuote() {
	loading();
	// pick a random quote from apiQuotes array
	const quote = apiData[Math.floor(Math.random() * apiData.length)];
	if (!quote.author) {
		authorText.textContent = "Unknown";
	} else {
		authorText.textContent = quote.author;
	}

	if (quote.text.length > 150) {
		quoteText.classList.add("long-quote");
	} else {
		quoteText.classList.remove("long-quote");
	}
	quoteText.textContent = quote.text;
	complete();
}

async function getData() {
	loading();
	// const proxyURL = "https://cors-anywhere.herokuapp.com/";
	const apiURL = `https://type.fit/api/quotes`;
	try {
		const response = await fetch(apiURL);
		apiData = await response.json();
		newQuote();
	} catch (error) {
		// catch error here
	}
}

function tweetQuote() {
	const xUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(xUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
xButton.addEventListener("click", tweetQuote);

// On load
getData();
complete();