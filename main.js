const addCarBtn = document.querySelector("button#addCarBtn");
const formContainer = document.querySelector("div#formContainer");
const submitBtn = document.querySelector("button#submitBtn");

let formCounter = 2; // Counter for generating unique IDs

// Function to create a new form element
function createForm() {
  // Create a new form element
  const form = document.createElement("form");
  form.id = `form${formCounter}`; // Set unique form ID
  form.className =
    "w-full bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-md p-8 my-4"; // Set form class

  // Add form elements to the form
  form.innerHTML = ` <div class="flex flex-row justify-between">
          <h1 class="text-black text-2xl font-medium mb-2">
            Car ${formCounter}
          </h1>
          <button
            class="delete-btn bg-red-500 text-white leading-tight rounded-md py-2 px-3 hover:bg-red-600 transition-color duration-300"
          >
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>

        <div class="w-full mb-4">
          <label for="name${formCounter}" class="block text-sm font-medium mb-2"
            >Car Name:</label
          >
          <input
            type="text"
            id="name${formCounter}"
            minlength="3"
            required
            placeholder="Enter Car Name.."
            class="w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-600 placeholder-opacity-70 leading-tight rounded-md appearance-none py-2 px-3"
          />
        </div>

        <div class="w-full mb-4">
          <label for="make${formCounter}" class="block text-sm font-medium mb-2"
            >Car Make:</label
          >
          <input
            type="text"
            id="make${formCounter}"
            minlength="4"
            required
            placeholder="Enter Car Make.."
            class="w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-600 placeholder-opacity-70 leading-tight rounded-md appearance-none py-2 px-3"
          />
        </div>

        <div class="w-full mb-4">
          <label for="model${formCounter}" class="block text-sm font-medium mb-2"
            >Car Model:
          </label>
          <input
            id="model${formCounter}"
            type="Number"
            min="1900"
            max="2023"
            step="1"
            required
            placeholder="Enter Car Model/Year.."
            class="w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-600 placeholder-opacity-70 leading-tight rounded-md appearance-none py-2 px-3"
          />
        </div>

        <div class="w-full mb-4">
          <label for="color${formCounter}" class="block text-sm font-medium mb-2"
            >Car Color:
          </label>
          <input
            id="color${formCounter}"
            type="color"
            required
            placeholder="Select Car Color.."
            class="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-600 placeholder-opacity-70 leading-tight rounded-md appearance-none py-2 px-3"
          />
        </div>

        <div class="w-full mb-4">
          <label for="price${formCounter}" class="block text-sm font-medium mb-2"
            >Car Price (in Lacs):
          </label>
          <input
            id="price${formCounter}"
            type="text"
            minlength="5"
            min="25000"
            required
            placeholder="Enter Car Price.."
            class="w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-600 placeholder-opacity-70 leading-tight rounded-md appearance-none py-2 px-3"
          />
        </div>`;

  // Add click event listener to delete button
  form.querySelector(".delete-btn").addEventListener("click", () => {
    form.remove(); // Remove the form when delete button is clicked

    // Update the formCounter if the deleted form has the highest index
    if (formCounter > 1 && form.id === `form${formCounter - 1}`) {
      formCounter--;
    }

    updateSubmitButtonText(); // Update the submit button text
  });

  formCounter++; // Increment the form counter for generating unique IDs

  return form;
}

// Update the submit button text dynamically
function updateSubmitButtonText() {
  const numForms = document.querySelectorAll("form").length;

  if (numForms >= 2) {
    submitBtn.innerHTML = `Add All Cars  <i class="fas fa-list-check"></i>`;
  } else {
    submitBtn.innerHTML = `Add This Car  <i class="fas fa-list-check"></i>`;
  }
}

