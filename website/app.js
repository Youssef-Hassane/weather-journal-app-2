/* Global Variables */

// Create a new date instance dynamically with JS
// Here, I just modified the name of the variable from "d" to data
// As well as, the "." that are between the day, month, and the year with "-" 
let date = new Date();
let newDate = date.getMonth()+'-'+ date.getDate()+'-'+ date.getFullYear();

// The port number is 5050
const theNumberOfThePort = 5050;

// This is the Localhost
// Notice I can utilize the word "localhost"
const hostNumber = "127.0.0.1";

/**
 *  According to OpenWeatherMap (n.d.), in order to call the current weather data by using zip code
 *  I need to use the following code: 
 *  "api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}" 
 *  As mentioned in the OpenWeatherMap website if I didn't used "{country code}" the default country 
 *  would be the United State of America (US).
 */ 
const theURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

/**
 *  My API Key is: 159abb56dd041a28caa22534f5a7f464
 *  According to OpenWeatherMap (n.d.), "Units of measurement. standard, metric and imperial units 
 *  are available. If you do not use the units parameter, standard units will be applied by default" (para. #).
 * 
 */

// I'm utilizing the "&units=metric" in order to make the temperature in Celsius. 
const apiKey = ",&appid=159abb56dd041a28caa22534f5a7f464&units=metric";

// the URL of the server
const theURLOfTheServer = `http://${hostNumber}:${theNumberOfThePort}`;

const addURL = `${theURLOfTheServer}/addInformation`;

const allURL = `${theURLOfTheServer}/allInformation`;

// a set of variable regarding the user input in the Input element
let theDivOfTheInputElement, theInputElement, theInputValue;

// a set of variable regarding the user input in the Textarea element
let theDivOfTheTextareaElement, theTextareaElement, theTextareaValue;

// A variable regarding the information from the API to the website
let informationFromTheAPIToTheWebsite;

// A variable regarding postTheObject function
let postTheObject;




// Creating a the div's element and adding an ID Attribute
function createDivsElement(){

    // Creating an array with all the ID the I want to added to the div's that I'm going to create.
    let ids = ["date", "country", "city", "temp", "temp_max", "temp_min", "feels_like", "speed", "main", "description", "content"]

    // By utilizing the for loop I'm going to create 11 div's
    for (let index = 0; index <= 10; index++) {
        // By utilizing the the .querySelector method select the element (div) that has ID called "entryHolder".
        let entry = document.querySelector("#entryHolder");

        // By utilizing the .createElement() method I can create a div elements
        let divDiv = document.createElement("div");

        //set a id Attribute to the div's
        divDiv.setAttribute("id", ids[index]);

        //Add the div element that was created in the div element that has ID called "entryHolder"
        entry.appendChild(divDiv);
        
    }   
}

//Calling the "createDivsElement" function in order to create a the div's element.
createDivsElement();

// The value of the Input and the Textarea element
function theValueOfTheInputAndTheTextareaElement() {

    /**
     * From the index.html file (line 20 to 25):
     * 
     *      <div id="theInput" class ="holder zip">
     *          <div class="header">Weather Journal App</div>
     *          </br>
     *          <label for="zip">Enter Zipcode here</label>
     *          <input type="text" id="zip" placeholder="enter zip code here">
     *      </div>
     * 
     * By utilizing the .querySelector method I can select the element (div) that has ID called "theInput"
     * 
     * After that I can select the Input element also by utilizing the .querySelector method.
     * 
     * Now, I need to get the value (zip code) that the user entered, thus, I'm going to use the .value method
     * 
     */

    // By utilizing the .querySelector method select the element (div) that has ID called "theInput".
    theDivOfTheInputElement = document.querySelector("#theInput");

    // By utilizing the .querySelector method select the Input element.
    theInputElement         = theDivOfTheInputElement.querySelector("input");

    // Getting the value (zip code) that the user entered by utilizing the .value method.
    theInputValue           = theInputElement.value;

    /**
     * From the index.html file (line 27 to 32):
     * 
     *      <div id="theTextarea" class ="holder feel">
     *          <label for="feelings">How are you feeling today?</label>
     *          <textarea class= "myInput" id="feelings" placeholder="Enter your feelings here" rows="9" cols="50"></textarea>
     *          </br>
     *          <button id="generate" type = "submit"> Generate </button>
     *      </div>
     * 
     * By utilizing the .querySelector method I can select the element (div) that has ID called "theTextarea"
     * 
     * After that I can select the Textarea element also by utilizing the .querySelector method.
     * 
     * Now, I need to get the value (user's feeling) that the user entered, thus, I'm going to use the .value method
     * 
     */

    // By utilizing the .querySelector method select the element (div) that has ID called "theTextarea".
    theDivOfTheTextareaElement = document.querySelector("#theTextarea");

    // By utilizing the .querySelector method select the Textarea element.
    theTextareaElement         = theDivOfTheTextareaElement.querySelector("textarea");

    // Getting the value (user's feeling) that the user entered by utilizing the .value method.
    theTextareaValue           = theTextareaElement.value;

};

