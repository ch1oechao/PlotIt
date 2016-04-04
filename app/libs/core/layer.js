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
    if (!document.querySelector('#' + this.id)) return;

    var $frame = document.querySelector('#' + this.id),
        $overlay = document.querySelector('#overlay'),
        parent = $frame.parentNode;

    parent.removeChild($frame);

    if ($overlay) {
      parent.removeChild($overlay);
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


    this.drawCropImage(this.layer, {
      originW: originW,
      originH: originH,
      cropW: this.layer.width,
      cropH: this.layer.height
    });
    
    this.drawFrameLine(this.layer);
    
    this.addOverlay(originW, originH);
    
    this.canvas.parentNode.appendChild(this.layer);
  
    return {
      layer: this.layer,
      originW: originW,
      originH: originH,
      cropW: this.layer.width,
      cropH: this.layer.height
    };
  }

  drawCropImage(canvas, opts) {
    var cropCxt = canvas.getContext('2d'),
        originCtx = this.canvas.getContext('2d'),
        x = (opts.originW - opts.cropW) / 2,
        y = (opts.originH - opts.cropH) / 2;

    var originImageData = originCtx.getImageData(x, y, opts.originW, opts.originH);

    cropCxt.clearRect(0, 0, opts.cropW, opts.cropH);
    cropCxt.putImageData(originImageData, 0, 0);
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

  addOverlay(w, h) {

    if (document.querySelector('#overlay')) return;

    this.overlay = this.new('overlay');

    var overlayCtx = this.overlay.getContext('2d');
    overlayCtx.fillStyle = 'rgba(0, 0, 0, .7)';
    overlayCtx.fillRect(0, 0, w, h);

    this.canvas.parentNode.appendChild(this.overlay);
  }

}
 