// Function to get values from all the displayed forms
function getFormValues() {
  const forms = document.querySelectorAll("form"); // Get all the forms

  const carData = [];
  let isFormValid = true; // Flag variable to track form validation

  forms.forEach((form) => {
    const carNameInput = form.querySelector(`#name${form.id.slice(4)}`);
    const carMakeInput = form.querySelector(`#make${form.id.slice(4)}`);
    const carModelInput = form.querySelector(`#model${form.id.slice(4)}`);
    const carColorInput = form.querySelector(`#color${form.id.slice(4)}`);
    const carPriceInput = form.querySelector(`#price${form.id.slice(4)}`);

    // Remove any existing error messages
    clearErrorMessages(form);

    // HTML form validation
    if (!carNameInput.checkValidity()) {
      displayErrorMessage(carNameInput, carNameInput.validationMessage);
      isFormValid = false; // Set flag to false if validation fails
      return; // Stop further execution
    }

    if (!carMakeInput.checkValidity()) {
      displayErrorMessage(carMakeInput, carMakeInput.validationMessage);
      isFormValid = false; // Set flag to false if validation fails
      return; // Stop further execution
    }

    if (!carModelInput.checkValidity()) {
      displayErrorMessage(carModelInput, carModelInput.validationMessage);
      isFormValid = false; // Set flag to false if validation fails
      return; // Stop further execution
    }

    if (!carColorInput.checkValidity()) {
      displayErrorMessage(carColorInput, carColorInput.validationMessage);
      isFormValid = false; // Set flag to false if validation fails
      return; // Stop further execution
    }

    if (!carPriceInput.checkValidity()) {
      displayErrorMessage(carPriceInput, carPriceInput.validationMessage);
      isFormValid = false; // Set flag to false if validation fails
      return; // Stop further execution
    }

    // Custom validations
    const carName = carNameInput.value;
    const carMake = carMakeInput.value;
    const carModel = carModelInput.value;
    const carColor = carColorInput.value;
    const carPrice = carPriceInput.value;

    // Custom validations (additional checks)
    // ...

    // Create an object with the form values
    const car = {
      CarName: carName,
      CarMake: carMake,
      CarModel: carModel,
      CarColor: carColor,
      CarPrice: carPrice,
    };

    carData.push(car); // Add the car object to the carData array
  });

  if (!isFormValid) {
    return null; // Return null if there are validation errors
  }

  return carData;
}

// Function to display an error message below an input field
function displayErrorMessage(inputElement, message) {
  const errorContainer = document.createElement("div");
  errorContainer.className = "text-red-500 text-sm mt-1";
  errorContainer.textContent = message;

  inputElement.parentNode.appendChild(errorContainer);
}

// Function to clear all error messages in a form
function clearErrorMessages(form) {
  const errorMessages = form.querySelectorAll(".text-red-500");

  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });
}

// Click event listener for the "Add a New Car" button
addCarBtn.addEventListener("click", () => {
  const newForm = createForm(); // Create a new form
  formContainer.appendChild(newForm); // Append the new form to the container
  updateSubmitButtonText(); // Update the submit button text
});

// Click event listener for the "Submit" button
submitBtn.addEventListener("click", () => {
  const formData = getFormValues(); // Get the form values

  if (formData === null) {
    // Display an error message or perform necessary action
    console.log("Form validation failed. Please check the form.");
    return;
  }

  console.log(formData); // Just logging the form data for now, you can customize it further

  // Create cards and append them to the submittedFormsContainer
  const submittedFormsContainer = document.querySelector(
    "#submittedFormsContainer"
  );

  formData.forEach((car) => {
    const card = document.createElement("div");
    card.className =
      "bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-md p-8 my-4";

    card.innerHTML = `
      <h1 class="text-black text-2xl font-medium mb-2">${car.CarName}</h1>
      <p><strong>Car Make:</strong> ${car.CarMake}</p>
      <p><strong>Car Model:</strong> ${car.CarModel}</p>
      <p><strong>Car Color:</strong> ${car.CarColor}</p>
      <p><strong>Car Price:</strong> ${car.CarPrice}</p>
    `;

    submittedFormsContainer.appendChild(card);
  });
});
