var ParticuleNumber = 7000;
var TimeOfDaySet;
import { Particle } from './particle.js';
var CanvasManager = /** @class */ (function () {
    function CanvasManager(canvas, TOD) {
        this.particlesArray = [];
        this.animationFrameId = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.backgroundColor = TOD === 'dark' ? '#1F1616' : '#FFF8F1';
        this.resizeListener = this.handleResize.bind(this);
        this.reset(TOD);
        window.addEventListener('resize', this.resizeListener);
    }
    CanvasManager.prototype.reset = function (TOD) {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.backgroundColor = TOD === 'dark' ? '#1F1616' : '#FFF8F1';
        this.clearCanvas();
        this.resizeCanvas();
        this.initParticles(TOD);
        this.animateParticles();
    };
    CanvasManager.prototype.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particlesArray = [];
    };
    CanvasManager.prototype.resizeCanvas = function () {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    };
    CanvasManager.prototype.initParticles = function (TOD) {
        var area = this.canvas.width * this.canvas.height;
        var numParticles = Math.floor(area / ParticuleNumber); // Adjust the divisor to control density
        TimeOfDaySet = TOD;
        this.particlesArray = Particle.initializeParticles(this.canvas, numParticles, TOD);
    };
    CanvasManager.prototype.animateParticles = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Fill canvas with background color
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.particlesArray.forEach(function (particle) {
            particle.update();
            particle.draw();
            particle.connect(_this.particlesArray);
        });
        this.animationFrameId = requestAnimationFrame(this.animateParticles.bind(this));
    };
    CanvasManager.prototype.handleResize = function () {
        this.reset(TimeOfDaySet);
    };
    return CanvasManager;
}());
export { CanvasManager };
