export function getMostListenedSong(
  listenEvents,
  getSongFn,
) {
  const counts = {};
  for (const event of listenEvents) {
    counts[event.song_id] =
      (counts[event.song_id] || 0) + 1;
  }
  const topId = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a],
  )[0];
  return getSongFn(topId);
}
