//----------------------------------Navigation-----------------------------
const navBtn = document.getElementById("nav-button");
const navLinks = document.getElementById("nav-link-container");

navBtn.onclick = function () {
  navLinks.classList.toggle("active");
};
//----------------------------------Overlay Effects-----------------------------
const aboutOverlayBtn = document.getElementById("about-overlay-toggle");
const aboutOverlay = document.getElementById("about-overlay");
const aboutCloseBtn = document.getElementById("about-overlay-close-button");

aboutOverlayBtn.onclick = function () {
  aboutOverlay.classList.toggle("active");
  navLinks.classList.toggle("active");
};

aboutCloseBtn.onclick = function () {
  aboutOverlay.classList.toggle("active");
};
//----------------------------------Current Date-----------------------------
const dateResult = document.getElementById("date-result");
const date = new Date();
const weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${weekDay[date.getDay()]} ${day}/${month}/${year}`;
dateResult.innerHTML = `<p>${currentDate}</p>`;
//---------------------------declare our settings---------------------------
const apiKey = "&apiKey=9129238b16e8447898d8fe188a66f970";
const endPointURL = "https://newsapi.org/v2/top-headlines";

//----------------------------declare our elements------------------------
const result = document.getElementById("result");
const searchInput = document.getElementById("search-terms");
const countryInput = document.getElementById("country-input");
const categoryInput = document.getElementById("category-input");
const goBtn = document.getElementById("go-button");

//----------------------------showing articles------------------------------
let showArticles = (articles) => {
  result.innerHTML = "";
  //this function rendrs the image on the page
  let renderArticle = (item, index) => {
    // console.log(item.urlToImage);
    let checkUrlImage = () => {
      if (item.urlToImage == null) {
        return "https://cdn.pixabay.com/photo/2014/05/21/22/28/old-newspaper-350376_1280.jpg";
      } else {
        return item.urlToImage;
      }
    };
    result.innerHTML += `
    <div class="image-box">
      <img src="${checkUrlImage()}" onError="this.onerror=null;this.src='https://cdn.pixabay.com/photo/2014/05/21/22/28/old-newspaper-350376_1280.jpg';"/>
      <p>${item.title}</p>
    </div>
    `;
  };
  //this function loops through our images and runs render
  //image for each one
  articles.forEach(renderArticle);
};

$.ajax({
  type: "GET",
  url: endPointURL + "?language=en" + apiKey,
  success: (data) => {
    console.log(data.articles);
    showArticles(data.articles);
  },
  error: function (error) {
    console.log(error);
    console.log("theres an error");
  },
});

//--------------------------Search function On click------------------------

goBtn.onclick = () => {
  searchString = searchInput.value;
  category = categoryInput.value;
  country = countryInput.value;
  // console.log(searchString);

  $.ajax({
    type: "GET",
    url:
      endPointURL +
      "?q=" +
      searchString +
      category +
      country +
      // "&pageSize=20" +
      apiKey,
    success: (data) => {
      console.log(data.articles);
      showArticles(data.articles);
    },
    error: function (error) {
      console.log(error);
      console.log("theres an error");
    },
  });
};

searchInput.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    goBtn.click();
  }
});