function theGenerateButton(){

    /**
     * From the index.html file (line 27 to 32):
     * 
     *      <div id="theTextarea" class ="holder feel">
     *          <label for="feelings">How are you feeling today?</label>
     *          <textarea class= "myInput" id="feelings" placeholder="Enter your feelings here" rows="9" cols="50"></textarea>
     *          </br>
     *          <button id="generate" type = "submit"> Generate </button>
     *      </div>
     * 
     * By utilizing the .querySelector method I can select the element (div) that has ID called "theTextarea"
     * 
     * After that I can select the Button element also by utilizing the .querySelector method.
     * 
     * Now, I need to get the value (user's feeling) that the user entered, thus, I'm going to use the .value method
     * 
     */

    // By utilizing the .querySelector method select the element (div) that has ID called "theInput".
    let theDivOfTheButtonElement = document.querySelector("#theTextarea");

    // By utilizing the .querySelector method select the Textarea element.
    let theButtonElement         = theDivOfTheButtonElement.querySelector("button");

    // Add event that listen to a mouse click (when the mouse click the button).
    // the callback function is "theEventOfTheGenerateButton" which we will discuss below 
    theButtonElement.addEventListener("click", theEventOfTheGenerateButton);

};

// Calling the "theGenerateButton" function.
theGenerateButton();

/**
 *{
 *  "coord": {
 *    "lon": -122.08,
 *    "lat": 37.39
 *  },
 *  "weather": [
 *    {
 *      "id": 800,
 *      "main": "Clear",
 *      "description": "clear sky",
 *      "icon": "01d"
 *    }
 *  ],
 *  "base": "stations",
 *  "main": {
 *    "temp": 282.55,
 *    "feels_like": 281.86,
 *    "temp_min": 280.37,
 *    "temp_max": 284.26,
 *    "pressure": 1023,
 *    "humidity": 100
 *  },
 *  "visibility": 16093,
 *  "wind": {
 *    "speed": 1.5,
 *    "deg": 350
 *  },
 *  "clouds": {
 *    "all": 1
 *  },
 *  "dt": 1560350645,
 *  "sys": {
 *    "type": 1,
 *    "id": 5122,
 *    "message": 0.0139,
 *    "country": "US",
 *    "sunrise": 1560343627,
 *    "sunset": 1560396563
 *  },
 *  "timezone": -25200,
 *  "id": 420006353,
 *  "name": "Mountain View",
 *  "cod": 200
 *  }                         
 */

// This is the callback function that is going to be called/run when the user click the button.
function theEventOfTheGenerateButton(){

    // Calling the "theValueOfTheInputAndTheTextareaElement" function, which we have already discussed (from line 96 to 152).
    // However, we can briefly say that this by utilizing this function we will get the value that the user entered in the 
    // Input element and the Textarea element.
    theValueOfTheInputAndTheTextareaElement();

    // Calling the "fetchTheInformation" function with the "theInputValue" parameter 
    // and then call the "informationFromTheZipCode" function, which we will discuss below
    fetchTheInformation(theInputValue).then(informationByTheZipCode);
}

