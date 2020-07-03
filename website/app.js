/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=83ebb98333285cb2c4ac045d82723cb1';
let userResponse = '';
let zipCode = '';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// add event handler on 'generate' btn click
if(document.querySelector('#generate'))
  document.querySelector('#generate').addEventListener('click', generateHandler);
function generateHandler()
{
    hideError();
    userResponse = document.querySelector('#feelings').value;
    zipCode = document.querySelector('#zip').value;
    getAPI(baseUrl + zipCode + apiKey)
    .then(data => data.main != null
      ? postData('/setWeather', {temperature: data.main.temp, date: newDate, userResponse: userResponse})
      : showError(data.message))
    .then(updateUI)
    .catch(error => showError(error));
}

// post helper
const postData = async (url = '', data = {}) =>{
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    try {
        const data = await response.json();
    } catch (e) {
        console.log(`POST method error: ${e}`);
    }
}
// get helper
const getData = async (url = '') => {
    const response = await fetch(url);

    try {
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(`GET method error: ${e}`);
    }
}
// get API
const getAPI = async (url = '') => {
    const apiData = await getData(url);
    return apiData;
}

// update UI
const updateUI = async () => {
    const data = await getData('/all');

    if(data.hasOwnProperty('date'))
    {
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}`;
        document.getElementById('content').innerHTML = `User feelings: ${data.userResponse}`;
    }
    document.querySelector('#feelings').value = '';
    document.querySelector('#zip').value = '';
}

// handle errors
const showError = (error = '') => {
    var divHeadline = document.getElementsByClassName('headline');
    divHeadline[0].insertAdjacentHTML('afterend', `<div id="errorMsg"><strong>Error:</strong> ${error}</div>`);
}

const hideError = () => {
    var errorMsg = document.getElementById('errorMsg');
    if(errorMsg != null)
      errorMsg.remove();
}
