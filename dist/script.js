import { getGreeting, setTheme } from "./greeting.js";
import { CanvasManager } from "./canvasManager.js";
//vars
var currentMenu;
var menuLinks = document.querySelectorAll('#Navi a');
var sections = document.querySelectorAll('section');
var Proj1 = document.getElementById('sg-mdw');
var Proj2 = document.getElementById('bdf-rh');
var Proj3 = document.getElementById('bdf-webstat');
var Proj4 = document.getElementById('bdf-dirigeant');
var Proj5 = document.getElementById('sg-proxim');
var Measure = document.getElementById('self-express');
var ClosePrj = document.getElementById('BtnClose');
var OverlayPrj = document.getElementById('overlay');
function init() {
    var greetingElement = document.getElementById('hello');
    var canvas = document.getElementById('backgroundCanvas');
    var canvasManager;
    if (greetingElement) {
        greetingElement.textContent = getGreeting();
    }
    var lightThemeLink = document.getElementById('lightThemeLink');
    var darkThemeLink = document.getElementById('darkThemeLink');
    if (canvas) {
        var initialGreeting = getGreeting();
        var initialTimeOfDay = initialGreeting === "Bonjour !" ? "light" : "dark";
        canvasManager = new CanvasManager(canvas, initialTimeOfDay);
    }
    lightThemeLink === null || lightThemeLink === void 0 ? void 0 : lightThemeLink.addEventListener('click', function (e) {
        e.preventDefault();
        setTheme('light');
        canvasManager.reset('light');
    });
    darkThemeLink === null || darkThemeLink === void 0 ? void 0 : darkThemeLink.addEventListener('click', function (e) {
        e.preventDefault();
        setTheme('dark');
        canvasManager.reset('dark');
    });
    ClosePrj.addEventListener('click', function (e) {
        closeProject();
    });
    OverlayPrj.addEventListener('click', function (e) {
        closeProject();
    });
    //Clicks Handler
    Proj1 === null || Proj1 === void 0 ? void 0 : Proj1.addEventListener('click', HandleClick);
    Proj2 === null || Proj2 === void 0 ? void 0 : Proj2.addEventListener('click', HandleClick);
    Proj3 === null || Proj3 === void 0 ? void 0 : Proj3.addEventListener('click', HandleClick);
    Proj4 === null || Proj4 === void 0 ? void 0 : Proj4.addEventListener('click', HandleClick);
    Proj5 === null || Proj5 === void 0 ? void 0 : Proj5.addEventListener('click', HandleClick);
    Measure === null || Measure === void 0 ? void 0 : Measure.addEventListener('click', HandleClick);
}
function HandleClick(e) {
    var target = e.currentTarget;
    var filePath = "".concat(target.id, ".html");
    loadProject(filePath);
}
function loadProject(url) {
    fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (data) {
        var projectContainer = document.getElementById('projectContainer');
        var ContentContainer = document.getElementById('PrjContent');
        var overlay = document.getElementById('overlay');
        if (projectContainer && overlay) {
            ContentContainer.innerHTML = data;
            projectContainer.style.display = 'block';
            overlay.classList.remove('hidden');
            overlay.classList.add('visible');
            // Disable scrolling
            document.body.classList.add('no-scroll');
            projectContainer.offsetWidth;
            projectContainer.classList.add('visible');
            history.pushState(null, '', "?project=".concat(url));
        }
    });
}
function closeProject() {
    var projectContainer = document.getElementById('projectContainer');
    var overlay = document.getElementById('overlay');
    if (projectContainer && overlay) {
        projectContainer.classList.remove('visible');
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');
        // Enable scrolling
        document.body.classList.remove('no-scroll');
        setTimeout(function () {
            projectContainer.style.display = 'none';
            history.replaceState(null, '', window.location.pathname);
        }, 500);
    }
}
function NavigateTo(whereTo) {
    var ScrollTarget = document.getElementById(whereTo);
    if (ScrollTarget) {
        var offset = 80; // Adjust this value as needed
        var rect = ScrollTarget.getBoundingClientRect();
        var targetPosition = rect.top + window.scrollY - offset;
        smoothScroll(targetPosition, 850);
        history.pushState(null, '', "#".concat(whereTo));
        // Update the active link after scrolling
        setTimeout(function () {
            updateActiveLink(whereTo);
        }, 900); // Adjust the timeout duration to match the smooth scroll duration
    }
}
function checkInitialURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var projectParam = urlParams.get('project');
    if (projectParam) {
        loadProject(projectParam);
    }
}
function smoothScroll(targetPosition, duration) {
    var startPosition = window.scrollY;
    var distance = (targetPosition) - startPosition;
    var startTime = null;
    function animation(currentTime) {
        if (startTime === null)
            startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = easeOutQuart(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration)
            requestAnimationFrame(animation);
    }
    // Ease-out function with a quartic curve for smoother transition
    function easeOutQuart(t, b, c, d) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    }
    requestAnimationFrame(animation);
}
function CreateMenu() {
    var BtnApproche = document.getElementById('menu-methode');
    var BtnTravaux = document.getElementById('menu-travaux');
    var BtnExp = document.getElementById('menu-experience');
    var BtnContact = document.getElementById('menu-contact');
    BtnApproche === null || BtnApproche === void 0 ? void 0 : BtnApproche.addEventListener('click', function (e) {
        e.preventDefault();
        NavigateTo("methode");
    });
    BtnTravaux === null || BtnTravaux === void 0 ? void 0 : BtnTravaux.addEventListener('click', function (e) {
        e.preventDefault();
        NavigateTo("travaux");
    });
    BtnExp === null || BtnExp === void 0 ? void 0 : BtnExp.addEventListener('click', function (e) {
        e.preventDefault();
        NavigateTo("exp");
    });
    BtnContact === null || BtnContact === void 0 ? void 0 : BtnContact.addEventListener('click', function (e) {
        e.preventDefault();
        NavigateTo("contact");
    });
}
function handleScroll() {
    var currentSectionId = '';
    sections.forEach(function (section) {
        var sectionRect = section.getBoundingClientRect();
        var sectionTop = sectionRect.top + window.scrollY;
        var sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 80 && window.scrollY < sectionTop + sectionHeight - 80) {
            currentSectionId = section.id;
        }
    });
    updateActiveLink(currentSectionId);
}
function updateActiveLink(currentSectionId) {
    menuLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === "#".concat(currentSectionId)) {
            link.classList.add('active');
        }
    });
}
// Document events
document.addEventListener('DOMContentLoaded', function () {
    init();
    CreateMenu();
    handleScroll();
    checkInitialURL();
});
window.addEventListener('scroll', function () {
    var nav = document.getElementById('Navi');
    var threshold = document.getElementById('threshold');
    if (nav && threshold) {
        var thresholdRect = threshold.getBoundingClientRect();
        var navRect = nav.getBoundingClientRect();
        if (thresholdRect.top <= 80) {
            var offsetTop = navRect.top + window.scrollY;
            var offsetRight = document.body.clientWidth - navRect.right;
            nav.classList.add('fixed');
            nav.classList.remove('nav');
            nav.style.right = "".concat(offsetRight, "px");
        }
        else {
            nav.classList.remove('fixed');
            nav.classList.add('nav');
            nav.style.right = "0px";
        }
    }
    handleScroll();
});
