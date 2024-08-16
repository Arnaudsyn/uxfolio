var particleColor;
var defaultLineColor;
var highlightedLineColor;
var Particle = /** @class */ (function () {
    function Particle(canvas, x, y, size, speedX, speedY) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    Particle.initializeParticles = function (canvas, numParticles, TOD) {
        if (TOD == "light") {
            particleColor = 'rgba(236, 225, 215, 1)';
            defaultLineColor = 'rgba(0, 0, 0, 0.03)';
            highlightedLineColor = 'rgba(255, 179, 180, 0.4)';
        }
        else if (TOD == "dark") {
            particleColor = 'rgba(255, 255, 255, 0.2)';
            defaultLineColor = 'rgba(181, 181, 181, 0.02)';
            highlightedLineColor = 'rgba(227, 122, 122, 0.3)';
        }
        var particlesArray = [];
        for (var i = 0; i < numParticles; i++) {
            var size = Math.random() * 3 + 1;
            var x = Math.random() * (canvas.width - size * 2) + size;
            var y = Math.random() * (canvas.height - size * 2) + size;
            var speedX = Math.random() * 0.5 - 0.25;
            var speedY = Math.random() * 0.5 - 0.25;
            particlesArray.push(new Particle(canvas, x, y, size, speedX, speedY));
        }
        return particlesArray;
    };
    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x + this.size > this.canvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.size > this.canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = particleColor;
        this.ctx.fill();
    };
    Particle.prototype.connect = function (particles) {
        var _this = this;
        var connections = 0;
        particles.forEach(function (particle) {
            var distance = Math.sqrt(Math.pow((_this.x - particle.x), 2) + Math.pow((_this.y - particle.y), 2));
            if (distance < 100) {
                connections++;
                _this.ctx.beginPath();
                _this.ctx.strokeStyle = connections >= 5 ? highlightedLineColor : defaultLineColor;
                _this.ctx.lineWidth = 0.8;
                _this.ctx.moveTo(_this.x, _this.y);
                _this.ctx.lineTo(particle.x, particle.y);
                _this.ctx.stroke();
                _this.ctx.closePath();
            }
        });
    };
    return Particle;
}());
export { Particle };
