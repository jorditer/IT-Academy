"use strict";
// api tienes que poner ubicacion, 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let joke = document.getElementById("joke");
let reportAcudits = [];
function getDadJoke(randomInt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response;
            if (randomInt) {
                response = yield fetch("https://icanhazdadjoke.com/", {
                    headers: { 'Accept': 'application/json' }
                });
            }
            else {
                response = yield fetch("https://api.chucknorris.io/jokes/random");
            }
            if (!response.ok) {
                throw new Error("Error API");
            }
            const data = yield response.json(); // Store the parsed JSON data
            //   console.log(data);  // Access the JSON data outside of fetch
            return data; // You can return the data from this function if needed
        }
        catch (error) {
            console.error(error); // Handle errors here
        }
    });
}
// Dad-jokes
let updateJoke = () => {
    // Handle checked button
    let selectedButton = document.querySelector('.btn-check:checked'); // queryselector returns Element, that has no .value
    if (selectedButton) {
        let score = parseInt(selectedButton === null || selectedButton === void 0 ? void 0 : selectedButton.value);
        reportAcudits.push({
            joke: (joke === null || joke === void 0 ? void 0 : joke.innerText) || "",
            score: score,
            date: new Date().toISOString()
        });
        console.log(reportAcudits);
        selectedButton.checked = false;
    }
    showJoke();
};
// Change Joke
function showJoke() {
    let randomInt = Math.floor(Math.random() * 2);
    getDadJoke(randomInt).then(data => {
        if (joke && randomInt) {
            joke.innerText = data.joke; // .joke for 1 .value for 2
        }
        else if (joke && !randomInt) {
            joke.innerText = data.value; // .joke for 1 .value for 2
        }
        else {
            console.error("Element not found");
        }
    });
}
// Calling weather API
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch("https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=f7d247841ee2322a0409360fa64ff0b9", {
                headers: { 'Accept': 'application/json' }
            });
            if (!response.ok) {
                throw new Error("Error API");
            }
            const data = yield response.json();
            // Handling temperature
            const temp = document.getElementById("temp");
            if (temp)
                temp.innerText = `${Math.round(data.main.temp - 273.15)}°`;
            // Handling weather img
            const icon = document.getElementById("weather-icon");
            const id = data.weather[0].id;
            console.log(id);
            console.log(icon);
            console.log(data.main.temp);
            if (icon) {
                if (id == 800) {
                    icon.src = "../../imgs/800.png";
                }
                else if (id > 800) {
                    //clouds
                    icon.src = "../../imgs/800+.png";
                }
                else if (id > 700) {
                    //Atmosphere
                    icon.src = "../../imgs/700.png";
                }
                else if (id >= 600) {
                    //snow
                    icon.src = "../../imgs/600.png";
                }
                else if (id >= 500) {
                    //rain
                    icon.src = "../../imgs/500.png";
                }
                else if (id >= 300) {
                    //drizzle
                    icon.src = "../../imgs/300.png";
                }
                else if (id >= 200) {
                    //thunderstorm
                    icon.src = "../../imgs/200.png";
                }
            }
        }
        catch (error) {
            throw new Error("Error API 2");
        }
    });
}
// Blobs
const blobImages = [
    '../../imgs/blob1.png',
    '../../imgs/blob2.png',
    '../../imgs/blob3.png',
    '../../imgs/blob4.png',
    '../../imgs/blob5.png',
];
function getRandomBlob() {
    const randIndex = Math.floor(Math.random() * blobImages.length);
    return blobImages[randIndex];
}
// On page load
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
    });
}
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const blob1 = getRandomBlob();
        const blob2 = getRandomBlob();
        const blob3 = getRandomBlob();
        yield Promise.all([
            preloadImage(blob1),
            preloadImage(blob2),
            preloadImage(blob3)
        ]);
        document.body.style.setProperty('--blob-image', `url('${blob1}')`);
        document.getElementById("blob2").src = blob2;
        document.getElementById("blob3").src = blob3;
        document.body.classList.add('loaded'); // Show the body after preloading
    }
    catch (error) {
        console.error('Error preloading images:', error);
        document.body.classList.add('loaded'); // Show the body even if preloading fails
    }
    getWeather();
    showJoke();
    (_a = document.getElementById('jokeButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', updateJoke);
}));
