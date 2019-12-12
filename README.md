# CEPR 490 Final Project: "Derby Pet Match"
_Code Louisville @ BU: Front-End Web Development_

## Instructions
The project may either be cloned or accessed on [GitHub Pages](http://aallehoff.github.io/derby-pet-match/). The critical parts of the project will run properly without an internet connection (only the Google Map and external links require the internet). You may review the following table to compare the functionality of these available methods.

Method | Online | Offline
------ | ------ | -------
git clone | Fully Functional | No Google Map or external links
[GitHub Pages](http://aallehoff.github.io/derby-pet-match/) | Fully Functional | Requires internet to load

## Project requirements
- [x] __Responsive layout__
   - [x] Adapts and improves user experience per device.
- [x] __Custom HTML__
    - [x] Includes comments for major portions.
    - [x] (optional) Bootstrap or similar.
- [x] __Custom CSS__
    - [x] Includes comments for major portions.
    - [x] Minimum 3 rules.
    - [x] Minimum 1 media query.
    - [x] Located in a seperate file; not inline.
- [x] __Custom JS__
    - [x] Includes comments for major portions.
    - [x] Minimum 1 function.
    - [x] Located in a seperate file; not inline.
    - [x] (optional) jQuery or similar.
- [x] __Uploaded to GitHub__
    - [x] Includes README file.
    - [x] GitHub Pages optional.
- [x] __No asset swaps__
    - [x] Must not reuse other projects from the course.
- [x] __Interactivity__
    - [x] Responds to actions performed by the user.
    
## Device & Browser Testing
This project has been tested and confirmed to run on the following hardware/browser combos:
* PC (Windows 10)
   * Microsoft Edge
   * Google Chrome
* Macbook Pro (macOS Catalina)
   * Safari
   * Google Chrome
* iPhone XS (iOS 13.1.3)
   * Safari
   * Google Chrome
* Samsung Galaxy S10+ (Android 9)
   * Samsung Internet
   * Google Chrome
   
Additionally, the project has been run against Google Chrome's Audit feature, which produced the following results:

Page | Date | Result
---- | ---- | ------
index.html | 2019-12-11 | ![Performance 100, Accessibility 98, Best Practices 100, SEO 100](https://raw.githubusercontent.com/aallehoff/derby-pet-match/master/img/readme/index-score.PNG)
adopt.html | 2019-12-11 | ![Performance 100, Accessibility 96, Best Practices 100, SEO 100](https://raw.githubusercontent.com/aallehoff/derby-pet-match/master/img/readme/adopt-score.PNG)

   
## Discussion
### Concept
My intent was to create a website that is suitable for use as a basic business website, and add some interactivity on top of it. I decided to create a fictional pet adoption agency, which I named _Derby Pet Match_, to use as a _client_.

_Client_ requirements were as follows:
   * Communicate the basic contact and location information of the business.
   * Provide a means for the public to view a list of available pets, with the ability to narrow down to pets that may specifically relate with the user.
   
### Composition
In order to realize my concept and meet the _client_'s needs, the project is comprised mainly of five files:
   1. _index.html_
   2. _adopt.html_
   3. _style.css_
   3. _app.js_
   4. _data.json_
   
 The _index.html_'s main purpose is to communicate basic biz info, and funnel users towards the _adopt.html_ page. Both of these pages share the common _style.css_. The _adopt.html_ serves as a platform for _app.js_ which presents the user with questions and returns a list of pets as gathered from _data.json_.
 
 All other assets are merely supporting actors in this proverbial play, and are mainly comprised of image files.
 
 #### Common Features
 Both _index.html_ and _adopt.html_ share a common favicon, header, footer, and external stylesheet. All other elements are unique.
 
The header contains an image as well as text, and has a collapsible hamburger navigation menu that is visible on XS and SM screens.

The footer contains a secondary navigation menu that is in a vertical orientation on XS and SM screens and a horizontal one in MD and up screens.
 
 #### index.html's Features
Upon landing on _index.html_ the user is greeted by a full-width burnt-sienna jumbotron inviting them to adopt a pet. The main content of the page is variable width and contains about, contact, and location information for the _client_. The variable width content on the page organizes into a single column on XS and SM screens, two columns on MD and LG, and four columns on XL.

Included here are several links crediting resources that I used in the project, links to phone/email/directions, as well as an iframe to display a Google Map of the _client_'s location.

#### adopt.html's Features
The _adopt.html_ page is comprised a series of cards which contain question and response dialogs to be presented to the user. Each time a user provides input to answer a question the question is hidden, the results are recorded by _app.js_ and the next question is displayed.

Once all questions have been answered, _app.js_ will generate a list of matched pets from _data.json_ and print those results to page using a card template.

There are various optimizations for the different screen sizes here, and I invite you to run through the questions through a screen emulator so you may see them for yourself. In short, size, spacing, and orientation are all tailored to the XS/SM, MD/LG, and XL ranges individually to improve the usability of the page.

#### style.css's Features
The styles are written with a mobile first approach, the media queries merely overriding those rules which do not translate well from small screen to large. Significant attention is given to ease of use. I chose the colors to have a vaguely fall season theme.

#### app.js's Features
The _app.js_ script is responsible for handling events, recording user input, retrieving _data.json_, generating a list of results, and printing those results to _adopt.html_. The file itself is extensively commented, so we will not spend time discussing it in depth here.

#### data.json's Features
Instead of simply storing all of the pet's information in an array in _app.js_, I wanted to simulate the presence of a database by using an external JSON file. Loading the file into _app.js_ is tricky because it requires the use of asynchronous techniques. With the help of the jQuery docs, MDN, and mentor support I got it running. I am quite happy with how it runs in terms of the scope of this project, but it should be noted that there is definitely still room for improvement.

## Future Work
In the future I would like to replace _data.json_ with a full blown server-side database. This would enable an interface for adding/removing pets, and could even allow for users to apply for and "adopt" a pet that will then be marked as adopted (and perhaps queued for deletion?).
