import { MY_API_KEY } from './config.js';

fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "quotes15.p.rapidapi.com",
		"x-rapidapi-key": MY_API_KEY
	}
})
.then(response => response.json())
.then(response => {
    console.log(response);
	console.log(response.content);
    
    document.getElementById('quote').innerHTML = '"'+response.content+'"';
    document.getElementById('author').innerHTML = '- ' + response.originator.name + ' -';
	document.getElementById('url').innerHTML = 'Referencia:\n- ' + response.originator.url + ' -';
})
.catch(err => {
	console.log(err);
});