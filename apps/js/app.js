const inputGroups = document.querySelectorAll("#input-group");
const claimBtn = document.querySelector("#claim-btn");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const emailInput = document.querySelector("#email");

function errorInput(inputGroup, message) {
  const input = inputGroup.querySelector("input");
  const label = inputGroup.querySelector("label");
  const labelContent = label.textContent;
  /*  Create image element for error */
  const errorImg = document.createElement("img");
  errorImg.classList.add("errorImg");
  errorImg.src = "images/icon-error.svg";
  /* Create paragraph element for error */
  const errorP = document.createElement("p");
  errorP.classList.add("errorText");
  errorP.textContent = labelContent + " " + message;

  inputGroup.appendChild(errorImg);
  inputGroup.appendChild(errorP);
  // Change border color to red
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

  input.style.borderColor = "#ccc"; // Reset to default
}

claimBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let isValid = true;

  const inputValue = inputGroups.forEach((inputGroup) => {
    const input = inputGroup.querySelector("input");
    const inputValue = input.value.trim();
    if (inputValue === "") {
      errorInput(inputGroup, "must not be empty");
      isValid = false;
    } else {
      clearError(inputGroup);
    }

    if (
      input.id === "email" &&
      inputValue !== "" &&
      !emailRegex.test(inputValue)
    ) {
      errorInput(inputGroup, "is not valid");
      input.style.borderColor = "var(--clr--red)";
      isValid = false;
    }
  });
  if (isValid) {
    alert("Submitted");

    inputGroups.forEach((inputGroup) => {
      const input = inputGroup.querySelector("input");
      input.value = "";
    });
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
  if (!emailInputValue.test(emailRegex)) {
    errorInput(inputGroup, "is not valid");
  } else {
    clearError(inputGroup);
  }
});
