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
	if (!quote.a) {
		authorText.textContent = "Unknown";
	} else {
		authorText.textContent = quote.a;
	}

	if (quote.q.length > 150) {
		quoteText.classList.add("long-quote");
	} else {
		quoteText.classList.remove("long-quote");
	}
	quoteText.textContent = quote.q;
	complete();
}

async function getData(mode) {
	loading();
	const proxyURL = "https://cors-anywhere.herokuapp.com/";
	const apiURL = `${proxyURL}https://zenquotes.io/api/${mode}/`;
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
getData("quotes");
complete();