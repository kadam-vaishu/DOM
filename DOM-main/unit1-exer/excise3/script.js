const div = document.querySelector("div");

const newParagraph = document.createElement("p");

newParagraph.textContent = "This paragraph was added using JavaScript!";
div.appendChild(newParagraph);