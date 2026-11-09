let namesArr = [];
let userData = [];
let langArrNoDupes = [];
let renderLangs = [];
let notFound = [];
const userNames = document.getElementById("users");
const submit = document.getElementById("submit");
const wholeTable = document.getElementById("wholeTable");
const tableBody = document.getElementById("tableBody");
const langDropDown = document.getElementById("langDropDown");

wholeTable.style.display = "none";
langDropDown.style.display = "none";

submit.addEventListener("click", getUsers);
userNames.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getUsers();
  }
});
langDropDown.addEventListener("change", filterCurrentLang);

function getUsers() {
  let names = userNames.value;
  namesArr = names.split(",");
  userData = [];
  makeFetchRequest();
  wholeTable.style.display = "";
}

async function makeFetchRequest() {
  for (let user of namesArr) {
    try {
      const response = await fetch(
        `https://www.codewars.com/api/v1/users/${user}`,
      );
      const data = await response.json();
      if (data.success == false) {
        throw new Error(`${user} not found`);
      }
      userData.push(data);
    } catch (err) {
      notFound.push(user);
      console.log(err);
      console.log(notFound);
    }
  }
  console.log(userData);
  renderLangs = userData;
  render();
}

function render() {
  langDropDown.innerHTML = "";
  langDropDown.style.display = "";

  getLangs();
  sortByOverall();
  populateDropDown();
  filterCurrentLang();
  usersNotfound();
}

function populateTable(scoreToDisplay) {
  tableBody.innerHTML = "";
  for (let i = 0; i < renderLangs.length; i++) {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    const clan = document.createElement("td");
    const score = document.createElement("td");
    row.id = `row${i}`;
    name.innerText = renderLangs[i].username;
    clan.innerText = renderLangs[i].clan;

    scoreToDisplay == "Overall"
      ? (score.innerText = renderLangs[i].ranks.overall.score)
      : (score.innerText =
          renderLangs[i].ranks.languages[scoreToDisplay].score);

    tableBody.append(row);
    row.append(name, clan, score);
  }
}

function usersNotfound() {
  const unFound = document.getElementById("unfound");
  notFound.length == 1
    ? (unFound.innerText = `${notFound} was not found`)
    : (unFound.innerText = `${notFound} where not found`);

  notFound = [];
}
function getLangs() {
  let langArr = [];

  for (let user of userData) {
    langArr.push(Object.keys(user.ranks.languages));
  }
  langArr = langArr.flat();

  for (let langs of langArr) {
    if (!langArrNoDupes.includes(langs)) langArrNoDupes.push(langs);
  }
}

function populateDropDown() {
  const overall = document.createElement("option");
  overall.innerText = "Overall";
  overall.value = "Overall";

  langDropDown.append(overall);

  for (let lang of langArrNoDupes) {
    const language = document.createElement("option");
    language.innerText = lang;
    language.value = lang;

    langDropDown.append(language);
  }
}

function filterCurrentLang() {
  renderLangs = [];
  const currentLang = langDropDown.value;
  if (currentLang == "Overall") {
    renderLangs = userData;
    sortByOverall();
    populateTable("Overall");
  } else {
    for (let user of userData) {
      let usersLangs = Object.keys(user.ranks.languages);

      if (usersLangs.includes(currentLang)) {
        renderLangs.push(user);
      }
    }
    sortBySelected(currentLang);
  }
  console.log(renderLangs);
  populateTable(currentLang);
}

function sortByOverall() {
  return renderLangs.sort(
    (a, b) => b.ranks.overall.score - a.ranks.overall.score,
  );
}
function sortBySelected(currentLang) {
  return renderLangs.sort(
    (a, b) =>
      b.ranks.languages[currentLang].score -
      a.ranks.languages[currentLang].score,
  );
}