// Determine the information that i need to extract from the API
const informationByTheZipCode = function (theInformation) {      
    // 
    informationFromTheAPIToTheWebsite  = {
        // The date of the day
        Date:        newDate,
        // The country which usually going to be the United State Of America
        Country:     theInformation.sys.country,
        // The city according to the zip code (city), Such as 10001 is New York
        City:        theInformation.name,
        // The temperature according to the zip code (city)
        Temp:        theInformation.main.temp,
        // The max temperature according to the zip code (city)
        Temp_max:    theInformation.main.temp_max,
        // The min temperature according to the zip code (city)
        Temp_min:    theInformation.main.temp_min,
        // How temperature feels like according to the zip code (city)
        Feels_like:  theInformation.main.feels_like,
        // The speed of the wind according to the zip code (city)
        Speed:       theInformation.wind.speed,
        // The description of the weather according to the zip code (city)
        Description: theInformation.weather[0].description,
        // The main weather according to the zip code (city)
        Main:        theInformation.weather[0].main,
        // What the user entered in the Textarea box
        Content:     theTextareaValue,
    }

    // Calling the "postTheInformationAndUpdateTheUserInterface" function
    postTheInformationAndUpdateTheUserInterface()
}

// This function will post the the information and update the user interface
function postTheInformationAndUpdateTheUserInterface() {
    // Posting the the information
    postTheInformation(addURL, informationFromTheAPIToTheWebsite); 
    // Updating the user interface
    updateTheUserInterface();
}


// Fetch information that the user asked for
async function fetchTheInformation(theZipCodeThatEnteredByTheUser) {
    try {
        /**
         * 
         * Creating a two variable called theFullURL, response, and information.
         *      
         *      The variable "theFullURL" will contain the global variable "theURL" and "apiKey" and between them the argument "theZipCodeThatEnteredByTheUser":
         *          
         *          theURL = "https://api.openweathermap.org/data/2.5/weather?zip="
         * 
         *          theZipCodeThatEnteredByTheUser = "the zip code that the user will enter in the "input" element" 
         * 
         *          apiKey = ",&appid=159abb56dd041a28caa22534f5a7f464&units=metric"
         * 
         * 
         *      The variable "theResponseInformationFromTheAPI" will fetch the information that was requested by the user from the OpenWeatherMap API 
         *      and save it. Additionally, "the json() method of the Response interface takes a Response stream and reads it to completion. 
         *      It returns a promise which resolves with the result of parsing the body text as JSON" (Web APIs | MDN, n.d., para. 1). 
         * 
         *  */ 
        let theEntireURL, theResponseInformationFromTheAPI;

        // By utilizing the Template literals I can combine the global variable "theURL" and "apiKey" and between 
        // them the argument "theZipCode" which it's the zip code that the user will enter in the "input" element
        theEntireURL = `${theURL}${theZipCodeThatEnteredByTheUser}${apiKey}`; 

        // By utilizing the fetch() and the json() method I can fetch the information that was requested by the user from the OpenWeatherMap API
        // As well as, making the information JSON, thus I can utilize it.
        theResponseInformationFromTheAPI = await (await fetch(theEntireURL)).json(); 
        /**
         * 
         * The previous can be done in one line, which is:
         *      
         *      let theResponseInformationFromTheAPI = await (await fetch(`${theURL}${theZipCode}${apiKey}`)).json(); 
         * 
         */
        
        // Printing the information that the user requested from the API utilizing the zip code
        console.log(theResponseInformationFromTheAPI);

        // Return the information
        return theResponseInformationFromTheAPI;
    } catch (error) {
        // Catch the error and display it in the console (handle an error).
        console.log(error);
    };
};

