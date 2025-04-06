const topnav = document.querySelector(".navbar");
const subnav = document.querySelector(".subnav");

function updateSubnavHeight(){
 const rect = topnav.getBoundingClientRect();

 if (rect.bottom <= 0){
  subnav.style.height = "100vh";
 } else{
  subnav.style.height ="calc(100vh -77px)";
 }
}

window.addEventListener("scroll", updateSubnavHeight);
window.addEventListener("load", updateSubnavHeight);