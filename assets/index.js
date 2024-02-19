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
    const cardReg = /^[0-9]{13,19}$/;
    if (!cardReg.test(card)) {
        return false;
    }
    return luhnCheck(card);
}

//LUHN algorithm check
function luhnCheck(cardNumber) {
    let sum = 0;
    let alternate = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let num = parseInt(cardNumber.charAt(i), 10);
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
console.log(isValidCard(4532816076205022));
console.log(isValidCard(4543612183186814));
console.log(isValidCard(4556057757164883));

// Adding event listeners to submit button to validate
const validateAll = document.getElementById("submitButton").addEventListener("click", function () {
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
    //clears the inputs
    if (isValid) {
        yourName.value = "";
        yourEmail.value = "";
        yourCard.value = "";
        alert("Form submitted successfully!");
    }
})


