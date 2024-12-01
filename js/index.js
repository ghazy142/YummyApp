let rowData=document.getElementById("rowData");
let searchContainer=document.getElementById("searchContainer");

$(document).ready(()=>{
  searchByName("").then(()=>{
      $(".loader").fadeOut(500)
      $("body").css("overflow","visible");  
    })

})


closeSideNav()
function openSideNav(){
    $(".side-nav-menu").animate({left:0},500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");

    for(let i =0 ; i <5 ; i++){
        $(".linkes li").eq(i).animate({top:0},(i+5)*100)
    }

    // $(".linkes li").eq(0).animate({top:0},500)
    // $(".linkes li").eq(1).animate({top:0},600)
    // $(".linkes li").eq(2).animate({top:0},700)
    // $(".linkes li").eq(3).animate({top:0},800)
    // $(".linkes li").eq(4).animate({top:0},900)

} 
function closeSideNav(){
    let boxwidth= $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({left:-boxwidth},500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".linkes li").animate({top:300},500)
}
$(".side-nav-menu i.open-close-icon").click(() => {


    if( $(".side-nav-menu").css("left")== "0px"){
        closeSideNav()

    }else{
        openSideNav();
    }

   } )  

async function displayMeals(arr){
let cartona="";
for(let i=0; i<arr.length; i++){
    cartona+=`
    <div class="col-md-3 p-1">
      <div onclick="getMealsDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="">
        <div class="meal-layer position-absolute d-flex align-items-center">
          <h3>${arr[i].strMeal}</h3>
        </div>
      </div>
    </div>`
}
rowData.innerHTML=cartona;

}
searchByName("");

async function getCategrioes(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    console.log(response);
    displayCategrioes(response.categories)
}
async function displayCategrioes(arr) {
    let cartona ="";
    for(let i=0 ; i<arr.length ; i++){
        cartona+=`<div class="col-md-3 p-1">
      <div onclick="getCategoryMeals('${arr[i].strCategory }')" class="meal position-relative overflow-hidden">
        <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                 <h3>${arr[i].strCategory }</h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0,25).join(" ")}</p>
             </div>
      </div>
    </div>`
    }
    rowData.innerHTML=cartona;
}

async function getArea(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    console.log(response);
    displayArea(response.meals)
}
async function displayArea(arr) {
    let cartona ="";
    for(let i=0 ; i<arr.length ; i++){
        cartona+=`<div class="col-md-3 p-1">
      <div onclick="getAreaMeals('${arr[i].strArea }')">

            <div>
            <i class="fa-solid fa-house fa-2x"></i>
                 <h3>${arr[i].strArea }</h3>
                
             </div>
      </div>
    </div>`
    }
    rowData.innerHTML=cartona;
}

async function getIngreadintes(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    console.log(response);
    displayIngreadintes(response.meals)
}
async function displayIngreadintes(arr) {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        const description = arr[i].strDescription 
            ? arr[i].strDescription.split(" ").slice(0, 15).join(" ") 
            : "Description not available"; // Fallback for missing descriptions
        
        cartona += `<div class="col-md-3 p-1">
            <div onclick="getIngredaintsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center">
                <i class="fa-solid fa-house fa-2x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <h5>${description}</h5>
            </div>
        </div>`;
    }
    rowData.innerHTML = cartona;
}

async function getCategoryMeals(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}
`);
    response = await response.json();
    console.log(response);
    displayCategoryMeals(response.meals)
}
async function displayCategoryMeals(arr) {
    let cartona ="";
    for(let i=0 ; i<arr.length ; i++){
        cartona+=`<div class="col-md-3 p-1">
      <div class="meal position-relative overflow-hidden">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                 <h3>${arr[i].strMeal }</h3>
                <p>${arr[i].idMeal}</p>
             </div>
      </div>
    </div>`
    }
    rowData.innerHTML=cartona;
}

async function getAreaMeals(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`);
    response = await response.json();
    console.log(response);
    displayAreaMeals(response.meals)
}
async function displayAreaMeals(arr) {
    let cartona ="";
    for(let i=0 ; i<arr.length ; i++){
        cartona+=`<div class="col-md-3 p-1">
      <div  class="meal position-relative overflow-hidden">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                 <h3>${arr[i].strMeal }</h3>
                
             </div>
      </div>
    </div>`
    }
    rowData.innerHTML=cartona;

}

