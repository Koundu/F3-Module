
//Defining of the Selectors
const dataContainer = document.getElementById("current-image-container");
let heading = dataContainer.querySelector('h1');
let image = dataContainer.querySelector('img');
const searchContainer = document.getElementById("search-history");
let dateHistory = searchContainer.querySelector('li');
let link = dateHistory.querySelector('a');
let title = dataContainer.querySelector('h2');
let explanation = dataContainer.querySelector('p');
const searchForm = document.getElementById("search-form");
const search = document.getElementById('search');

fetch('https://api.nasa.gov/planetary/apod?api_key=NICsv12xSVOzyOszbH3dUED2LxosEqoDVHBtgvnd').then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
    console.log(data);
	// This is the JSON from our response
    getCurrentImageOfTheDay(data.date,data.url,data.title,data.explanation);
    if(data.date == undefined ){
        alert("Connection to the Server is Not Obtained/Refused!")
    }
    return data;
}).then(function(data){
    console.log(data)
    getImageOfTheDate(data.url,data.date)
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
})

//Function for getting the Current Image of the Day
function getCurrentImageOfTheDay(str,src,tit,expl){
    heading.innerText = "Picture On " + str;
    image.src = src;
    title.innerText = tit;
    explanation.innerText = expl;
}


//Function to get the Image and Store the date of the Image and display in the Search History
function getImageOfTheDate(src,str){
    image.src = src;
    localStorage.setItem("searches",JSON.stringify(str));
    console.log(localStorage.getItem("searches"));
    var search = JSON.parse(localStorage.getItem("searches"));
    searchContainer.appendChild(dateHistory);
    dateHistory.innerHTML = search;
}


search.addEventListener('click',()=>{
    const date = document.getElementById('search-input').value;
    alert(date)
    localStorage.setItem("searches",JSON.stringify(date));
    var search = JSON.parse(localStorage.getItem("searches"));
    searchContainer.appendChild(dateHistory);
    dateHistory.innerHTML += search;
})