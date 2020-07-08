// Interactive Form Project - Jairo Hernandez

/*
GOING FOR EXCEEDS EXPECTATIONS GRADE
*/

//sets the focus on the name input field
const name = document.getElementById('name');
name.focus();

// Initially hides the Other job role text field but displays it when selected
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-title');
otherJobRole.style.display = 'none';
jobRole.addEventListener('change', () => {
	jobRole.value === 'other' ?
		otherJobRole.style.display = 'block' :
		otherJobRole.style.display = 'none';
	otherJobRole.focus();
});

// T-shirt section
// creates the placeholder and disables the dropdown 
const colorsDropdown = document.getElementById('color');
const colorDiv = document.querySelector('#colors-js-puns');
colorDiv.hidden = true;

// filters color options when selecting a shirt theme
const themeSelected = document.getElementById('design');
colorOptions = colorsDropdown.options;
const selectTheme = themeSelected[0];
selectTheme.selected = true;
selectTheme.hidden = true;
themeSelected.addEventListener('change', () => {
	colorDiv.hidden = false;
	for (let i = 0; i < colorsDropdown.length; i++) {
		if (themeSelected.value === 'js puns') {
			if (i < 3){
				colorOptions[0].selected = true;
				colorOptions[i].hidden = false;
			} else {
				colorOptions[i].hidden = true;
			}
		}

		if (themeSelected.value === 'heart js') {
			if (i >= 3){
				colorOptions[3].selected = true;
				colorOptions[i].hidden = false;
			} else {
				colorOptions[i].hidden = true;
				}
			}
		};
});

// Register for activity
// create element showing total price from selected activities
const activities = document.querySelector('.activities');
const activityOptions = document.querySelectorAll('.activities input');
const total = document.createElement('p');
total.id = 'total';
total.innerHTML = 'Total: $0';
let costTotal = 0;
activities.appendChild(total);

// selects activity while disabling conflicting options with selection
activities.addEventListener('change', (e) => {
	const clicked = e.target;
	const clickedTime = clicked.getAttribute('data-day-and-time');
	const cost = parseInt(clicked.getAttribute('data-cost'));

	// determines total cost based on activities selected
	if (clicked.checked) {
		costTotal += cost;
		total.innerHTML = `Total: $${costTotal}`;
	} else {
		costTotal -= cost;
		total.innerHTML = `Total: $${costTotal}`;
	}

	// disables activities with conflicting times
	activityOptions.forEach(activity => {
		let activityTime = activity.getAttribute('data-day-and-time');
		if (clickedTime === activityTime && clicked !== activity) {
			clicked.checked ?
				activity.disabled = true :
				activity.disabled = false;
		}
	})

});

// determines payment option based on payment method. Credit card method by default
const paymentDropdown = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
creditCard.selected = true;
const card = paymentDropdown.value = 'credit card';
card.selected = true;
const payPal = document.getElementById('paypal');
payPal.hidden = true;
const bitCoin = document.getElementById('bitcoin');
bitCoin.hidden = true;
const selectPaymentMethod = paymentDropdown[0];
selectPaymentMethod.hidden = true;
paymentDropdown.addEventListener('change', () => {
	if (paymentDropdown.value === 'credit card') {
		creditCard.style.display = 'block';
		payPal.style.display = 'none';
		bitCoin.style.display = 'none';
	} else if (paymentDropdown.value === 'paypal') {
		payPal.style.display = 'block';
		creditCard.style.display = 'none';
		bitCoin.style.display = 'none';
	} else {
		bitCoin.style.display = 'block';
		payPal.style.display = 'none';
		creditCard.style.display = 'none';
	}
});

// Form validation - real-time validations for each text field
// name input is valid if there is more than 1 character for their name
name.placeholder = 'John Smith';
const nameLabel = name.labels[0];
const nameValidator = () => {
	const nameValue = name.value;
	if (nameValue.length > 1) {
		name.style.borderColor = '#9ac7b0';
		nameLabel.style.color = '#457644';
		nameLabel.innerHTML = 'Hello, ' + name.value;
		return true;
	} else {
		name.style.borderColor = '#990000';
		nameLabel.style.color = '#990000';
		nameLabel.innerHTML = 'Name is required';
		return false;
	}
} 
name.addEventListener('keyup', (e) => {
	nameValidator();
});
// email input is valid if there is an '@' symbol with a '.' symbol after, in the text field
const email = document.getElementById('mail');
email.placeholder = 'example@email.com';
const emailLabel = email.labels[0];
const emailValidator = () => {
	const emailValue = email.value;
	const atSymbol = emailValue.indexOf(`@`);
	const dotSymbol = emailValue.indexOf(`.com`);
	if (atSymbol > 1 && dotSymbol > atSymbol + 1) {
		email.style.borderColor = '#9ac7b0';
		emailLabel.style.color = '#457644';
		emailLabel.innerHTML = 'Thanks!';
		return true;
	} else {
		email.style.borderColor = '#990000';
		emailLabel.style.color = '#990000';
		emailLabel.innerHTML = 'Valid email is required';
		return false;
	}
} 
email.addEventListener('keyup', (e) => {
	emailValidator();
});
// requires at least 1 activity to be registered
const activityValidator = () => {
	const activitiesHeader = document.querySelector('.activities legend');
	let checked = 0;
	for (let i = 0; i < activityOptions.length; i++) {
		if (activityOptions[i].checked) {
			activitiesHeader.style.color = '#457644';
			total.style.color = '';
			checked += 1;
		}
	}
	if (checked === 0) {
		activitiesHeader.style.color = '#990000';
		total.style.color = '#990000';
		total.innerHTML = 'Registering for an activity is required';
		return false;
	} else if (checked > 0) {
		return true;
	}
} 
activities.addEventListener('mouseout', (e) => {
	activityValidator();
});
activities.addEventListener('click', (e) => {
	activityValidator();
});

