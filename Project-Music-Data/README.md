# Music data project

A common task in software is to take some data, process it in some way, and present it usefully to someone.

We have supplied a collection of data for you to analyse. Your task is to write code which processes this data and shows useful conclusions to a user.

Make a small HTML + JavaScript frontend which displays the answers to several questions, which are listed below.

Some principles to remember throughout this project:

1. This is a project about data processing, not UI. You should make a simple frontend to show the data in valid semantic HTML. No credit will be given for making prettier or more complicated frontend. You are allowed to use CSS, but you are strongly advised to focus on the logic, and only add styling when you are finished. You will not get any credit for styling.
2. You should assume the data will change in the future, but will have the same schema. So you shouldn't pre-compute anything. Your code should always read the data and calculate results from scratch.

We have provided a `data.js` file, which contains three functions to provide data for you to analyse. `data.js` is a file containing four functions:

1. `getUserIDs()`: when called, returns an array of strings, each of which is a user ID.
1. `getListenEvents(userID)`: when called, returns an array of objects, each of which contains information about a single time that the given user listened to a song. The listen events are sorted by when they happened, oldest to newest. The timestamps should be interpreted as in the user's current local time zone.
2. `getSong(songID)`: when called with one string as an argument, returns an an object containing information about a single song.

## Requirements

This is an individual project. You are expected to work on it on your own. You can talk to other trainees and volunteers and get help and advice, but you should write all of the code yourself.

You must submit both a link to your GitHub repo, and a link to the deployed website. Your project must meet all [project submission requirements](https://curriculum.codeyourfuture.io/checkpoint/prep/#project-submission).

Your website must be hosted on the internet, and must be automatically deployed when you merge changes to your GitHub repo.

Your website must include a drop-down to select a user to display information for. When a user is selected, you must display answers to all of the questions for that user. If a question doesn't apply to that user, you should not show the question.

You **must not** implement any kind of authentication. Just a drop-down to choose which user's information to display.

Your GitHub repository must contain at least one unit test which demonstrates that your code works. End to end tests are optional. Testing via the DOM is optional.

Every view of your website must be accessible. We will test this by making sure that "Snapshot" mode of Lighthouse gives 100% accessibility for any view we look at.

## Questions to answer

1. What was the user's most often listened to song according to the data?
2. What was the user's most often listened to artist according to the data?
3. What was the user's most often listened to song on Friday nights (between 5pm and 4am)?
4. What are the answers to the above questions if using _listening time_ rather than _number of listens_?
5. What song did the user listen to the most times in a row (i.e. without any other song being listened to in between)? How many times was it listened to?
6. Are there any songs that, on each day the user listened to music, they listened to every day? If the answer is yes, you should show which one(s). If the answer is no, you should not show anything about this question.
7. What were the user's top three genres to listen to by number of listens?

## Supplied scaffolding

In addition to `data.js`, we have supplied a few sample files in the repo to demonstrate how you can define functions in one file and use them from another file. Feel free to use these files in your solution if you want, or to just use them for inspiration for your own solution.

Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server - you can't open the `index.html` file using a `file://` URL.

## Rubric

All of the below requirements must be met for the project to be considered complete:

* The website must contain a drop-down which lists four users.
* Selecting a user must display answers relevant to that user (see table below).
* The code written to calculate the answers to the questions must seem like it could handle different data if it were supplied, including the following edge-cases:
  * User 4 has no data, so no questions apply to the user. Some intelligible statement should be shown to the user (e.g. "This user didn't listen to any songs.").
  * If a question doesn't apply (e.g. if no songs were ever listened to on a Friday night), the interface should completely hide the question and answer. Displaying the question and an empty result, or any kind of error, is not acceptable.
  * If fewer than three (but more than zero) genres were listened to the site should list the top genres listened to. It must not display text like "Top 3 genres", but may say "Top genres" or "Top 2 genres" or similar.
* Unit tests must be written for at least one non-trivial function.
* The website must score 100 for accessibility in Lighthouse

Bonus points (which don't mean anything):

* Re-using code between the "most often" questions (i.e. questions 1, 2, 3, 4).
* End-to-end tests.

Expected output data:
| Question                     | User 1                                      | User 2                                                            | User 3                                                                                                               |
| ---------------------------- | ------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Most listened song (count)   | The Swell Season - When Your Mind's Made Up | Frank Turner - I Still Believe                                    | Frank Turner - Be More Kind                                                                                          |
| Most listened song (time)    | Faithless - Insomnia                        | Frank Turner - I Still Believe                                    | Faithless - Insomnia                                                                                                 |
| Most listened artist (count) | Frank Turner                                | Frank Turner                                                      | Frank Turner                                                                                                         |
| Most listened artist (time)  | Frank Turner                                | Frank Turner                                                      | Frank Turner                                                                                                         |
| Friday night song (count)    | The Swell Season - When Your Mind's Made Up | Frank Turner - I Still Believe                                    | <no Friday listens - must not be displayed>                                                                          |
| Friday night song (time)     | The Swell Season - When Your Mind's Made Up | Frank Turner - Photosynthesis                                     | <no Friday listens - must not be displayed>                                                                          |
| Longest streak song          | The King Blues - I Got Love (length: 34)    | Frank Turner - I Still Believe (length: 44)                       | Two values with length 42 (can show either or both): The Divine Comedy - Tonight We Fly, Frank Turner - Be More Kind |
| Every day songs              | The Swell Season - When Your Mind's Made Up | Frank Turner - Photosynthesis, The Divine Comedy - Tonight We Fly | <no songs listened to every day - must not be displayed>                                                             |
| Top three genres             | Pop, Folk, Punk                             | Pop (Must not say 'top 3 genres' as there are not 3)              | Pop, Folk, House                                                                                                     |
