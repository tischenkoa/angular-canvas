'use strict';

module.exports = function circleToCircleFactory () {
	return {
		init: function (height, width) {

			this.canvas = document.getElementById("canvas-c2c");
			this.height = this.canvas.offsetHeight;
			this.width = this.canvas.offsetWidth;
			this.centerX = this.height / 2;
			this.centerY = this.width / 2;
			this.radiusOutCircle = 250;
			this.lineWidthOutCircle = 5;
			this.radiusInCircle = 40;

			if (this.canvas.getContext) {
				this.context = this.canvas.getContext("2d");
				this.canvas.onmousemove = this.dragCircle.bind(this);
				//this.canvas.onmousemove = this.pushCircle.bind(this);
				this.draw(this.centerX, this.centerY);
			}
		},

		draw: function (positionInCircleX, positionInCircleY) {
			this._a = this.centerX - positionInCircleX;
			this._b = this.centerY - positionInCircleY;
			this._distanceFromCenter = Math.sqrt(Math.pow(this._a, 2) + Math.pow(this._b, 2));

			if (this._distanceFromCenter < this.radiusOutCircle - this.radiusInCircle - this.lineWidthOutCircle / 2) {
				//clear
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

				// draw outCircle
				this.context.beginPath();
				this.context.arc(this.centerX, this.centerY, this.radiusOutCircle, 0, 2 * Math.PI, false);
				this.context.lineWidth = this.lineWidthOutCircle;
				this.context.strokeStyle = '#34648e';
				this.context.stroke();

				//	draw inCircle
				this.context.beginPath();
				this.context.arc(positionInCircleX, positionInCircleY, this.radiusInCircle, 0, 2 * Math.PI, false);
				this.context.fillStyle = '#0294bf';
				this.context.fill();
			}
		},

		dragCircle: function (event) {
			this._mouseX = event.pageX - this.canvas.offsetLeft;
			this._mouseY = event.pageY - this.canvas.offsetTop;
			this.draw(this._mouseX, this._mouseY);
		},
/*		pushCircle: function (event) {
		}*/
	}
};