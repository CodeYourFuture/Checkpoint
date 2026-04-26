# Project: Shared Bookmarks

As developers, we spend a lot of time reading articles on the web and we often want to record useful links to come back to them later. It is fun to share your bookmarks with others so that they can find interesting and useful links too.

Here are some examples of bookmark sites:

- [Jason Kottke](https://kottke.org/)
- [Jeremy Keith](https://adactio.com/links)
- [Andy Baio](https://waxy.org/category/links/)
- [Ali Smith](https://bookmarks.alasdairsmith.co.uk/)

Your task is to write code which allows a user to save a link with a short description and share them with others.

You should make a frontend, which displays a list of bookmarked links and the user's description. A user can create new bookmarks by submitting a form with the URL and the description. You should use HTML and JavaScript for this. We want to focus on your ability to create the correct logic and not spend time on creating the perfect UI. You are allowed to use CSS, but you are strongly advised to focus on the logic, and only add styling when you are finished. You will not get any credit for styling.

## Supplied scaffolding

We have supplied a few sample files in the repo to demonstrate how you can define functions in one file and use them from another file. Feel free to use these files in your solution if you want, or to just use them for inspiration for your own solution.

Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server - you can't open the `index.html` file using a `file://` URL.

We have also provided a `storage.js` file, which contains four functions to help with data storage. `storage.js` is a file containing four functions:

- `getUserIds()`: when called, returns an array of strings, each of which is a user id
- `getData(userId)`: when called with a user id string as an argument, returns an array of objects, each of which represents a bookmark that belongs to the user
- `setData(userId, data)`: when called with a user id string and a data object as arguments, it will store the data for the user. The object should contain information about the bookmark, such as the URL, title and description. The function does not return anything
- `clearData(userId)`: when called with a user id string as an argument, it will clear any stored data associated with the user id. This is provided to help with development, and is not required in the final code

**Note**: None of the storage functions perform any validation or de-duplication, so ensure that you are sending the correct data before storing it.

## Requirements

You must submit both a link to your GitHub repo, and a link to the deployed website. Your project must meet all [project submission requirements](https://curriculum.codeyourfuture.io/checkpoint/prep/#project-submission).

Your website must be hosted on the internet, and must be automatically deployed when you merge changes to your GitHub repo.

Your website must include a drop-down to select a user to display information for. When a user is selected, you must display the list of bookmarks for that user. If there are no bookmarks for the user, you should present a message explaining this.

You **must not** implement any kind of authentication. Just a drop-down to choose which user’s information to display. You **must not** implement data storage yourself, as we have provided that for you.

After picking a user, your website should display the list of bookmarks in reverse chronological order. For each bookmark, it should display the title and description of the bookmark. The title should be hyperlink to the URL of the bookmark. The timestamp at which the bookmark was created should be displayed.

Each bookmark should also have:
- A button which, when clicked, copies the URL to the clipboard.
- A like counter/button. When a bookmark is first saved, its like count should be 0. Each time a user clicks the like button, that number should go up by one, and be displayed. This like count should be persisted such that closing the page and coming back to it, it is preserved.

Your website must include a form with text inputs for the URL, title, and description, and submit button that allows a user to add a new topic. This form must be accessible, so for example, a user using the keyboard should be able to submit it without using a mouse.

After the new data has been stored, the updated list of bookmarks must be displayed (including the new bookmark) for the relevant user.

The data should persist across sessions, so if you close your browser then re-open it and select the same user, the data must still be there. The data is not expected to be viewable from another computer - storage is only local.

Your GitHub repository must contain unit tests which demonstrate that your code works. End to end tests are optional.

Every view of your website must be accessible (i.e. for each user, whether or not they have bookmarks, etc). We will test this by making sure that "Snapshot" mode of Lighthouse gives 100% accessibility for any view we look at.

## Rubric

All of the below requirements must be met for the project to be considered complete:

- The website must contain a drop-down which lists five users
- Selecting a user must display the list of bookmarks for the relevant user
- If there are no bookmarks for the selected user, a message is displayed to explain this
- The list of bookmarks must be shown in reverse chronological order
- Each bookmark has a title, description and created at timestamp displayed
- Each bookmark’s title is a link to the bookmark’s URL
- Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark
- Each bookmark's like counter works independently, and persists data across sessions
- The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.
- Submitting the form adds a new bookmark for the relevant user only
- After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark
- The website must score 100 for accessibility in Lighthouse
- Unit tests must be written for at least one non-trivial function
