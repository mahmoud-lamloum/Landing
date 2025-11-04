// chick if ther's local storage color option
let maincolor = localStorage.getItem("color-option");
if (maincolor !== null) {
    document.documentElement.style.setProperty('--main-color', maincolor);
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === maincolor) {
            element.classList.add("active");
        }
    });
};
// toogle spin class on icon
document.querySelector(".toogle-container .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
};
//switch colors 
const colorsli = document.querySelectorAll(".colors-list li");
colorsli.forEach(li => {
    li.addEventListener("click", (e) => {
        // set color in root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // set color in local storage
        localStorage.setItem('color-option', e.target.dataset.color);
        // remove active clacc from all li
        handleActive(e);
    });
});
let backgroundoption = true;
let backgroundinterval;

// check localStorage for saved preference
let backgroundlocalstorage = localStorage.getItem("background_option");

if (backgroundlocalstorage !== null) {
    backgroundoption = backgroundlocalstorage === 'true';

    // remove active from all
    document.querySelectorAll(".option-box span").forEach(el => {
        el.classList.remove("active");
    });

    if (backgroundoption) {
        document.querySelector(".option-box .yes").classList.add("active");
    } else {
        document.querySelector(".option-box .no").classList.add("active");
    }
}

// handle click on random background options
const randbackground = document.querySelectorAll(".option-box span");

randbackground.forEach(span => {
    span.addEventListener("click", (e) => {
        handleActive(e);

        if (e.target.dataset.background === "yes") {
            backgroundoption = true;
            randomizeimgs();
            localStorage.setItem("background_option", "true");
        } else {
            backgroundoption = false;
            clearInterval(backgroundinterval);
            localStorage.setItem("background_option", "false");
        }
    });
});
const lilink = document.querySelectorAll(".header-area .links li a");
lilink.forEach(lii => {
    lii.addEventListener("click", ee => {
        lilink.forEach(l =>
            l.classList.remove("activee"));
        ee.target.classList.add("activee");
    })
})
// select landing page element
let landingpage = document.querySelector(".landing-page");
// Get Array of imgs
let imgsArray = ["02.ipg.jpg", "03.ipg.jpg", "05.ipg.jpg", "06.ipg.jpg"];
landingpage.style.backgroundImage = 'url("imgs/03.ipg.jpg")';
function randomizeimgs() {
    if (backgroundoption === true) {
        backgroundinterval = setInterval(() => {
            //  get random background
            let randomNum = Math.floor(Math.random() * imgsArray.length);
            landingpage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNum] + '")';
        }, 10000)
    }
}
randomizeimgs();
// select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    // skills ffsetTop
    let skillsOffsetTop = ourSkills.offsetTop;
    // skills outer height 
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window height
    let windowHeight = this.innerHeight;
    // window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};
// create popup with the image
let ourImages = document.querySelectorAll(".images-box img");
ourImages.forEach(image => {
    image.addEventListener("click", (e) => {
        // create over lay element
        let overLay = document.createElement("div");
        overLay.className = "popup-overlay";
        //append overlay to body
        document.body.appendChild(overLay);
        // create popup 
        let popupBox = document.createElement("div");
        popupBox.className = "popupBox";
        if (image.alt !== null) {
            // create headind
            let imgHeading = document.createElement("h3");
            // create text 
            let inageText = document.createTextNode(image.alt);
            imgHeading.appendChild(inageText);
            // appent heading to popup box
            popupBox.appendChild(imgHeading);
        }
        // create image
        let popupimage = document.createElement("img");
        // set image src 
        popupimage.src = image.src;

        popupimage.style.maxHeight = "500px";
        // add image to popup box
        popupBox.appendChild(popupimage);
        // dd popup to overlay
        document.body.appendChild(popupBox);
        // create close span
        let closeButton = document.createElement("span");
        closeButton.className = "close-Button";
        let buttonText = document.createTextNode("X");
        closeButton.appendChild(buttonText);
        // add close button to popup box 
        popupBox.appendChild(closeButton);
    });
});
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-Button') {
        // remove the current popup
        e.target.parentElement.remove();
        // remove te over lay
        document.querySelector('.popup-overlay').remove();
    }
})
// select all bullets
let bullets = document.querySelectorAll(".nav-bulet .bullet");
function scrollIntoView(elements) {
    elements.forEach(bullet => {
        bullet.addEventListener("click", (e) => {
            document.querySelector(e.target.dataset.ssection).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// select all links
let links = document.querySelectorAll(" .links a");
function scrollIntoView(elements) {
    elements.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.ssection).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
scrollIntoView(links);
scrollIntoView(bullets);
function handleActive(e) {
    e.target.parentElement.querySelectorAll(".active").forEach(ele => {
        ele.classList.remove("active");
    });
    // add active class on target 
    e.target.classList.add("active");
}
let bulletLocalstorage = localStorage.getItem("Bullets-Option");
let bulletsSpan = document.querySelectorAll(".Bullets-Option span");
let bulletContainer = document.querySelector(".nav-bulet");
if (bulletLocalstorage !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalstorage === 'block') {
        bulletContainer.style.display = 'block';
        document.querySelector(".Bullets-Option .yes").classList.add("active");
    } else {
        bulletContainer.style.display = 'none';
        document.querySelector(".Bullets-Option .no").classList.add("active");
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (e.target.dataset.display === "show") {
            bulletContainer.style.display = 'block';
            localStorage.setItem("Bullets-Option", 'block');
        } else {
            bulletContainer.style.display = 'none';
            localStorage.setItem("Bullets-Option", 'none');
        }
        handleActive(e);
    })
})
// reset button
document.querySelector(".reset-option").onclick = function () {
    localStorage.clear();
    // localStorage.removeItem("Bullets-Option");
    // localStorage.removeItem("color-option");
    // localStorage.removeItem("background_option");
    window.location.reload();
}
// toogle menue
let bttoogle = document.querySelector(".toogle-menue");
let tlinks = document.querySelector(".links");
bttoogle.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tlinks.classList.toggle("open");
};
// click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
    if (e.target !== bttoogle && e.target !== tlinks) {
        if (tlinks.classList.contains("open")) {
            bttoogle.classList.toggle("menu-active");
            tlinks.classList.toggle("open");
        }
    }
})
tlinks.onclick = function (e) {
    e.stopPropagation();
}