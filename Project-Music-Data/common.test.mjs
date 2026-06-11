import assert from "node:assert";
import test from "node:test";
import { countUsers } from "./common.mjs";
import { getListenEvents } from "./data.mjs";
import {
  getMostListenedSong,
  getLongestStreak,
} from "./questions.mjs";

test("User count is correct", () => {
  assert.equal(countUsers(), 4);
});

test("Most listened song for user 1 is When Your Mind's Made Up", () => {
  const events = getListenEvents("1");
  const song = getMostListenedSong(events);
  assert.equal(song.title, "When Your Mind's Made Up");
});

test("Longest streak for user 2 is 44", () => {
  const events = getListenEvents("2");
  assert.equal(getLongestStreak(events).count, 44);
});
