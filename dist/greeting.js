import { CanvasManager } from "./canvasManager.js";
export function getGreeting() {
    var canvas = document.getElementById('backgroundCanvas');
    var now = new Date();
    var hour = now.getHours();
    var body = document.body;
    var greeting;
    var TimeOfDay;
    if (hour < 5 || hour >= 18) {
        greeting = "Bonsoir !"; // Early morning and evening
        TimeOfDay = "dark";
        setTheme("dark");
    }
    else {
        greeting = "Bonjour !"; // Day
        TimeOfDay = "light";
        setTheme("light");
    }
    document.addEventListener('DOMContentLoaded', function () {
        var canvasManager;
        var lightThemeLink = document.getElementById('lightThemeLink');
        var darkThemeLink = document.getElementById('darkThemeLink');
        lightThemeLink === null || lightThemeLink === void 0 ? void 0 : lightThemeLink.addEventListener('click', function (e) {
            e.preventDefault();
            setTheme('light');
        });
        darkThemeLink === null || darkThemeLink === void 0 ? void 0 : darkThemeLink.addEventListener('click', function (e) {
            e.preventDefault();
            setTheme('dark');
        });
    });
    if (canvas) {
        new CanvasManager(canvas, TimeOfDay);
    }
    return greeting;
}
export function setTheme(theme) {
    var body = document.body;
    var canvas = document.getElementById('backgroundCanvas');
    var BtnLight = document.getElementById('lightThemeLink');
    var BtnDark = document.getElementById('darkThemeLink');
    if (theme === "dark") {
        body.classList.add('darkTheme');
        body.classList.remove('liteTheme');
        BtnDark.classList.add('lnk-active');
        BtnLight.classList.remove('lnk-active');
    }
    else {
        body.classList.add('liteTheme');
        body.classList.remove('darkTheme');
        BtnLight.classList.add('lnk-active');
        BtnDark.classList.remove('lnk-active');
    }
}
