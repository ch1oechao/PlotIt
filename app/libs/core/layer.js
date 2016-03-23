export default class PlotitLayer {
  constructor(canvas) {
    this.canvas = canvas,
    this.layer = this.new();
  }

  new() {
    var canvas = this.canvas,
        width = canvas.width,
        height = canvas.height,
        top = canvas.style.top,
        left = canvas.style.left,
        parent = canvas.parentNode;

    var newCanvas = document.createElement('canvas');

    newCanvas.id = 'newCanvas';
    newCanvas.width = width;
    newCanvas.height = height;
    newCanvas.style.position = 'absolute';
    newCanvas.style.top = top;
    newCanvas.style.left = left;

    // parent.appendChild(newCanvas);

    return newCanvas;

  }

}
 