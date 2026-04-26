# Project: Spaced Repetition Tracker

At Code Your Future, we like to use a learning technique called spaced repetition. The technique involves reviewing a topic over increasing time gaps (e.g. after one week, one month, three months, six months, one year).

One of the difficulties of this approach is tracking which topic should be revised at what time. Your task is to write code which allows a user to track topics and then understand which topic they should revise next.

You should make a frontend, which displays an agenda of topics to revise on specific dates. You should use HTML and JavaScript for this. We want to focus on your ability to create the correct logic and not spend time on creating the perfect UI. You are allowed to use CSS, but you are strongly advised to focus on the logic, and only add styling when you are finished. You will not get any credit for styling.

## Supplied scaffolding

We have supplied a few sample files in the repo to demonstrate how you can define functions in one file and use them from another file. Feel free to use these files in your solution if you want, or to just use them for inspiration for your own solution.

Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server - you can't open the `index.html` file using a `file://` URL.

We have also provided a `storage.js` file, which contains three functions to help with data storage. `storage.js` is a file containing three functions:

- `getData(userId)`: when called with a user id string as an argument, returns an array of objects, each of which represents an agenda item for the user
- `addData(userId, data)`: when called with a user id string and an array of objects as arguments, it will append the agenda items data to the user's stored agenda. Each of the objects should contain information about the agenda item, such as the date and topic that should be revised on that date. The function does not return anything
- `clearData(userId)`: when called with a user id string as an argument, it will clear any stored data associated with the user id. This is provided to help with development, and is not required in the final code

**Note**: None of the storage functions perform any validation or de-duplication, so ensure that you are sending the correct data before storing it.

## Requirements

This may be an individual or a team project - your class leaders will tell you which you are doing. If it is a team project, they will also tell you how the groups will work.