// card input must be digits and between 13 and 16 digits long
function cardNumberRegex(cardNumber) {
  return /^\d{13,16}$/.test(cardNumber);
}
const cardNumber = document.getElementById('cc-num');
cardNumber.placeholder = '1234567890123'
const cardNumberLabel = cardNumber.labels[0];
const cardNumberValidator = () => {
	const numberValue = cardNumber.value;
	if(numberValue === '') {
		cardNumber.style.borderColor = '#990000';
		cardNumberLabel.style.color = '#990000';
		cardNumberLabel.innerHTML = 'Please enter a credit card number';
		return false;
	} else if (/^[0-9]{0,12}$/.test(numberValue.value)) {
		cardNumber.style.borderColor = '#990000';
		cardNumberLabel.style.color = '#990000';
		cardNumberLabel.innerHTML = 'Number between 13 and 16 digits long';
		return false;
	} else if (!cardNumberRegex(numberValue)) {
		cardNumber.style.borderColor = '#990000';
		cardNumberLabel.style.color = '#990000';
		cardNumberLabel.innerHTML = 'Number between 13 and 16 digits long';
		return false;
	} else {
		cardNumber.style.borderColor = '#9ac7b0';
		cardNumberLabel.style.color = '#457644';
		cardNumberLabel.innerHTML = 'Valid Card Number';
		return true;
	}
} 
cardNumber.addEventListener('keyup', (e) => {
	cardNumberValidator();
});

// zip code input must be a digit and 5 digits long
function zipRegex(zip) {
  return /^\d{5}$/.test(zip);
}
const zipCode = document.getElementById('zip');
zipCode.placeholder = '12345';
const zipLabel = zipCode.labels[0];
const zipValidator = () => {
	const zipValue = zip.value;
	const zipAllowed = /^[0-9]{5}$/;
	if (zipRegex(zipValue)) {
		zip.style.borderColor = '#9ac7b0';
		zipLabel.style.color = '#457644';
		zipLabel.innerHTML = 'Valid Zip Code';
		return true;
	} else {
		zip.style.borderColor = '#990000';
		zipLabel.style.color = '#990000';
		zipLabel.innerHTML = 'Enter a 5 digit Zip';
		return false;
	}
	return;
} 
zipCode.addEventListener('keyup', (e) => {
	zipValidator();
});

// cvv input must be a digit and 3 digits long
function cvvRegex(cvv) {
  return /^\d{3}$/.test(cvv);
}
const cvv = document.getElementById('cvv');
cvv.placeholder = '123';
const cvvLabel = cvv.labels[0];
const cvvValidator = () => {
	const cvvValue = cvv.value;
	if (cvvRegex(cvvValue)) {
		cvv.style.borderColor = '#9ac7b0';
		cvvLabel.style.color = '#457644';
		cvvLabel.innerHTML = 'Valid CVV';
		return true;
	} else {
		cvv.style.borderColor = '#990000';
		cvvLabel.style.color = '#990000';
		cvvLabel.innerHTML = 'Enter a 3 digit CVV';
		return false;
	}
} 
cvv.addEventListener('keyup', (e) => {
	cvvValidator();
});

//submit button checks to see if the validator functions are met. Otherwise it will not submit data for the form
const submit = document.querySelector('form');
submit.addEventListener('submit', (e) => {
	if (!nameValidator()) {
    	e.preventDefault();
    }
    if (!emailValidator()) {
    	e.preventDefault();
    }
    if (!activityValidator()) {
    	e.preventDefault();
    }
    if (payment.value === 'credit card') {
		if (!cardNumberValidator()) {
		e.preventDefault();
		}
		if (!zipValidator()) {
    	e.preventDefault();
    	}
    	if (!cvvValidator()) {
    	e.preventDefault();
		}
	}
});