/**
 * 
 * Important:
 * 
 *      I can make the previous function as an arrow function:
 * 
 *          // Fetch information that the user asked for
 *          let fetchTheInformation = async (theZipCodeThatEnteredByTheUser) => {
 *              try {
 *                                    
 *                  // Creating a two variable called theFullURL, response, and information.
 *                  //    
 *                  //     The variable "theFullURL" will contain the global variable "theURL" and "apiKey" and between them the argument "theZipCodeThatEnteredByTheUser":
 *                  //        
 *                  //         theURL = "https://api.openweathermap.org/data/2.5/weather?zip="
 *                  //
 *                  //         theZipCodeThatEnteredByTheUser = "the zip code that the user will enter in the "input" element" 
 *                  //
 *                  //         apiKey = ",&appid=159abb56dd041a28caa22534f5a7f464&units=metric"
 *                  //
 *                  //
 *                  //     The variable "theResponseInformationFromTheAPI" will fetch the information that was requested by the user from the OpenWeatherMap API 
 *                  //     and save it. Additionally, "the json() method of the Response interface takes a Response stream and reads it to completion. 
 *                  //     It returns a promise which resolves with the result of parsing the body text as JSON" (Web APIs | MDN, n.d., para. 1). 
 *                  
 *                  
 *                  
 *                  let theEntireURL, theResponseInformationFromTheAPI;
 *
 *                  // By utilizing the Template literals I can combine the global variable "theURL" and "apiKey" and between 
 *                  // them the argument "theZipCode" which it's the zip code that the user will enter in the "input" element
 *                  theEntireURL = `${theURL}${theZipCodeThatEnteredByTheUser}${apiKey}`; 
 *
 *                  // By utilizing the fetch() and the json() method I can fetch the information that was requested by the user from the OpenWeatherMap API
 *                  // As well as, making the information JSON, thus I can utilize it.
 *                  theResponseInformationFromTheAPI = await (await fetch(theEntireURL)).json(); 
 *                  
 *                  
 *                  // The previous can be done in one line, which is:
 *                  //    
 *                  //     let theResponseInformationFromTheAPI = await (await fetch(`${theURL}${theZipCode}${apiKey}`)).json(); 
 *                  
 *                  
 *                  
 *                  // Printing the information that the user requested from the API utilizing the zip code
 *                  console.log(theResponseInformationFromTheAPI);
 *
 *                  // Return the information
 *                  return theResponseInformationFromTheAPI;
 *              } catch (error) {
 *                  // Catch the error and display it in the console (handle an error).
 *                  console.log(error);
 *              };
 *          };
 *
 */

// Updating The User Interface
async function updateTheUserInterface(){
    // Fetching (getting) the information 
    const newInfo = await fetch(allURL);
    // try and catch
    try {
        // Make the information JSON so that I can use them
        const Info = await newInfo.json();
        // Calling the "updateUI" function, which we will discuss below
        updateUI(Info);
    } catch (error) {
        // Catch the error and display it in the console (handle an error)
        console.log(error);
    }
}

/**
 * 
 * Important:
 * 
 *      I can make the previous function as an arrow function:
 * 
 *          // Updating The User Interface
 *          let updateTheUserInterface = async () => {
 *              // Fetching (getting) the information 
 *              const newInfo = await fetch(allURL);
 *              // try and catch
 *              try {
 *                  // Make the information JSON so that I can use them
 *                  const Info = await newInfo.json();
 *                  // Calling the "updateUI" function, which we will discuss below
 *                  updateUI(Info);
 *              } catch (error) {
 *                  // Catch the error and display it in the console (handle an error)
 *                  console.log(error);
 *              }
 *          }
 * 
 * 
 */

