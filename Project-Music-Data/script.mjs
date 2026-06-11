import { getUserIDs, getListenEvents } from "./data.mjs";
import { getMostListenedSong } from "./questions.mjs";
import { getSong } from "./data.mjs";

window.onload = function () {
  const select = document.getElementById("user-select");

  getUserIDs().forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    select.appendChild(option);
  });

  select.addEventListener("change", function () {
    const events = getListenEvents(this.value);
    const container = document.getElementById("results");

    if (events.length === 0) {
      container.innerHTML =
        "<p>This user has no listening history.</p>";
      return;
    }

    const song = getMostListenedSong(events, getSong);
    container.innerHTML = `<p>Most listened song: ${song.artist} - ${song.title}</p>`;
  });
};
