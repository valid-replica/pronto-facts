const addBtn = document.querySelector(".add-btn");
const form = document.querySelector(".fact-form");
const factList = document.querySelector(".fact-list");

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

const categories = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#eab308" },
  { name: "society", color: "#ef4444" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#8b5cf6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#14b8a6" },
];

factList.innerHTML = "";

loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://rbldvlzijlyennuzfyby.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibGR2bHppamx5ZW5udXpmeWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0NDAxNTAsImV4cCI6MjAxNzAxNjE1MH0.e5lfHoiVrs5-A1rT33d-5UlHRB3HMDUqWu_qRT9LcME",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibGR2bHppamx5ZW5udXpmeWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0NDAxNTAsImV4cCI6MjAxNzAxNjE1MH0.e5lfHoiVrs5-A1rT33d-5UlHRB3HMDUqWu_qRT9LcME",
      },
    }
  );
  const data = await res.json();
  // const filteredData = data.filter((fact) => fact.category === "technology");

  createFactList(data);
}

function createFactList(arr) {
  const htmlArr = arr.map(
    (fact) =>
      `<li class="fact">
        <p> ${fact.text}
          <a
            href="${fact.source}"
            target="_blank"
          >[Source]
          </a>
          <span class="tag" style="background-color: ${
            categories.find((category) => category.name === fact.category).color
          }">${fact.category}</span>
        </p>
      </li>`
  );

  html = htmlArr.join("");

  factList.insertAdjacentHTML("beforeend", html);
}
