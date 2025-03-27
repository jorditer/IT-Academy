// api tienes que poner ubicacion, 

let joke: HTMLElement | null = document.getElementById("joke");



type Feedback = {
	joke: string;
	score: 1 | 2 | 3;
	date: string;
}

let reportAcudits: Feedback[] = [];

async function getDadJoke(randomInt: number) {
	try {
		let response;
		if (randomInt) {
			response = await fetch("https://icanhazdadjoke.com/", { 
				headers: { 'Accept': 'application/json' }
			});
		} else {
			response = await fetch("https://api.chucknorris.io/jokes/random");
		}  
		if (!response.ok) {
			throw new Error("Error API");
		}
		
		const data = await response.json();  // Store the parsed JSON data
		//   console.log(data);  // Access the JSON data outside of fetch
		return data;  // You can return the data from this function if needed
		
	} catch (error) {
		console.error(error);  // Handle errors here
	}
}

// Dad-jokes
let updateJoke = () => {
	// Handle checked button
	let selectedButton = document.querySelector('.btn-check:checked') as HTMLInputElement; // queryselector returns Element, that has no .value
	if (selectedButton) {
		let score = parseInt(selectedButton?.value);
		reportAcudits.push({
			joke: joke?.innerText || "",
			score: score as Feedback['score'],
			date: new Date().toISOString()
		})
		console.log(reportAcudits);
		selectedButton.checked = false;
	}
	showJoke();
}
// Change Joke
function showJoke() {
	let randomInt = Math.floor(Math.random() * 2);
	getDadJoke(randomInt).then(data => {
		if (joke && randomInt) {
			joke.innerText = data.joke;    // .joke for 1 .value for 2
		} else if (joke && !randomInt) {
			joke.innerText = data.value;    // .joke for 1 .value for 2
		} else {
			console.error("Element not found");
		}
	});
}
// Calling weather API
async function getWeather() {
	try {
		let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=f7d247841ee2322a0409360fa64ff0b9", { 
			headers: { 'Accept': 'application/json' }
		});
		if (!response.ok) {
			throw new Error("Error API");
		}
		const data = await response.json()
		// Handling temperature
		const temp = document.getElementById("temp");
		if (temp)
			temp.innerText = `${Math.round(data.main.temp - 273.15)}°`;
		// Handling weather img
		const icon = document.getElementById("weather-icon") as HTMLImageElement;
		const id = data.weather[0].id;
		console.log(id);
		console.log(icon);
		console.log(data.main.temp);
		if (icon) {
			if (id == 800) {
				icon.src = "../../imgs/800.png";
			} else if (id > 800){
				//clouds
				icon.src = "../../imgs/800+.png";
			} else if (id > 700){
				//Atmosphere
				icon.src = "../../imgs/700.png";
			} else if (id >= 600){
				//snow
				icon.src = "../../imgs/600.png";
			} else if (id >= 500){
				//rain
				icon.src = "../../imgs/500.png";
			} else if (id >= 300){
				//drizzle
				icon.src = "../../imgs/300.png";
			} else if (id >= 200){
				//thunderstorm
				icon.src = "../../imgs/200.png";
			}
		}
	}
	catch (error){
		throw new Error("Error API 2");
	}
}
// Blobs
const blobImages = [
	'../../imgs/blob1.png',
	'../../imgs/blob2.png',
	'../../imgs/blob3.png',
	'../../imgs/blob4.png',
	'../../imgs/blob5.png',
]

function getRandomBlob() {
	const randIndex = Math.floor(Math.random() * blobImages.length);
	return blobImages[randIndex];
}
// On page load
function preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const blob1 = getRandomBlob();
        const blob2 = getRandomBlob();
        const blob3 = getRandomBlob();

        await Promise.all([
            preloadImage(blob1),
            preloadImage(blob2),
            preloadImage(blob3)
        ]);

        document.body.style.setProperty('--blob-image', `url('${blob1}')`);
        (document.getElementById("blob2") as HTMLImageElement).src = blob2;
        (document.getElementById("blob3") as HTMLImageElement).src = blob3;

        document.body.classList.add('loaded'); // Show the body after preloading
    } catch (error) {
        console.error('Error preloading images:', error);
        document.body.classList.add('loaded'); // Show the body even if preloading fails
    }

    getWeather();
    showJoke();
    document.getElementById('jokeButton')?.addEventListener('click', updateJoke);
});