async function getIngredaintsMeals(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
    response = await response.json();
    console.log(response);
    displayAreaMeals(response.meals)
}
async function displayIngredaintsMeals(arr) {
    let cartona ="";
    for(let i=0 ; i<arr.length ; i++){
        cartona+=`<div class="col-md-3 p-1">
      <div  class="meal position-relative overflow-hidden">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                 <h3>${arr[i].strMeal }</h3>
                
             </div>
      </div>
    </div>`
    }
    rowData.innerHTML=cartona;

}

async function getMealsDetails(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${term}`);
    response = await response.json();
    console.log(response);
    displayMealsDetails(response.meals)
}
async function displayMealsDetails(arr){
//         let ingrediants=``;
//         for(let i=1; i<=20; i++){
//             if(meal[`strIngredient${i}`]){
//                 ingrediants+=`<li class="alert alert-info p-2 m-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]} </li>
// `;
//             }
//             console.log(ingrediants)
//         }




    let cartona="";
    for(let i=0; i<arr.length; i++){
        cartona+=`
         <div class="container">
  <div class="row py-4 g-4">
    <div class="col-md-4">
      <img class="w-100" src="${arr[i].strMealThumb}" alt="">
      <h2>${arr[i].strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h2> ${arr[i].strCategory}</h2>
      <p> ${arr[i].strInstructions}</p>
      <h3><span class="fw-bolder"> Area:</span>  ${arr[i].strArea} </h3>
      <h3><span class="fw-bolder"> Category:</span>  ${arr[i].strCategory} </h3>
      <h3>Recepies</h3>
      <ul class="list-unstyled d-flex p-2 m-1">
        <li class="alert alert-info p-2 m-1">
         ${arr[i].strIngredient1} 
        </li>
        <li class="alert alert-info p-2 m-1">
         ${arr[i].strIngredient2} 
        </li>
        <li class="alert alert-info p-2 m-1">
         ${arr[i].strIngredient3} 
        </li>
        <li class="alert alert-info p-2 m-1">
         ${arr[i].strIngredient4} 
        </li>
      </ul>
      <h3>Tags :</h3>
      <ul class="list-unstyled d-flex p-2 m-1">
        <li class="alert alert-danger p-2 m-1">
         ${arr[i].strTags} 
        </li>
      </ul>
        <a target="_blank" href="${arr[i].strSource}" class="btn btn-success m-1">Source</a>
        <a target="_blank" href="${arr[i].strYoutube}" class="btn btn-danger m-1">YouTube</a>

    </div>
  </div>
 </div>`
    }
    rowData.innerHTML=cartona;
    
    }

function search(){
    cartona = ``;
    cartona+=`
  <div class="row py-4 ">
    <div class="col-md-6">
      <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search by name">
    </div>
    <div class="col-md-6">
      <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search by first letter">
    </div>
  </div>

</div>`
searchContainer.innerHTML=cartona;
rowData.innerHTML="";
} 
async function searchByName(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();

    console.log(response.meals);
   response.meals? displayMeals(response.meals) : displayMeals([])
}
async function searchByFirstLetter(term) {
    term=="" ? term="a" :"";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();

    console.log(response.meals);
   response.meals? displayMeals(response.meals) : displayMeals([])
}
function contact(){
     cartona =``;
     cartona+=`
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="cantainer w-50">
    <div class="row g-4">
      <div class="col-md-6">
        <input type="text" class="form-control" placeholder="Enter your name">
      </div>
      <div class="col-md-6">
        <input type="email" class="form-control" placeholder="Enter your Email">
      </div>
      <div class="col-md-6">
        <input type="number" class="form-control" placeholder="Enter your Phone">
      </div>
      <div class="col-md-6">
        <input type="number" class="form-control" placeholder="Enter your Age">
      </div>
      <div class="col-md-6">
        <input type="password" class="form-control" placeholder="Enter your Password">
      </div>
      <div class="col-md-6">
        <input type="password" class="form-control" placeholder="Enter your Repassword">
      </div>
    </div>
    <button disabled type="submit" class="btn m-3 bg-white text-black">Submit</button>
  </div>

</div>`
rowData.innerHTML=cartona;
}

