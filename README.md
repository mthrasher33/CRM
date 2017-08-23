# CRM
Sketch of an application that sends personalized email addresses


1. Instructions for how to run your program <br>
You will need node and npm installed on your local machine. They're usually installed in one package and can be found <a href="https://nodejs.org/en/">here</a>. Clone the git repot to your local machine, install the dependencies at 
the command-line with "npm install", and initiate the program with "npm start." Program will serve up on http://localhost:3000.

2. An overview of design decisions <br>
Program is built in node and express with AJAX calls from the front-end. We have a seperation of concerns with a data layer (the data folder),
our views folder, and the routes, which in this smaller application connects the data layer to the view. 

3. What language you picked and why <br>
I picked node.js, express.js, pug for template engines, and a variety of node modules like async and fs. There are obviously plenty of great
options for this project, but I wanted a light-weight approach that maintained a seperation of concerns between model/view/controller (in this case, routes) and 
made asynchronous programming a breeze since we would be reading from three seperate JSON files (hence the use of the async module)

4. Your process for verifying the correctness of you program <br>
Didn't write any test suites for this one but conducted manual unit testing.

5. What didn't you get to, or what else might you do with more time? <br?
Verifying user input, potentially flushing out a more robust communication with the server so that more information about guests/companies 
could be used in our customized messages, a real UI, writing a test suite. 
