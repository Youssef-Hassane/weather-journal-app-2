// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Port number
const theNumberOfThePort = 5050;

// Host number
const hostNumber = "127.0.0.1";


// Require Express to run server and routes
/** I used the express in order to run server and routes. */
const express = require('express');

// Start up an instance of app
/** Here I start up an instance of app.*/ 
const app = express();

/**
 * 
 * "Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins 
 *  (domain, scheme, or port) other than its own from which a browser should permit loading resources. CORS also relies 
 *  on a mechanism by which browsers make a "preflight" request to the server hosting the cross-origin resource, in order to 
 *  check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP 
 *  method and headers that will be used in the actual request" (HTTP | MDN, n.d.a, para. 1).
 * 
 */

// Cors for cross origin allowance
/**Our front end can communicate with the server thanks to CORS, which allows us to establish a cross-origin resource sharing policy.*/
const cors = require("cors");

// All CORS Requests Must Be Enabled
app.use(cors());

/* Dependencies */
const bodyParser = require('body-parser')


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));





// Setup Server
//
// Get method route
// When a GET request is made to the homepage, respond with a JavaScript object.
app.get("/allInformation", 
    function getAllMethodRequests (req, res){
        // Sent the data "projectData" 
        res.send(projectData);
    }
);

/**
 * 
 * Notice that, I can do the previous in two different ways:
 * 
 * 1). 
 *      app.get("/all", getAllMethodRequests)
 *      
 *      function getAllMethodRequests (req, res){
 *          // Sent the data "projectData" 
 *          res.send(projectData);
 *      }
 * 
 * 2).
 *      app.get("/all", 
 *          (req, res) => {
 *              // Sent the data "projectData"
 *              res.send(projectDatas);
 *          }
 *    
 */

// POST method route
app.post("/addInformation", 
    function postTheInformation (req, res){
        projectData = req.body;
        // Print the value of projectData in the console
        console.log(projectData);
    }
);

/**
 * 
 * Notice that, I can do the previous in two different ways:
 * 
 * 1). 
 *      app.post("/all", postTheInformation);
 *      
 *      function postTheInformation (req, res){
 *      projectData = req.body;
 *      // Print the value of projectData in the console
 *      console.log(projectData);
 *      
 *      }
 * 
 * 2).
 *      app.get("/all", 
 *          (req, res) => {
 *              projectData = req.body;
 *              // Print the value of projectData in the console
 *              console.log(projectData);
 *      
 *      });
 *    
 */



// spin up the server
app.listen(theNumberOfThePort, function (){
    console.log("The server is running.");
    console.log(`The server is running on the (${hostNumber}) using the ${theNumberOfThePort} port`);
    console.log(`The full URL is:\n     http://${hostNumber}:${theNumberOfThePort}/`);
});













/**
 * 
 * References
 * 
 * HTTP | MDN. (n.d.a). Cross-origin resource sharing (CORS) - http: MDN. HTTP | MDN. Retrieved March 13, 2022, from https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS 
 * HTTP | MDN. (n.d.b). 200 OK - http: MDN. HTTP | MDN. Retrieved March 14, 2022, from https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200 
 * 
 */