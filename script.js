
"use strict";

// HTTP Cats API endpoint
const API_URL = "https://http.cat";

const searchForm = document.getElementById("searchForm");
const statusCodeInput = document.getElementById("statusCode");
const catImage = document.getElementById("catImage");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");

const statusDescriptions = {
    200: {
        title: "OK — Success",
        text: "Great! The request was completed successfully."
    },
    301: {
        title: "Moved Permanently",
        text: "This resource has moved to another location."
    },
    404: {
        title: "Not Found",
        text: "Oops! The requested page could not be found."
    },
    418: {
        title: "I'm a Teapot",
        text: "A fun HTTP status code based on a teapot."
    },
    500: {
        title: "Internal Server Error",
        text: "The server encountered an unexpected problem."
    }
};

// Return a description for the selected status code.
function getStatusDescription(code) {
    return statusDescriptions[code] || {
        title: "HTTP Status Code",
        text: `Here is the cat illustration for HTTP status ${code}.`
    };
}

// Fetch the cat image and display the corresponding information.
async function loadCat(code) {
    const details = getStatusDescription(code);

    resultTitle.textContent = `${code} — ${details.title}`;
    resultText.textContent = details.text;

    // HTTP Cats returns an image for supported status codes.
    const imageUrl = `${API_URL}/${code}`;

    catImage.src = imageUrl;
    catImage.alt = `Cat illustration for HTTP ${code}`;
}

// Handle search form submission.
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const code = Number(statusCodeInput.value);

    if (code >= 100 && code <= 599) {
        loadCat(code);
    } else {
        resultTitle.textContent = "Invalid Status Code";
        resultText.textContent =
            "Please enter an HTTP status code between 100 and 599.";
    }
});

// Load a cat when a quick-code button is clicked.
document.querySelectorAll(".quick-buttons button").forEach(function (button) {
    button.addEventListener("click", function () {
        const code = Number(button.dataset.code);
        statusCodeInput.value = code;
        loadCat(code);
    });
});

// Display the default cat when the page loads.
loadCat(404);
