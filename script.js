let quoteText = document.getElementById('quoteText');
let quoteContainer = document.getElementById('quote-container')
let authorText = document.getElementById('author');
let newQuoteButton = document.getElementById('new-quote');
let twitterButton = document.getElementById('twitter');
let loader = document.getElementById('loader');

let apiQuotes = []
function loaderOn(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}
function loaderOff(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
function newQuote(){
    loaderOn();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    quoteText.textContent = quote.text;
    if(!quote.author){
        authorText.textContent= 'Unknown';
    }else{
        authorText.textContent= quote.author;
    }    
    loaderOff();
}

function tweetQuote(){
    const twitterUrlApi= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrlApi,'_blank')
}


async function getQuotes(){
    loaderOn();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        //Using await because it will assign fetch(apiUrl) instead of its response
        const responseQuote = await fetch(apiUrl);
        apiQuotes = await responseQuote.json();
        newQuote();
    } catch(error){
        alert(error);
    }
}

//On load page
getQuotes();

newQuoteButton.addEventListener('click',newQuote);
twitterButton.addEventListener('click',tweetQuote)