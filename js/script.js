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
const sortInput = document.getElementById("sort-input");
const goBtn = document.getElementById("go-button");

//----------------------------showing images------------------------------
let showArticles = (articles) => {
  result.innerHTML = "";
  //this function rendrs the image on the page
  let renderArticle = (item, index) => {
    let checkIfImageExists = () => {
      if (item.urlToImage == "") {
        return "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg";
      } else {
        return item.userImageURL;
      }
    };
    // console.log(item.urlToImage);
    result.innerHTML += `
    <div class="image-box">
      <img src="${item.urlToImage}">
      <p>${item.title}</p>
      <div class="user-container">
        <img class="user-img" src="${checkIfImageExists()}">
      </div>
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
  sortValue = sortInput.value;
  imageTypeValue = imageTypeInput.value;
  colorValue = colorInput.value;
  // console.log(searchString);
  $.ajax({
    type: "GET",
    url:
      endPointURL +
      apiKey +
      "&q=" +
      searchString +
      sortValue +
      imageTypeValue +
      colorValue,
    success: (data) => {
      console.log(data.hits);
      showImages(data.hits);
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