// This function will update the user interface
function updateUI(Info){
    // By utilizing the the .querySelector method select the element (div) that has ID called "entryHolder".   
    let theDivOfTheEntryHolderElement = document.querySelector("#entryHolder");

    // By utilizing the the .querySelectorAll method select the all the elements (all the div's).   
    let theElementsThatInTheEntryHolderDiv = theDivOfTheEntryHolderElement.querySelectorAll("div");

    // printing the div's in the console
    console.log(theElementsThatInTheEntryHolderDiv);

    // A set variable's the contain the new information:
    
    // The date of the day
    let Date           = `Date: ${Info.Date}`;
    // The country which usually going to be the United State Of America
    let Country        = `Country: ${Info.Country}`;
    // The city according to the zip code (city), Such as 10001 is New York
    let City           = `City: ${Info.City}`;
    // The temperature according to the zip code (city)
    let Temperature    = `Temperature: ${Info.Temp}&degC`;
    // The max temperature according to the zip code (city)
    let maxTemperature = `Max Temperature: ${Info.Temp_max}&degC`;
    // The min temperature according to the zip code (city)
    let minTemperature = `Min Temperature: ${Info.Temp_min}&degC`;
    // How temperature feels like according to the zip code (city)
    let feelsLike      = `Feels Like: ${Info.Feels_like}&degC`;
    // The speed of the wind according to the zip code (city)
    let windSpeed      = `Wind Speed: ${Info.Speed}`;
    // The main weather according to the zip code (city)
    let mainWeather    = `Main weather: ${Info.Main}`;
    // The description of the weather according to the zip code (city)
    let Description    = `Description: ${Info.Description}`;
    // What the user entered in the Textarea box
    let yourFeeling    = `Your Feeling: ${Info.Content}`;

    // By utilizing the .innerHTML method I can update the user interface ( update the information)
    // Update/Adding the Date
    theElementsThatInTheEntryHolderDiv[0].innerHTML = Date;
    // Update/Adding the Country
    theElementsThatInTheEntryHolderDiv[1].innerHTML = Country;
    // Update/Adding the city
    theElementsThatInTheEntryHolderDiv[2].innerHTML = City;
    // Update/Adding the temperature
    theElementsThatInTheEntryHolderDiv[3].innerHTML = Temperature;
    // Update/Adding the max temperature
    theElementsThatInTheEntryHolderDiv[4].innerHTML = maxTemperature;
    // Update/Adding the min temperature
    theElementsThatInTheEntryHolderDiv[5].innerHTML = minTemperature;
    // Update/Adding the feels
    theElementsThatInTheEntryHolderDiv[6].innerHTML = feelsLike;
    // Update/Adding the wind speed
    theElementsThatInTheEntryHolderDiv[7].innerHTML = windSpeed;
    // Update/Adding the main weather
    theElementsThatInTheEntryHolderDiv[8].innerHTML = mainWeather;
    // Update/Adding the description
    theElementsThatInTheEntryHolderDiv[9].innerHTML = Description;
    // Update/Adding your feeling
    theElementsThatInTheEntryHolderDiv[10].innerHTML = yourFeeling;
}

/**
 * 
 * The below is the POST request that we have studied in the udacity:
 * "
 *      const postData = async ( url = '', data = {})=>{
 *           console.log(data);
 *           const response = await fetch(url, {
 *           method: 'POST', 
 *           credentials: 'same-origin',
 *           headers: {
 *                'Content-Type': 'application/json',
 *           },
 *           // Body data type must match "Content-Type" header        
 *           body: JSON.stringify(data), 
 *          });
 *
 *            try {
 *              const newData = await response.json();
 *              console.log(newData);
 *             return newData;
 *           }catch(error) {
 *            console.log("error", error);
 *            }
 *      }
 *
 * postData('/add', {answer:42});
 * " (Udacity, n.d., para. #).
*/


/**
 * 
 * @param {
 * } theURL 
 * @param {*} information 
 * @returns 
 */

// Post the information
async function postTheInformation( theURL, information) {

    information = {
        // Due to the fact the default method is GET
        // I should make it POST
        // Also, as we have learned in udacity classroom the body data type should match "Content-Type" header
        method: 'POST', 
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(information), 
    }

    // Using the fetch method in order to post the information
    const response = await fetch(theURL, information);

    try {
        const theNewInformation = await response.json();
        // Return the new information
        return theNewInformation;
    } catch (error) {
        // Catch the error and display it in the console (handle an error)
        //console.log(error);
    }
}




/**
 * 
 * References
 * OpenWeatherMap. (n.d.). Current weather data. OpenWeatherMap. Retrieved March 14, 2022, from https://openweathermap.org/current#zip 
 * Udacity. (n.d.). Understanding Server &amp; Client Side Code. Udacity. Retrieved March 14, 2022, from https://classroom.udacity.com/nanodegrees/nd0011-fwd-t2/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/3726b76d-b5c9-4c51-b945-7f1a611a2cb4 
 * Web APIs | MDN. (n.d.). Response.json() - web apis: MDN. Web APIs | MDN. Retrieved March 18, 2022, from https://developer.mozilla.org/en-US/docs/Web/API/Response/json 
 * 
 */