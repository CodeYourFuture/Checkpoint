# Days calendar project

There are some commemorative days which occur annually, but not on a fixed date.

For example, Ada Lovelace Day happens on the second Tuesday every October.

The _date_ that it occurs is different every year. But it has a fixed pattern.

We have supplied a JSON file ([`days.json`](./days.json)) which contains descriptions of several of these days.

The goal of this project is to present this data usefully to users.

## Requirements

This may be an individual or a team project - your class leaders will tell you which you are doing. If it is a team project, they will also tell you how the groups will work.

Some of the requirements of this project are only required if you are working in a group of at least a certain size.

You must submit both a link to your GitHub repo, and a link to the deployed website. Your project must meet all [project submission requirements](https://curriculum.codeyourfuture.io/checkpoint/prep/#project-submission).

Your website must be hosted on the internet, and must be automatically deployed when you merge changes to your GitHub repo.

You must be able to explain every line of code in your project, even ones other people in your group wrote.

> [!WARNING]
>
> Date calculations can be complicated. Daylight savings time in particular can cause problems.
>
> Read [this guidance on handling daylight savings time and time zones](https://stackoverflow.com/questions/2532729/daylight-saving-time-and-time-zone-best-practices).
>
> Be sure to check the _exact_ dates returned when testing. Being off by one day will fail your project.

### Requirements for everyone

Regardless of your group size, you must:

* Create an HTML page which, when loaded, displays a calendar.
* The calendar must show every day of the current month, each as a rectangle. Each row of rectangles must show one week. The first column must show Sundays. The first day of the month must be shown in the first row.
* There must be two buttons which, when clicked, switch what is displayed. One button must change the display to the previous month. The other button must change the display to the next month. On repeated clicks, these buttons must keep moving back/forwards in time, one month per click.
  * These buttons must work on every month. There should be no first/last months beyond which you can't press previous/next and have them work.
* There must be a way to jump to a particular month and year, e.g. "October 2020". For example, you could use a `<select>` tag for each of the month name and a reasonable range of years.
* The days from the JSON file must appear correctly when the month they fall in is displayed. For example:
  * If October 2024 is being shown, October 8th must show Ada Lovelace Day.
  * If October 2025 is being shown, October 14th must show Ada Lovelace Day.
* The calendar should work for every year - if someone goes to 1900, or 2050, or any other year, the commemerative days should be correctly displayed.
* The calendar should work if days were added or removed from the JSON file. You must not hard-code logic for specific days. If, for instance, International Dawn Chorus Day were added to the JSON file (The first Sunday of May), your calendar should show it correctly without modification.
* Other than the above styling requirements, no styling is required.
* Your GitHub repository must contain at least one unit test which demonstrates that your code works. End to end tests are optional. Testing via the DOM is optional.
* Every view of your website must be accessible (i.e. all months). We will test this by making sure that "Snapshot" mode of Lighthouse gives 100% accessibility for any view we look at.

### Requirements for groups of at least 2

As well as all previous requirements, you must:

* Produce a script that can be run in a terminal via `node`, which creates an [iCal format](https://icalendar.org/) file named `days.ics` containing entries for every day in the JSON file. You must not use recurring events. There must be one entry per commemorative day per year from 2020 until 2030 (inclusive). The events should be "whole day" events - they should not have start/end times.
* If you import it into Google Calendar, it should show the days correctly in the calendar. There is a suggested workflow for testing this listed below.
* Logic for calculating dates must be shared between the web generator and the iCal generator.

### Requirements for groups of at least 3

As well as all previous requirements, you must:
* Fetch a description of the day from the URL supplied in the JSON file.
* In the HTML page, if you click on a listed commemorative day, the page should show a description of the day, for instance in the calendar event or as a modal dialog in the page.
* In the iCal file, the **DESCRIPTION** field should contain the description of the day.

## How to test Google Calendar imports

Go to https://calendar.google.com

We recommend you create a new empty calendar for testing. To do this:
1. In the bar on the left next to "Other Calendars", click the "+" and then "Create new calendar".
2. Give your calendar a name like "Test calendar".

Import your `.ics` file into the calendar. To do this:
1. In the bar on the left next to "Other Calendars", click the "+" and then "Import".
2. Select your test calendar from the "Add to calendar" drop down".
3. Select the `.ics` file you have created.
4. Press "Import".

Each time you do this, you probably want to delete your Test calendar, and create a new one.

## Supplied scaffolding

We have supplied a few sample files in the repo to demonstrate how you can define functions in one file, and use them both from a web page and a Node application. Feel free to use these files in your solution if you want, or to just use them for inspiration for your own solution.

Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server - you can't open the `index.html` file using a `file://` URL.

## Rubric

### For everyone

* Open the calendar, it should be showing the current month.
* Go to October 2024. Observe:
  * A grid of 5 rows x 7 columns.
  * The first row contains Tuesday October 1 - Saturday October 5. Sunday and Monday are either labelled for September 29/30 or are blank.
  * The last row contains Sunday October 27 - Thursday October 31. Friday and Saturday are either labelled for November or are blank.
  * October 8th: Ada Lovelace Day.
  * October 25th: World Lemur Day.
* On the web page, open October 2020. Observe:
  * October 13th: Ada Lovelace Day.
  * October 30th: World Lemur Day.
* On the web page, open May 2030. Observe:
  * May 11th: International Binturong Day.
* The following months start and end on these dates, and do not have extra days or padding boxes outside of the weeks they're meant to cover:
  * 2024-12: Sunday (no empty days before) - Tuesday (4 empty days after).
  * 2025-02: Saturday (6 days before) - Friday (1 empty day after).
  * 2025-05: Thursday (4 empty days before) - Saturday (no empty days after).
  * 2026-02: Sunday (no empty days before) - Saturday (no empty days after).
* Functioning previous and next buttons including at the end-points of the month+year selector (if it has ends).
  * If there are end-points to the month+year selector, the previous and next buttons must work flawlessly when going beyond that limit. The UI must not e.g. show an empty string, "undefined", "null", "NaN" or similar if the "current month" or "current year" is displayed anywhere in the UI. The calendar days must be correctly shown.
* A usable way of jumping to a month+year.
* UI is generated by DOM manipulation, and day generation is dynamic. Everything would work if arbitrary additional days were added to the data file.
* The website must score 100 for accessibility in Lighthouse
* Unit tests must be written for at least one non-trivial function

### For groups of at least 2

* Run the supplied file with `node`, generates a file named `days.ics`. Import that file into a Google Calendar (see instructions above). Verify the same dates as in the web UI.
* The events in the calendar must be whole-day events, and not have a start/end time.
* Logic for calculating dates must be shared between the web generator and the iCal generator.

### For groups of at least 3

* Clicking an Ada Lovelace Day in the web UI displays the below text.
* Clicking a Google Calendar event for Ada Lovelace Day displays the below text.

Text for Ada Lovelace Day (which must be fetched via API):

> Ada Lovelace was a mathematician who made contributions to the field of computing in its very early days. On Ada Lovelace Day we celebrate and raise awareness of the contributions of women to STEM fields.

## Working in a group

If you working in a group, we recommend that **all** team members read the [Working in a group guidelines](https://github.com/CodeYourFuture/Checkpoint/blob/main/working-in-a-group.md). Confirm all group members have read and understand these before starting to write code.
