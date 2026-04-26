# Codewars Leaderboard project

Codewars provides [an API](https://dev.codewars.com/) that can be used to look up an individual user's rank and score.

We will use this to build a leaderboard, similar to [the one on the Codewars website](https://www.codewars.com/users/leaderboard/ranks).

Your task is to create a website which allows a user to input a list of Codewars users, fetch their scores from the API and then display them so that you can compare. You should **focus on HTML and JavaScript**. Some CSS is required for completing this task, but the website's design **is not the focus of the assessment**. We will assess you on correct logic. You don't need a perfect UI, and it's ok if your UI is incomplete.

## Requirements

You must submit both a link to your GitHub repo, and a link to the deployed website. Your project must meet all [project submission requirements](https://curriculum.codeyourfuture.io/checkpoint/prep/#project-submission).

Your website must be hosted on the internet, and must be automatically deployed when you merge changes to your GitHub repo.

You must be able to explain every line of code in your project, even ones other people in your group wrote.

You should assume that Codewars ranks will change in the future. So you **must not** pre-compute anything. Your code should always read the data and calculate results from scratch.

Your website should display an input, allowing the user to add a comma-separated list of Codewars usernames (e.g. "CodeYourFuture,40thieves,SallyMcGrath") that they want to display on the leaderboard.

You **must not** implement any kind of authentication or data storage. Just a form to pick which usernames to display on the leaderboard.

When a user is happy with the list of usernames, they can trigger your website to fetch data from the [Get User endpoint of the Codewars API](https://dev.codewars.com/#get-user). Within this data, each user has a `ranks` property which should be used to calculate their ranking.

Using the leaderboard ranking data, your website should calculate all of the possible languages that the users have a ranking in. Your website should show a drop-down allowing the user to pick from all of these language rankings, plus the overall ranking.

Your website should display a table for the ranking data that the user has selected from the drop-down. The table should default to showing the overall ranking if a language has not been selected yet. If the user selects another language from the drop-down, the table should show its ranking data.

The table should have columns for username, clan and score. Each user should have a row in the table showing their relevant data points for selected language ranking. The rows should be sorted so that the user with the highest score for the selected language ranking is at the top, and the user with the lowest score is at the bottom.

If a user does not have a ranking for the currently selected language, the user should not be shown in the table.

The user with the highest score should be highlighted in some (fun!) way so that their achievement can be celebrated.

Your GitHub repository must contain unit tests which demonstrate that your code works.

Every view of your website must be accessible (i.e. for each user, with any number of topics, etc). We will test this by making sure that "Snapshot" mode of Lighthouse gives 100% accessibility for any view we look at.

### Supplied test scaffolding

A test demonstrating the usage of the [nock testing library](https://github.com/nock/nock) has been provided for you. This library is helpful for replacing `fetch` calls with "mocked" data, allowing you to control the test fully.

You **must** run `npm install` within the `Project-Codewars-Leaderboard` folder in order for the scaffolding to work.

Running `npm test` (within the `Project-Codewars-Leaderboard` folder) will run the tests.

You are welcome to use as much of the provided files as you want, or to ignore/delete them if you don't.

## Rubric

All of the below requirements must be met for the project to be considered complete:

- The website must contain an input to accept a comma-separated list of users
- Submitting the list of users fetches data from the Codewars API about each of the users
- Based on the leaderboard data, a drop-down is shown, allowing the user to pick from all of the possible language rankings plus the overall ranking
- The default ranking selected is the overall ranking
- A table is shown for the current ranking, with columns for each user's username, clan and score
- Changing the selected ranking will update the table to reflect the newly selected ranking
- The table is sorted from the highest to lowest score, top to bottom
- Users without a ranking in a chosen language are not shown in that table
- The top user's score is visually highlighted
- The website must score 100 for accessibility in Lighthouse
- Unit tests must be written for at least one non-trivial function
- Searching for a user which doesn't exist should show a message to the user explaining this.
  - If multiple users were searched for, it is acceptable to either just error, or to show the valid users, but the user should be made aware of the invalid users.
- If fetching from the Codewars API errors (e.g. because you're offline, or made a bad request), the user must be shown a useful error message in the UI.

Below is an example of a table showing the overall ranking for 3 users: CodeYourFuture, SallyMcGrath and 40thieves.

| Username       | Clan           | Score |
| -------------- | -------------- | ----- |
| SallyMcGrath   | CodeYourFuture | 1079  |
| CodeYourFuture | CodeYourFuture | 751   |
| 40thieves      |                | 10    |

Please note that the individual ranks/scores shown in the above table may not be accurate as they may change if new katas are completed by these accounts. To see up-to-date data, you can look it up in the API responses: [CodeYourFuture](https://www.codewars.com/api/v1/users/CodeYourFuture), [SallyMcGrath](https://www.codewars.com/api/v1/users/SallyMcGrath), [40thieves](https://www.codewars.com/api/v1/users/40thieves).
