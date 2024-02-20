//regex for name, email, and 2 most common banking cards
const yourName = document.getElementById("nameInput");
const yourEmail = document.getElementById("emailInput");
const yourCard = document.getElementById("cardInput");

//functions for validating name, email and card details
function isValidName(name) {
    const nameReg = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return nameReg.test(name);
}

function isValidEmail(email) {
    const emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailReg.test(email);
}

function isValidCard(card) {
    if (typeof card !== 'string' || card.length < 13 || card.length > 19) {
        return false;
    }
    let yourCardInt = card.split('').map(Number);
    for (let i = yourCardInt.length - 2; i >= 0; i = i - 2) {
        let tempValue = yourCardInt[i];
        tempValue = tempValue * 2;
        if (tempValue > 9) {
            tempValue = tempValue % 10 + 1;
        }
        yourCardInt[i] = tempValue;
    }
    let total = 0;
    for (let i = 0; i < yourCardInt.length; i++) {
        total += yourCardInt[i];
    }
    return total % 10 == 0;
}

// Adding event listener to submit button to validate
const submitButton = document.getElementById("submitButton").addEventListener("click", function () {
    const nameInput = yourName.value;
    const emailInput = yourEmail.value;
    const cardInput = yourCard.value;

    let isValid = true;

    // Validate name
    if (!isValidName(nameInput)) {
        alert("Please enter a valid name.");
        isValid = false;
    }

    if (!isValidEmail(emailInput)) {
        alert("Please enter a valid email address");
        isValid = false;
    }

    if (!isValidCard(cardInput)) {
        alert("Please enter a valid card number");
        isValid = false;
    }

    // If all inputs are valid, proceed with submission
    if (isValid) {
        yourName.value = "";
        yourEmail.value = "";
        yourCard.value = "";
        alert("Form submitted successfully!");
        sendResults(nameInput, emailInput, cardInput);
    }
});

// Function to send results via email
function sendResults(name, email, card) {
    const subject = encodeURIComponent("New Form Submission!");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCard Number: ${card}`);
    const mailtoLink = `mailto:test@dn-uk.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}


// Function to validate input and change background color accordingly
function validateInput(inputElement, isValidFunction) {
    inputElement.addEventListener("blur", function () {
        const inputValue = inputElement.value;
        if (isValidFunction(inputValue)) {
            inputElement.style.backgroundColor = "#89c82e"; // Change background color to green
        } else {
            inputElement.style.backgroundColor = "#700064"; // Change background color to pink if invalid
        }
    });
}

validateInput(yourName, isValidName);
validateInput(yourEmail, isValidEmail);
validateInput(yourCard, isValidCard);