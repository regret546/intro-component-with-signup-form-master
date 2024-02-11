const inputGroups = document.querySelectorAll("#input-group");
const claimBtn = document.querySelector("#claim-btn");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const emailInput = document.querySelector("#email");

function showError(inputGroup, message) {
  const input = inputGroup.querySelector("input");
  const labelContent = inputGroup.querySelector("label").textContent;

  const errorImg = document.createElement("img");
  errorImg.classList.add("errorImg");
  errorImg.src = "images/icon-error.svg";

  const errorP = document.createElement("p");
  errorP.classList.add("errorText");
  errorP.textContent = labelContent + " " + message;

  inputGroup.appendChild(errorImg);
  inputGroup.appendChild(errorP);

  input.style.borderColor = "var(--clr--red)";
}

function clearError(inputGroup) {
  const input = inputGroup.querySelector("input");
  const errorImg = inputGroup.querySelector(".errorImg");
  const errorP = inputGroup.querySelector(".errorText");

  if (errorImg) {
    errorImg.remove();
  }
  if (errorP) {
    errorP.remove();
  }

  input.style.borderColor = "#ccc";
}

function validateInputs() {
  let isValid = true;

  inputGroups.forEach((inputGroup) => {
    const input = inputGroup.querySelector("input");
    const inputValue = input.value.trim();

    clearError(inputGroup);

    if (inputValue === "") {
      showError(inputGroup, "must not be empty");
      isValid = false;
    } else if (input.id === "email" && !emailRegex.test(inputValue)) {
      showError(inputGroup, "is not valid");
      isValid = false;
    }
  });

  return isValid;
}

function resetInputs() {
  inputGroups.forEach((inputGroup) => {
    const input = inputGroup.querySelector("input");
    input.value = "";
    clearError(inputGroup);
  });
}

claimBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (validateInputs()) {
    alert("Submitted");
    resetInputs();
  }
});

inputGroups.forEach((inputGroup) => {
  const input = inputGroup.querySelector("input");
  input.addEventListener("input", function () {
    const inputValue = input.value.trim();
    if (inputValue !== "") {
      clearError(inputGroup);
    }
  });
});

emailInput.addEventListener("input", function () {
  const emailInputValue = emailInput.value.trim();
  const inputGroup = emailInput.closest("#input-group");

  if (emailInputValue === "") {
    clearError(inputGroup);
    return;
  }

  if (!emailRegex.test(emailInputValue)) {
    showError(inputGroup, "is not valid");
  } else {
    clearError(inputGroup);
  }
});
