export default class PlotitLayer {
  constructor(canvas, id) {
    this.canvas = canvas;
    this.id = id;
    this.layer = this.new(id);
  }

  new(id) {
    var canvas = this.canvas,
      width = canvas.width,
      height = canvas.height,
      top = canvas.style.top,
      left = canvas.style.left;

    var newCanvas = document.createElement('canvas');

    newCanvas.id = id;
    newCanvas.width = width;
    newCanvas.height = height;
    newCanvas.style.position = 'absolute';
    newCanvas.style.top = top;
    newCanvas.style.left = left;

    return newCanvas;
  }

  clear() {
    if (document.querySelector('#' + this.id)) {
      var $frame = document.querySelector('#' + this.id),
          parent = $frame.parentNode;
      parent.removeChild($frame);
    }
  }

   // append to the panel
  addFrame(scale) {

    this.clear();

    var originW = this.layer.width,
        originH = this.layer.height,
        layerStyle = this.layer.style,
        originT = parseFloat(layerStyle.top.replace('px', '')),
        originL = parseFloat(layerStyle.left.replace('px', ''));

    switch(scale.name) {
      case '1:1':
      case '4:3':
      case '3:4':
        var x = scale.x,
            y = scale.y,
            wh = originW / originH,
            s = x / y,
            min;

        if (wh < s) {
          this.layer.width = originW;
          this.layer.height = originW / x * y;
        } else if (wh > s) {
          this.layer.height = originH;
          this.layer.width = originH / y * x;
        } else {
          var min = originW < originH ? originW : originH;
          this.layer.width = min;
          this.layer.height = min;
        }
      break;

      case '自定义':
      default:
      break;
    }

    layerStyle.top = originT + (originH - this.layer.height) / 2 + 'px';
    layerStyle.left = originL + (originW - this.layer.width) / 2 + 'px';

    this.drawFrameLine(this.layer);

    this.canvas.parentNode.appendChild(this.layer);
  }


  drawFrameLine(canvas) {
    var cxt = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height;

    cxt.strokeStyle = 'rgba(255, 255, 255, .5)';
    cxt.lineWidth = 1;
    cxt.strokeRect(0, h / 3, w, h / 3);
    cxt.strokeRect(w / 3, 0, w / 3, h);

    cxt.strokeStyle = '#FFF';
    cxt.lineWidth = 5;
    cxt.strokeRect(0 , 0, w, h);

    var rW = 10;
    cxt.fillStyle = '#FFF';
    cxt.fillRect(0, 0, rW, rW);
    cxt.fillRect(w - rW, 0, rW, rW);
    cxt.fillRect(w - rW, h - rW, rW, rW);
    cxt.fillRect(0, h - rW, rW, rW);
  }

}
 