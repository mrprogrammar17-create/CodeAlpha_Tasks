let images = document.querySelectorAll(".gallery img");
let current = 0;

/* OPEN LIGHTBOX */
function openLightbox(index){
  current = index;
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = images[current].src;
}

/* CLOSE LIGHTBOX */
function closeLightbox(){
  document.getElementById("lightbox").style.display = "none";
}

/* FILTER */
function filterImages(category){
  images.forEach(img=>{
    img.style.display =
      (category === "all" || img.classList.contains(category))
      ? "block"
      : "none";
  });
}

/* SCROLL ANIMATION */
function revealOnScroll(){
  let reveals = document.querySelectorAll(".reveal");

  reveals.forEach(el=>{
    let windowHeight = window.innerHeight;
    let elementTop = el.getBoundingClientRect().top;

    if(elementTop < windowHeight - 100){
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);