//Drop Item
const handleDropItem = () => {
  let plusBtn = document.querySelectorAll(".skills__text");
  let a = document.querySelector(".skills__box");

  plusBtn.forEach((p) => {
    p.addEventListener("click", () => {
      let dropText = p.nextElementSibling;

      if (dropText.style.maxHeight) {
        document
          .querySelectorAll(".skill__text--drop")
          .forEach((p) => (p.style.maxHeight = null));
        p.classList.remove("drop-active");
      } else {
        document
          .querySelectorAll(".skill__text--drop")
          .forEach((p) => (p.style.maxHeight = null));
        document
          .querySelectorAll(".skills__text")
          .forEach((p) => p.classList.remove("drop-active"));
        dropText.style.maxHeight = dropText.scrollHeight + "px";
        p.classList.add("drop-active");
      }
    });
  });
};

handleDropItem();

//Slider Projects

const arrowRight = document.querySelector(".btnRight");
let start = 0;

let data = document.querySelectorAll(".sliders-item");
console.log(data.length.width);

const swipeSlider = () => {
  if (screen.width > 1180) {
    start += -630;
    document.querySelector(".slider-line").style.marginLeft = start + "px";

    if (start <= -1890) {
      start = 0;
    }
    document.querySelector(".slider-line").style.marginLeft = start + "px";
  } else {
    start += -920;
    document.querySelector(".slider-line").style.marginLeft = start + "px";
    if (start <= -3680) {
      start = 0;
    }
    document.querySelector(".slider-line").style.marginLeft = start + "px";
  }
};

arrowRight.onclick = swipeSlider;

//Create Progress Line

const inputRange = document.querySelector(".form__input--range");
const showValue = document.querySelector(".form__field-holder-value");

const showProgressLine = () => {
  let percent = (inputRange.value / inputRange.max) * 100;

  if (parseInt(inputRange.value) >= 25000) {
    document
      .querySelector(".form__field-holder-span")
      .classList.remove("hide-span");
  } else {
    document
      .querySelector(".form__field-holder-span")
      .classList.add("hide-span");
  }

  showValue.textContent = "$" + inputRange.value;
  inputRange.style.height = "2px";
  inputRange.style.background = `linear-gradient(to right, rgba(255, 255, 255, 1) ${percent}% , rgba(255, 255, 255, 0.4) ${0}%)`;
};

inputRange.oninput = showProgressLine;

// Smooth anchor to top level

document.querySelector(".up__anchor").onclick = function (e) {
  e.preventDefault();

  const id = this.getAttribute("href");

  document.querySelector("" + id).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

//onScroll fixed header
const firstDiv = document.querySelector(".header");
const nav = document.querySelector(".nav");
const headerTop = document.querySelector(".header-top");

window.onscroll = () => {
  if (window.scrollY >= firstDiv.offsetHeight) {
    nav.classList.add("fixed-header");
  }

  if (window.scrollY < firstDiv.offsetHeight) {
    nav.classList.remove("fixed-header");
  }
};

// Dynamic menu items under line
const navItem = document.querySelectorAll(".menu__item");
const navLine = document.querySelector(".nav-wrap__line");

if (window.screen.width > 960) {
  navLine.style.width = navItem[0].offsetWidth + "px";

  navItem.forEach((el) => {
    el.onmouseenter = (e) => {
      navLine.style.left = e.currentTarget.offsetLeft + "px";
      navLine.style.width = e.currentTarget.offsetWidth + "px";
    };

    el.onmouseleave = (e) => {
      navLine.style.left = 0;
      navLine.style.width = navItem[0].offsetWidth + "px";
    };
  });
} else {
  navLine.style.display = "none";
}
const sendForm = (e) => {
  e.preventDefault();
  const status = formValidate();
  if(status ===0){
    alert ('go-go')
  }else{
    alert('заполните поля');
  }
};


const formValidate = () =>{

  let statusNum = 0;
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    formRemoveError(input);

    if(input.classList.contains('form__input--email')){
      if(validateEmail(input.value)){
        formAddError(input)
        statusNum++
      }
      
    }else if (input.classList.contains("form__input--range") && input.value <1250 || input.value > 25000 ){
      statusNum++

    }else{
      if(input.value === ""){
        formAddError(input)
        statusNum++

      }
    }  
    
  }

  return statusNum;
}
const formAddError = (input) => {
  input.classList.add("_error");
};

const formRemoveError = (input) => {
  input.classList.remove("_error");
};

function validateEmail(value) {
  return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(value);
}

document.querySelector(".form").onsubmit = sendForm;
