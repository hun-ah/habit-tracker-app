# Habit tracker app

This full stack CRUD application helps you to keep track of your daily habits!

**This site is no longer live but you can check out the updated version here:** [Habit Tracker](https://habittracker-nextjs-hwm.vercel.app/)

![Screen Shot 2023-02-06 at 3 10 20 PM](https://user-images.githubusercontent.com/103898493/217074727-ea44291a-5be4-482b-84bd-dcec32a874c9.png)

## How It's Made:
**Built with: Node.js, Express, MongoDB, JavaScript, CSS and EJS**

This project began with a wireframe of what needed to be displayed to the user, such as the homepage, habits page, login, sign-up etc. Once the wireframe
was established, I began working on setting up the backend code on Node: installing initial packages needed, setting up express, setting up the port etc.
I decided to work on the habits page first, since this would be the focus of my application and where most of the requests would occur. I set up my
backend to listen for all of the requests that would be coming through on the habits page (getting the page, creating, updating and deleting habits) and 
wrote the corresponding code for each request (GET, PUT, POST, DELETE). I initially had all of this code on my server.js and decided to refactor the code 
to use MVC architecture to make my code more readable and useable. I created a routes folder that directed the requests to the corresponding controllers
and a folder to hold my models. At this point I also decided to implement Mongoose, so I could take advantage of using a schema when working with MongoDb.
As I was writing the code for updating and deleting on the backend, I also began to write the frontend JS to send info to the database to be rendered
into the views.

Once I had completed the habits page (including using EJS to create a template), I started building out the rest of the pages routes, controllers, models 
and views. At this point, I needed to enable the user to create an account, login and be able to authenticate users. I implemented passport to help with my
authentication and bcrypt to hash user passwords being stored in the database.

After all of the views had been set up, I styled each page using CSS and set up any media queries needed for mobile.

## Optimizations:

A LOT of edits were made to this project to make it cleaner. One of the biggest changes was switching to MVC architecture for all of the backend code, like
mentioned above. I also re-did all of the CSS for each page after the project was finished because I had so many issues on mobile. Working with CSS
efficiently is a big struggle for me and I'm still not completely happy with the way the CSS is structured for this project. This is an area i'd like to
focus on improving as I start to build my next project.

This application was initially very basic but as I completed big pieces of functionality, I added smaller pieces that would make the app more user friendly
and enjoyable to use, such as: displaying how many habits are left to the user, creating a daily streak for each habit and a congratulations message
when all habits are compelete for the day.

One thing I had a **lot** of trouble with was working with dates. I initially had much of my logic for working with dates on the server side and ended up
moving this to the client side to A, make less requests to the server and B, more easily convert the dates (converting UTC time from the server to the
clients local time).

If I had more time, I would add the ability to edit habits, archive a habit (in case the user wanted to bring it back again at some point) and some kind
of calendar feature, where the user could click on a specific date to see what habits were completed. I also realized that I didn't write my HTML
semantically for this project because I was so focused on writing the backend code. I would like to come back and remedy this at some point.

## Lessons Learned:

This project was a huge learning experience for me. It was my first time writing backend code and using a database. Besides getting more familiar with 
using node, express, MongoDB and EJS, I also learned how to use different packages (bcrypt, passport, dotenv, express-sessions and mongoose, among
others). 

I've learned a lot about using MVC architecture, mongoose/MongoDB methods and how to use them and working with asynchronous code. 
Due to the issues I had with dates, I've gained a lot of knowledge about how dates work on the backend, UTC time, JS date object, time zone offsets and
using a library such as Moment.js (though I know it is deprecated and there are some better options out there currently).

The other big takeaway for me is the importance of structuring your code correctly the first time and not taking any shortcuts (especially when it comes
to CSS) to save yourself more work down the line!
