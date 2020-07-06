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
const payPal = document.getElementById('paypal');
payPal.hidden = true;
const bitCoin = document.getElementById('bitcoin');
bitCoin.hidden = true;
const selectPaymentMethod = paymentDropdown[0];
selectPaymentMethod.selected = true;
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
		name.style.borderColor = 'lightgreen';
		nameLabel.style.color = 'lightgreen';
		nameLabel.innerHTML = 'Hello, ' + name.value;
	} else {
		name.style.borderColor = 'red';
		nameLabel.style.color = 'red';
		nameLabel.innerHTML = 'Name is required';
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
	const dotSymbol = emailValue.indexOf(`.`);
	if (atSymbol > 1 && dotSymbol > atSymbol + 1) {
		email.style.borderColor = 'lightgreen';
		emailLabel.style.color = 'lightgreen';
		emailLabel.innerHTML = 'Thanks!';
		return true;
	} else {
		email.style.borderColor = 'red';
		emailLabel.style.color = 'red';
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
			activitiesHeader.style.color = 'lightgreen';
			total.style.color = '';
			checked += 1;
		}
	}
	if (checked === 0) {
		activitiesHeader.style.color = 'red';
		total.style.color = 'red';
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
		cardNumber.style.borderColor = 'red';
		cardNumberLabel.style.color = 'red';
		cardNumberLabel.innerHTML = 'Please enter a credit card number';
		return false;
	} else if (/^[0-9]{0,12}$/.test(numberValue.value)) {
		cardNumber.style.borderColor = 'red';
		cardNumberLabel.style.color = 'red';
		cardNumberLabel.innerHTML = 'Number must be between 13 and 16 digits long';
		return false;
	} else if (!cardNumberRegex(numberValue)) {
		cardNumber.style.borderColor = 'red';
		cardNumberLabel.style.color = 'red';
		cardNumberLabel.innerHTML = 'Number must be between 13 and 16 digits long';
	} else {
		cardNumber.style.borderColor = 'lightgreen';
		cardNumberLabel.style.color = 'lightgreen';
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
		zip.style.borderColor = 'lightgreen';
		zipLabel.style.color = 'lightgreen';
		zipLabel.innerHTML = 'Valid Zip Code';
		return true;
	} else {
		zip.style.borderColor = 'red';
		zipLabel.style.color = 'red';
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
		cvv.style.borderColor = 'lightgreen';
		cvvLabel.style.color = 'lightgreen';
		cvvLabel.innerHTML = 'Valid CVV';
	} else {
		cvv.style.borderColor = 'red';
		cvvLabel.style.color = 'red';
		cvvLabel.innerHTML = 'Enter a 3 digit CVV';
	}
} 
cvv.addEventListener('keyup', (e) => {
	cvvValidator();
});

//submit button checks to see if the validator functions are met. Otherwise it will not submit data for the form
const submit = document.querySelector('form');
submit.addEventListener('submit', (e) => {
nameValidator();
emailValidator();
activityValidator();
cardNumberValidator();
zipValidator();
cvvValidator();


  if (!nameValidator() || !emailValidator() || !activityValidator() || !cardNumberValidator() || !zipValidator() || !cvvValidator()) {
    e.preventDefault();
  }
});