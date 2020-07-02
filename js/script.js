

/////////////////////////////////////
/////////  PAGINATION //////////////
///////////////////////////////////

const pageList = document.querySelector('ul');
const eachStudent = pageList.children;

// loops through all list items and display 10 items per page

function pages(pageList, page){
    for(let i = 0; i < pageList.length; i +=1) {
        let firstPage = page - 9;
        let lastPage = page;
        if ( i >= firstPage  && i <= lastPage) {
            pageList[i].style.display= 'block';
        } else {
            pageList[i].style.display = 'none';   
        }  
    }
}

// grabbing students throught querySelector in the student's list
const students = document.querySelector('.student-list').children;
// number of pages
const numOfPages = Math.ceil(students.length / 10);


// create a div for pagination
const divPagination = document.createElement('div')
divPagination.className = 'pagination';
// create ul
const ul = document.createElement('ul')
//append div pagination
const appendPagination = document.querySelector('.page')
appendPagination.appendChild(divPagination);


// create the page and append it to the pagination

function generatePageLinks(){
    for(let i = 1; i <= numOfPages; i += 1) {
        //create li
        const li = document.createElement('li')
        //create a and set attributes, class, and an iterative target
        const a = document.createElement('a');
        a.setAttribute('href', '#')
        a.textContent = i;
        a.className = 'active'
        // have click point to the right page
        a.addEventListener('click', (e) => { 
            const currentPage = parseInt(e.target.textContent);
            pages(students, currentPage * 10);
         });
         li.appendChild(a);
         ul.appendChild(li);
         
   } 
   divPagination.appendChild(ul);
   
}



////////////////////////////////////
////////    SEARCH BOX      ////////
////////////////////////////////////


// creating divs and classNames for search and no search
let searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
const appendSearch = document.querySelector('.page-header')
let searchInput = document.createElement('input');
let searchButton = document.createElement('button');
let noResultClass = document.createElement('div')
noResultClass.className = 'no-result';

// Function to display search box dynamically
function showSearch() {
    searchDiv.appendChild(noResultClass);
    appendSearch.appendChild(searchDiv);
    searchInput.placeholder = 'Search for students...';
    searchButton.textContent = 'Search';
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);  
}

// Event listener for search box functionality
// Array to hold number of hidden students

const searchResults = [];
searchButton.addEventListener('click', () => {
    let filter = searchInput.value.toLowerCase();
    searchResults.length = 0;
    for (let i = 0; i < eachStudent.length; i++) {
        if (eachStudent[i].innerHTML.indexOf(filter) > -1) {
            eachStudent[i].style.display = '';
            
        } else {
            eachStudent[i].style.display = 'none';
            searchResults.push(i);
        }   
    }

    // If all students are hidden, a 'no results' message is displayed
    let noResults = document.createElement('div');
    noResults.className = 'no-result';
    const appendNoResults = document.querySelector('.no-result');

    if (searchResults.length === eachStudent.length) {
        appendNoResults.appendChild(noResults);
        appendNoResults.innerHTML = '<h1>Sorry, No Results!</h1>';
        appendNoResults.style.color = 'red';
        appendNoResults.style.textAlign = "center";
        appendNoResults.style.fontWeight = "bold";   
    } else {
        appendNoResults.innerHTML = '';
    }
    
});
   

////// Function calls //////

// display pages
pages(students, 10);

// Generate the page links
generatePageLinks();

// search bar
showSearch();


