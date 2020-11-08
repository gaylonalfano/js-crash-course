// === TOGGLE LOADER ANIMATION
const toggleLoaderAnimation = () => {
  // TODO Could consider adding className parameter and make this general toggle()
  // const classList = document.getElementById("calculate-btn").classList;
  document.getElementById("calculate-btn").classList.toggle("animate-pulse");
};

// === HIDE RESULTS
// NOTE Want to hide the #calculated-results as a default
const hideResultsDiv = () => {
  // TODO Could maybe use hidden attribute instead and just toggle
  const resultsDiv = document.getElementById("calculated-results");
  resultsDiv.style.display = "none";
};

// === SHOW RESULTS
const showResultsDiv = () => {
  // TODO Could maybe use hidden attribute instead and just toggle
  const resultsDiv = document.getElementById("calculated-results");
  resultsDiv.style.display = "block";
};

// === CLEAR ERROR
const clearError = () => {
  // Target new errorDiv and remove
  document.querySelector("#error-alert").remove();
};

// === SHOW ERROR w/ TAILWIND
// NOTE Referencing: https://tailwindui.com/components/application-ui/feedback/alerts
const showError = (errorMessage) => {
  // Hide calculated results section in case already displayed
  hideResultsDiv();

  // Stop loader animation;
  // toggleLoaderAnimation();

  // Let's target some elements so we can insert error at top
  const imageElement = document.querySelector("img");
  const headingDiv = imageElement.parentElement;

  // == Now let's create a new error div using Tailwind's component code
  const errorDiv = document.createElement("div");
  // Assign this errorDiv with an ID so can target and remove later
  errorDiv.id = "error-alert";
  errorDiv.className = "rounded-md bg-red-50 p-4 mb-8";
  // Let's fill in the HTML of this new error message div
  errorDiv.innerHTML = `
      <div class="flex">
        <div class="flex-shrink-0">
          <!-- Heroicon name: x-circle -->
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm leading-5 font-medium text-red-800">
            ${errorMessage}
          </h3>
        </div>
      </div>
    </div>
  `;

  // Next, let's insert this new complete errorDiv into the DOM
  headingDiv.insertBefore(errorDiv, imageElement);

  // Clear error message after 3 seconds using setTimeout();
  setTimeout(clearError, 3000);
};

// // === SHOW ERROR w/ BOOTSTRAP (BRAD`S)
// const showError = (error) => {
//   // == Create a div
//   const errorDiv = document.createElement("div");
//   // Add a CSS class for styling
//   errorDiv.className = "alert alert-danger";
//   // Create a new text node and pass the error message for the string
//   const errorTextNode = document.createTextNode(error);
//   // Append text node to our div
//   errorDiv.appendChild(errorTextNode);

//   // == Insert this new errorDiv into the DOM just above the main heading
//   // First get the card and the main heading elements
//   const card = document.querySelector(".card");
//   const heading = document.querySelector(".heading");

//   // Insert error above heading
//   card.insertBefore(errorDiv, heading);

//   // Make the error message disappear after 3 seconds with setTimeout()
//   setTimeout(clearError, 3000);
// }

// === CALCULATE RESULTS
const calculateResults = () => {
  console.log("Calculating...");
  // Define some UI variables
  const loanAmountElement = document.getElementById("loan-amount");
  const annualInterestElement = document.getElementById("annual-interest");
  const yearsToRepayElement = document.getElementById("years-to-repay");
  const monthlyPaymentElement = document.getElementById("monthly-payment");
  const totalPaymentElement = document.getElementById("total-payment");
  const totalInterestElement = document.getElementById("total-interest");

  // Calculate the results
  // NOTE Need to use parseFloat() to convert to type float
  // FIXME Restrict input fields to round to 2 decimals (currently infinite 2.5555555555)
  const principal = parseFloat(loanAmountElement.value);
  const calculatedInterest = parseFloat(annualInterestElement.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsToRepayElement.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const calculatedMonthly = (principal * x * calculatedInterest) / (x - 1);

  // Check that calculatedMonthly is a finite/positive number
  if (isFinite(calculatedMonthly)) {
    // Display our results in the fields
    // NOTE Use .toFixed(2) to specify two decimal places
    monthlyPaymentElement.value = calculatedMonthly.toFixed(2);
    totalPaymentElement.value = (
      calculatedMonthly * calculatedPayments
    ).toFixed(2);
    totalInterestElement.value = (
      calculatedMonthly * calculatedPayments -
      principal
    ).toFixed(2);

    // Show the resultsDiv
    showResultsDiv();

    // Stop loader animation
    toggleLoaderAnimation();
  } else {
    // calculatedMonthly isn't finite so have an error
    // NOTE Build the alert with JS rather than hide/unhide HTML
    showError("Please check your numbers.");

    // Stop loader animation so it doesn't keep going after error
    toggleLoaderAnimation();
  }
};

// === LISTEN FOR CLICK EVENT ON CALCULATE
// NOTE Brad is targeting the <form> where I'm getting the <button>
// NOTE Don't want to call calculateResults right away. Need to delay for the loader.
document.getElementById("calculate-btn").addEventListener("click", (e) => {
  // Hide #calculated-results section since it'll stay visible after first click
  hideResultsDiv();

  // Start the loader spinner
  toggleLoaderAnimation();

  // Wait 2 seconds
  setTimeout(calculateResults, 1500);

  // Prevent default
  e.preventDefault();
});
