const addBtn = document.querySelector(".add-btn");
const form = document.querySelector(".fact-form");

addBtn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    addBtn.innerHTML =
      '<span class="material-symbols-sharp add-icon"> close </span>';
  } else {
    form.classList.add("hidden");
    addBtn.innerHTML =
      '<span class="material-symbols-sharp add-icon"> add </span>';
  }
});
