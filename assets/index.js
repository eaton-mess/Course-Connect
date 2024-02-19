//I want users to only be able to add valid names
//I want users to only be able to add valid email addresses
//I want users to only be able to add valid credit/debit card information
//alll validaiton to be done on one page utilisiing local.storage
//issues being highlighted to the user when they are still entering a field of as soon as possible after
//correct fields should be shown as DN green, errors shown in DN pink
//ensure that any data capture is secure and there is no risk of database corruption through SQL injection. Only standard upper / lower case. letters and printable characters: !#$%&'*+-/=?^_`{|}~ should be allowed in all fields.
//ensure that all accepted credit cards conform to the LUHN algorithm
//I need an Email to test@dn-uk.com be sent containing the validated information when a user presses a ‘Submit’ button.

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
    if (card.length < 13 || card.length > 19 || !luhnCheck(card)) {
        return false;
    }
    return true;
}

function luhnCheck(card) {
    let sum = 0;
    let alternate = false;
    for (let i = card.length - 1; i >= 0; i--) {
        let num = parseInt(card.charAt(i), 10);
        if (alternate) {
            num *= 2;
            if (num > 9) {
                num -= 9;
            }
        }
        sum += num;
        alternate = !alternate;
    }
    return sum % 10 === 0;
}

//testing to see if numbers of a certain length are classified as 'true'
console.log(luhnCheck(4532939247381250));
console.log(luhnCheck(4532939247381251));

// Adding event listeners to submit button to validate
const validateAll = document.getElementById("submitButton").addEventListener("click", function () {
    const nameInput = yourName.value;
    const emailInput = yourEmail.value;
    let cardInput = yourCard.value;

    // Remove any non-digit characters from the card number
    cardInput = cardInput.replace(/\D/g, '');

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
    //clears the inputs
    if (isValid) {
        yourName.value = "";
        yourEmail.value = "";
        yourCard.value = "";
        alert("Form submitted successfully!");
        sendResults(nameInput, emailInput, cardInput);
    }
})

// function sendResults(name, email, card) {
//     const subject = encodeURIComponent("New Form Submission!");
//     const body = encodeURIComponent('Name: $[name}\nEmail: ${email}\nCard Number: ${card}');
//     const endEmail = 'mailto:test@dn-uk.com?subject=${subject}&body=${body}';
// window.location.href = mailtoLink;
// }

//problem!! the numbers are showing as correect in the console from the luhnCheck, but when inputted into the actual form, it doesn't want to accept them 

// Function to validate input and change background colour accordingly
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
