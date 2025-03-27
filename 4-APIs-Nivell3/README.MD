# Joke Generator Web Application

## Overview

This project is a web application designed to showcase your skills in web development. The application fetches random jokes and displays them to the user, allowing them to rate the jokes using emoji buttons. Additionally, it fetches the current weather and temperature, converting the temperature into Celsius and displaying a corresponding weather image. The project demonstrates your proficiency in HTML, CSS, JavaScript, and integration with external APIs and libraries like Bootstrap.

The application integrates with three external APIs:
1. **Chuck Norris Jokes API**: Fetches random Chuck Norris jokes.
2. **Dad Jokes API**: Fetches random Dad jokes.
3. **Weather API**: Fetches the current weather and temperature, converts the temperature into Celsius, and displays a corresponding weather image.

## Features

- **Random Joke Display**: Fetches and displays random jokes from two different APIs.
- **User Rating**: Allows users to rate jokes using emoji buttons.
- **Weather Information**: Fetches the current weather and temperature, converts the temperature into Celsius, and displays a corresponding weather image.
- **Dynamic Background**: Uses CSS variables and JavaScript to dynamically change the background images.
- **Responsive Design**: Utilizes Bootstrap for a responsive and visually appealing design.
- **Image Preloading**: Ensures images are preloaded to prevent flickering or empty images on page load.

## Technologies Used

- **HTML**: Structure of the web application.
- **CSS/SCSS**: Styling and layout, including dynamic background images.
- **JavaScript**: Fetching jokes, handling user interactions, and dynamically updating the UI.
- **Bootstrap**: Responsive design and pre-built components.
- **Node.js**: For managing dependencies.

## Setup and Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/jorditer/4-APIs-Nivell3.git
    cd 4-APIs-Nivell3
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Application**:
    Open `index.html` in your web browser.

## Usage

- **View Jokes**: The application will display a random joke when loaded.
- **Rate Jokes**: Use the emoji buttons to rate the jokes.
- **Next Joke**: Click the "Següent acudit" button to fetch and display the next joke.

## Code Explanation

### HTML

The HTML structure includes a header, a card to display the joke, and buttons for rating and fetching the next joke.

```html
<div class="d-flex justify-content-center align-items-center vh-100">
    <div class="col-12 col-md-8 card shadow p-3 py-5 d-flex flex-column custom-card-height">
        <h1 class="mx-auto">😆 Preparat per riure? 😆</h1>
        <div class="flex-grow-1 d-flex align-items-center">
            <h3 class="text-center col-10 mx-auto" id="joke"></h3>
        </div>
        <div class="d-flex align-items-center justify-content-center gap-5 mb-3 mb-md-4">
            <input type="radio" id="score1" value="1" name="score" class="btn-check" autocomplete="off">
            <label for="score1" class="btn fs-2">😥</label>
            <input type="radio" id="score2" value="2" name="score" class="btn-check" autocomplete="off">
            <label for="score2" class="btn fs-2">😑</label>
            <input type="radio" id="score3" value="3" name="score" class="btn-check" autocomplete="off">
            <label for="score3" class="btn fs-2">🤭</label>
        </div>
        <button id="jokeButton" class="btn btn-lg btn-primary mx-auto d-block mt-auto">Següent acudit</button>
    </div>
    <img id="blob2" class="bottom-left-image m-5" src="" alt="blob-2">
    <img id="blob3" class="top-right-image m-5" src="" alt="blob-3">
</div>
```

### CSS/SCSS

The CSS includes styles for the body, card, and dynamically positioned images.

```scss
body {
    display: none; /* Hide the body initially */
    background: 
        var(--blob-image) no-repeat center center fixed,
        url('imgs/laughing.jpg') no-repeat center center fixed;
    background-size: contain, cover;
    background-repeat: no-repeat, no-repeat;
    background-position: center center, center center;
    background-attachment: fixed, fixed;
    z-index: 1;
}

body.loaded {
    display: block; /* Show the body when it is loaded */
}

.top-right-image {
    position: fixed;
    top: 5vh; 
    right: 5vw; 
    width: 140px; 
    height: auto; /* Maintain aspect ratio */
    z-index: 3; 
}
```

### JavaScript

The JavaScript handles fetching jokes, updating the UI, and preloading images.

```javascript
const blobImages = [
	'imgs/blob1.png',
	'imgs/blob2.png',
	'imgs/blob3.png',
	'imgs/blob4.png',
	'imgs/blob5.png',
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
```

## Conclusion

This project demonstrates a dynamic, responsive web application using modern web development technologies. It showcases HTML, CSS, JavaScript, and the integration of external libraries like Bootstrap. Feel free to explore and modify the code to further enhance its functionality and design!