You must submit both a link to your GitHub repo, and a link to the deployed website. Your project must meet all [project submission requirements](https://curriculum.codeyourfuture.io/checkpoint/prep/#project-submission).

Your website must be hosted on the internet, and must be automatically deployed when you merge changes to your GitHub repo.

Your website must include a drop-down to select a user to display information for.

You **must not** implement any kind of authentication. Just a drop-down to choose which user’s information to display. You **must not** implement data storage yourself, as we have provided that for you. (We want to avoid you "wasting" time implementing these, instead of building the project!)

The goal of your website to is allow users to understand which topic they should revise next.

When a user is selected, you must get the stored data for that user and use it to display their agenda. If there is no agenda for the user, you should present a message explaining this.

If there is an agenda, your website should display a list of topics and the revision date when the user should revise in _chronological order_. For each revision date, it should display the date and the name of the topic to revise. Revision dates in the past should not be displayed.

Your website must include a form with a text input, a date picker and submit button that allows a user to add a new topic. This form must be accessible, so for example, a user using the keyboard should be able to submit it without using a mouse. The form should validate that the topic name and date have be set by the user.

The date picker should default to today’s date, but allow selection of another date. You should use the built-in date picker for browsers, unless attempted as a bonus task. **No credit** is given for using an alternative date picker.

When the form is submitted, your website should calculate the revision dates for that topic. There should be a revision date one week, one month, three months, six months and one year from the selected date. Using these calculations, your website should store the topic name and any necessary revision date data using the functions from `storage.js` as described above.

After the new data has been stored, the updated agenda must be displayed (including the new topic) for the relevant user.

Your GitHub repository must contain at least one unit test which demonstrates that your code works. End to end tests are optional. Testing via the DOM is optional.

Every view of your website must be accessible (i.e. for each user, with any number of topics, etc). We will test this by making sure that "Snapshot" mode of Lighthouse gives 100% accessibility for any view we look at.

> [!WARNING]
>
> Date calculations can be complicated. Daylight savings time in particular can cause problems.
>
> Read [this guidance on handling daylight savings time and time zones](https://stackoverflow.com/questions/2532729/daylight-saving-time-and-time-zone-best-practices).
>
> Be sure to check the _exact_ dates returned when testing, even if adding an interval means that a date crosses a daylight savings boundary. Being off by one day will fail your project.
>
> A tip here is to either only be adding dates and not times, or to make sure all dates are in UTC.


## Rubric

All of the below requirements must be met for the project to be considered complete:

- The website must contain a drop-down which lists exactly 5 users
- No user is selected on page load
- All of the users must have no agenda when first loading (i.e. with clear `localStorage`). Data should be persisted across page loads (which is handled by the code in `storage.mjs`).
- Selecting a user must load the relevant user's agenda from storage
- Selecting a user must display the agenda for the relevant user (see manual testing below)
- If there is no agenda for the selected user, a message is displayed to explain this
- The website must contain a form with inputs for a topic name and a date picker. The form should also have a submit button.
- The date picker must default to today’s date on first page load
- The form has validation to ensure that both the topic name and and selected date have been set by the user
- Submitting the form adds a new topic to revise for the relevant user only. The topic’s dates to revise are calculated as one week, one month, three months, six months and one year from the selected date (see manual testing below)
- After creating a new topic to revise, the agenda for the current user is shown, including the new topic
- The website must score 100 for accessibility in Lighthouse
- Unit tests must be written for at least one non-trivial function

Below are some manual testing steps and expected results, which will be run on all websites to fairly assess them. All of the dates are intended to be exact - if dates are off by one day, that counts as a failure.

Pick the year after the current one (e.g. in 2025, pick 2026).

Where an instruction says `${YEAR}`, use that year. Where an instruction says `${YEAR+1}`, use the following year.

Steps:

1. Select user 1 from the drop-down
1. Add “Functions in JS” to the text input
1. Select the date 19th July ${YEAR} from the date picker
1. Submit the form

Expected result:

- The agenda for user 1 is shown, with the revision dates shown as follows:
  - Functions in JS, 26th July ${YEAR}
  - Functions in JS, 19th August ${YEAR}
  - Functions in JS, 19th October ${YEAR}
  - Functions in JS, 19th January ${YEAR+1}
  - Functions in JS, 19th July ${YEAR+1}
- Each of the revision dates show the topic name and the relevant date (styling/formatting does not matter as long as it is understandable)
- The form remains on the website (allowing for further topics to be added)

Steps:

1. Select user 2 from the drop-down
1. Add “Variables in Python” to the text input
1. Select the date 5th November ${YEAR} from the date picker
1. Submit the form
1. Add “Functions in Python” to the text input
1. Select the date 5th October ${YEAR} from the date picker
1. Submit the form

Expected result:

- The agenda for user 2 is shown, with the revision dates shown as follows:
  - Functions in Python, 12th October ${YEAR}
  - Functions in Python, 5th November ${YEAR}
  - Variables in Python, 12th November ${YEAR}
  - Variables in Python, 5th December ${YEAR}
  - Functions in Python, 5th January ${YEAR+1}
  - Variables in Python, 5th February ${YEAR+1}
  - Functions in Python, 5th April ${YEAR+1}
  - Variables in Python, 5th May ${YEAR+1}
  - Functions in Python, 5th October ${YEAR+1}
  - Variables in Python, 5th November ${YEAR+1}
  - Each of the revision dates show the topic name and the relevant date (styling/formatting does not matter as long as it is understandable)
- The form remains on the website (allowing for further topics to be added)

Steps:

1. Select User 3 from the drop-down
1. Add “Codewars” to the text input
1. Select the date exactly one month ago (e.g. if it's currently July 26th, select June 26th this year) from the date picker
1. Submit the form

Expected result:

- The agenda for user 3 is shown, with the revision dates shown as follows:
  - (No topic is shown for 1 week after the selected date, as this is in the past)
  - Codewars, Today's date (e.g. if it's currently July 26th, shows: July 26th)
  - Codewars, Two months in the future (e.g. if it's currently July 26th, shows: September 26th)
  - Codewars, 5 months in the future (e.g. if it's currently July 26th, shows: December 26th)
  - Codewars, 11 months in the future, (e.g. if it's currently July 26th, shows: June 26th)
- Each of the revision dates show the topic name and the relevant date (styling/formatting does not matter as long as it is understandable)
- The form remains on the website (allowing for further topics to be added)

Go back and check User 1, User 2, and User 3 still show the correct outputs.

## Working in a group

If you working in a group, we recommend that **all** team members read the [Working in a group guidelines](https://github.com/CodeYourFuture/Checkpoint/blob/main/working-in-a-group.md). Confirm all group members have read and understand these before starting to write code.
