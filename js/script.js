// Interactive Form Project - Jairo Hernandez

// global variables
const name = document.getElementById('name');
const nameLabel = name.labels[0];
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-title');

// Initially hides the Other job role text field but displays it when selected
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
colorsDropdown.disabled = true;
const placeHolder = document.createElement('option');
placeHolder.text = 'Please select a T-shirt theme';
placeHolder.selected = true;
colorsDropdown.appendChild(placeHolder);

// filters color options when selecting a shirt theme
const themeSelected = document.getElementById('design');
colorOptions = colorsDropdown.options;
const selectTheme = themeSelected[0];
selectTheme.selected = true;
selectTheme.hidden = true;

themeSelected.addEventListener('change', () => {
	colorsDropdown.disabled = false;
	placeHolder.hidden = true;
	selectTheme.hidden = true;
	for (let i = 0; i < colorsDropdown.length; i++) {
		if (themeSelected.value === 'js puns') {
			// recode this to make dynamic-ish
			if (i < 3){
				colorOptions[0].selected = true;
				colorOptions[i].hidden = false;
			} else {
				colorOptions[i].hidden = true;
			}
		} else { colorOptions[3].selected = true;
			if (i >= 3) {
				colorOptions[i].hidden = false;
				colorOptions[6].hidden = true;
			} else {
				colorOptions[i].hidden = true;
				}
			};
			//
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

// Form validation
// submit - const submite = document.querySelector('#submit');
const email = document.getElementById('mail');
const emailLabel = email.labels[0];
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');

const nameValidator = () => {
	const nameValue = name.value;
	if (nameValue.length > 0) {
		name.style.borderColor = 'lightgreen';
		nameLabel.style.color = '';
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
const emailValidator = () => {
	const emailValue = email.value;
	const atSymbol = emailValue.indexOf(`@`);
	const dotSymbol = emailValue.indexOf(`.`);
	if (atSymbol > 1 && dotSymbol > atSymbol + 1) {
		email.style.borderColor = 'lightgreen';
		emailLabel.style.color = '';
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
activities.addEventListener('click', (e) => {
	activityValidator();
});
/*
const cardNumberValidator = () => {
	const nameValue = name.value;
	if (nameValue.length > 0) {
		name.style.borderColor = 'lightgreen';
	} else {
		name.style.borderColor = 'red';
	}
} 
cardNumber.addEventListener('keyup', (e) => {
	nameValidator();
});
const zipValidator = () => {
	const nameValue = name.value;
	if (nameValue.length > 0) {
		name.style.borderColor = 'lightgreen';
	} else {
		name.style.borderColor = 'red';
	}
} 
zipCode.addEventListener('keyup', (e) => {
	nameValidator();
});
const cvvValidator = () => {
	const nameValue = name.value;
	if (nameValue.length > 0) {
		name.style.borderColor = 'lightgreen';
	} else {
		name.style.borderColor = 'red';
	}
} 
cvv.addEventListener('keyup', (e) => {
	nameValidator();
});

*/
name.focus();