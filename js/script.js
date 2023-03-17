const TABS_BODY = document.querySelectorAll('.tab-body-single');
const TABS_HEAD = document.querySelectorAll('.tab-head-single');
const SEARCH_FORM = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');

const VEHICLES = document.querySelector('.vehicles');
const STARSHIPS = document.querySelector('.starships');
const FILMS = document.querySelector('.films');

let numberOfVehicles = "";
let numberOfStarships = "";
let numberOfFilms = "";

let activeTab = 1, allData;

const INIT = () => {
    showActiveTabBody();
    showActiveTabHead();
}

/* Getting the active tab (0 to 3) and indexing the active tab value, minus 1
in order to get a 0 to 3 value, into tabs head array */
const showActiveTabHead = () => {
    TABS_HEAD[activeTab - 1].classList.add('active-tab');
}
const showActiveTabBody = () => {
    hideActiveTabBody();
    TABS_BODY[activeTab - 1].classList.add('show-tab');
}

// Hiding the content of the active tab (Head and Body) when clicking on another tab
const hideActiveTabBody = () => TABS_BODY.forEach(tabBody => tabBody.classList.remove('show-tab'));
const hideActiveTabHead = () => TABS_HEAD.forEach(tabHead => tabHead.classList.remove('active-tab'));


// Initializing the INIT constant and loading the content in the page
window.addEventListener('DOMContentLoaded', () => INIT());


/* Button event click when selection between tabs,
hide tabs head and body and then put classes active-tab and
show-tab in respectives classes based on activeTab value (0 to 3)*/
TABS_HEAD.forEach(tabHead => {
    tabHead.addEventListener('click', () => {
        hideActiveTabHead();
        activeTab = tabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

// Getting the name on the search field
const getInputValue = (event) => {
    event.preventDefault();
    let searchName = SEARCH_FORM.search.value;
    fetchCharacter(searchName);
}

// Search form submission
SEARCH_FORM.addEventListener('submit', getInputValue);

// Fetching the data from the SWAPI using the name field as parameter
const fetchCharacter = async(searchName) => {
    let url = `https://swapi.dev/api/people/?search=${searchName}`;
    try{
        const response = await fetch(url);
        allData = await response.json();
        showSearchList(allData.results);
    } catch(error){
        console.log(error);
    }
}

// Trying to make a list to select the character
const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(data => {
        const DEV_ELEMENT_CHARACTER = document.createElement('div');
        DEV_ELEMENT_CHARACTER.classList.add('search-list-item');
        DEV_ELEMENT_CHARACTER.innerHTML = `
            <p style="text-transform: capitalize;">${data.name} - ${data.gender}</p>
        `;
        searchList.appendChild(DEV_ELEMENT_CHARACTER);
    });
}

// Trying to get a character by name in the search field
SEARCH_FORM.search.addEventListener('keyup', () => {
    if(SEARCH_FORM.search.value.length > 2){
        fetchCharacter(SEARCH_FORM.search.value);
    } else {
        searchList.innerHTML = "";
    }
});


/* NEEDS REVISION!
How can I get the name of the character and compare with the name on json file using the input text field?
*/
searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    console.log(searchId);
    let singleData = allData.results.filter(singleData => {
        return searchId === singleData.id;
    })
    console.log(singleData);
    showCharacterData(singleData);
    searchList.innerHTML = "";
});

// Function for the reaload button
function reloadButton(){
    window.location.reload();
}


// Putting all the character data into the elements of the page.
const showCharacterData = (data) => {
    document.getElementById("input-form").value = "";
    console.log(data);

    if(data[0].name === 'Luke Skywalker') {
        document.querySelector('.app-body-content-thumbnail').innerHTML = `
        <img src = "img/thumbnail-luke-skywalker.jpg">`;
    } else{
        document.querySelector('.app-body-content-thumbnail').innerHTML = `
        <img src = "img/default-thumbnail.png">`;  
    }

    document.getElementById("input-form").disabled = true;
    document.getElementById("input-form").placeholder = "Reload to search another one... ->";
    document.querySelector('.name').textContent = data[0].name;
    document.querySelector('.attributes').innerHTML = `
    <li>
        <div>
            <i class = "fa-solid fa-circle"></i>
            <span>Height</span>
        </div>
        <span>${data[0].height}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-circle"></i>
            <span>Mass</span>
        </div>
        <span>${data[0].mass}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-circle"></i>
            <span>Hair Color</span>
        </div>
        <span>${data[0].hair_color}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-circle"></i>
            <span>Skin Color</span>
        </div>
        <span>${data[0].skin_color}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-circle"></i>
            <span>Eye Color</span>
        </div>
        <span>${data[0].eye_color}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-circle"></i>
            <span>Birth Year</span>
        </div>
        <span>${data[0].birth_year}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-circle"></i>
            <span>Gender</span>
        </div>
        <span>${data[0].gender}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-circle"></i>
            <span>Homeworld</span>
        </div>
        <span>${data[0].homeworld}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-circle"></i>
            <span>Species</span>
        </div>
        <span>${data[0].species}</span>
    </li>
    `;
    
    for(let i = 0; i < data[0].vehicles.length; i++){
        numberOfVehicles += `
        <li>
            <span>${data[0].vehicles[i]}</span>
        </li>`
        VEHICLES.innerHTML = numberOfVehicles;
    };
    
    for(let i = 0; i < data[0].starships.length; i++){
        numberOfStarships += `
        <li>
            <span>${data[0].starships[i]}</span>
        </li>`
    };
    STARSHIPS.innerHTML = numberOfStarships;

    for(let i = 0; i < data[0].films.length; i++){
        numberOfFilms += `
        <li>
            <span>${data[0].films[i]}</span>
        </li>`
    };
    FILMS.innerHTML = numberOfFilms;
}