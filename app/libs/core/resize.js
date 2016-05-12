import Layer from './layer';

class PlotitResize{

  bindUtil(util) {
    this.util = util;
  }

  cropImage(canvas, opts) {
    var ctx = canvas.getContext('2d'),
        ct = parseInt(canvas.style.top.replace('px', '')),
        cl = parseInt(canvas.style.left.replace('px', '')),
        cw = canvas.width,
        ch = canvas.height,
        x = opts.x,
        y = opts.y,
        w = opts.w,
        h = opts.h;

    var cropImageData = ctx.getImageData(x, y, w, h);

    ctx.putImageData(cropImageData, 0, 0);

    canvas.width = w;
    canvas.height = h;
    canvas.style.left = (cl + (cw - w) / 2) + 'px';
    canvas.style.top = (ct + (ch - h) / 2) + 'px';

  }

  newFrame(canvas, scale) {
    this.canvas = canvas;
    this.Layer = new Layer(canvas, 'newFrame');
    this.layerInfo = this.Layer.addFrame(scale);
  }

  removeFrame() {
    if (this.Layer) {
      this.Layer.clear();
    }
  }

  bindFrame(scale) {
    var self = this,
        $layer = this.layerInfo.layer,
        originW = this.layerInfo.originW,
        originH = this.layerInfo.originH,
        cropW = this.layerInfo.cropW,
        cropH = this.layerInfo.cropH,
        isDragging = false,
        pos = {};


    function isInTheRange(x, y, size) {
      return (x > size && x < (cropW - size) 
          && y > size && y < (cropH - size));
    }

    $layer.addEventListener('mousedown', function dragging(e) {
      
      var x = e.layerX,
          y = e.layerY,
          elem = e.target || e.srcElement,
          moveSize = 10;

      if (isInTheRange(x, y, moveSize)) {
        isDragging = true;
        pos.dragX = x;
        pos.dragY = y;
      }

    }, false);

    $layer.addEventListener('mousemove', function moving(e) {
      
      var x = e.layerX,
          y = e.layerY,
          moveSize = 10,
          cropStyle = $layer.style,
          originStyle = self.canvas.style,
          cropT = parseFloat(cropStyle.top.replace('px', '')) || 0,
          cropL = parseFloat(cropStyle.left.replace('px', '')) || 0,
          originT = parseFloat(originStyle.top.replace('px', '')) || 0,
          originL = parseFloat(originStyle.left.replace('px', '')) || 0;

      if (isInTheRange(x, y, moveSize) && isDragging) {

        pos.moveX = x;
        pos.moveY = y;

        var movedx = cropL + (pos.moveX - pos.dragX),
            movedy = cropT + (pos.moveY - pos.dragY),
            mindx = originL,
            mindy = originT,
            maxdx = originL + originW - cropW,
            maxdy = originT + originH - cropH;

        var styleTop = (movedy >= mindy && movedy <= maxdy) ? movedy : cropT,
            styleLeft = (movedx >= mindx && movedx <= maxdx) ? movedx : cropL;

        $layer.style.top = styleTop + 'px';
        $layer.style.left = styleLeft + 'px';

        self.dx = (styleLeft - originL < 0) ? 0 : styleLeft - originL;
        self.dy = (styleTop - originT < 0) ? 0 : styleTop - originT;

        self.Layer.drawCropImage($layer, {
          originH: originH,
          originW: originW,
          cropH: cropH,
          cropW: cropW,
          x: self.dx,
          y: self.dy
        });

        self.Layer.drawFrameLine($layer);

        self.setPreview(self.$preview, self.dx, self.dy);
      }

    }, false);


    $layer.addEventListener('mouseup', function dropping(e) {      
      var x = e.layerX,
          y = e.layerY,
          moveSize = 10;

      isDragging = false;
      if (isInTheRange(x, y, moveSize)) {
        console.log('dropping', x, y);
      }

    }, false);

  }

  getFrame() {
    if (this.cropImageData) {
      var originW = this.canvas.width,
          originH = this.canvas.height,
          canvasStyle = this.canvas.style,
          originT = parseFloat(canvasStyle.top.replace('px', '')),
          originL = parseFloat(canvasStyle.left.replace('px', '')),
          cropW = this.cropImageData.width,
          cropH = this.cropImageData.height,
          originCtx = this.canvas.getContext('2d');

      this.canvas.width = cropW;
      this.canvas.height = cropH;
      originCtx.putImageData(this.cropImageData, 0, 0);

      canvasStyle.top = originT + (originH - cropH) / 2 + 'px';
      canvasStyle.left = originL + (originW - cropW) / 2 + 'px';

      this.removeFrame();
    }  

    return this.resizeConfig || {};
  }

  setPreview(canvas, x, y) {
    var originCtx = this.canvas.getContext('2d'),
        previewCtx = canvas.getContext('2d'),
        previewW = canvas.width,
        cropW = this.layerInfo.cropW,
        cropH = this.layerInfo.cropH,
        x = x || (this.layerInfo.originW - cropW) / 2,
        y = y || (this.layerInfo.originH - cropH) / 2;

    this.$preview = canvas;
    
    this.resizeConfig = {
      x: x,
      y: y,
      w: cropW,
      h: cropH
    };

    this.cropImageData = originCtx.getImageData(x, y, cropW, cropH);

    canvas.width = 224;
    canvas.height = canvas.width / cropW * cropH;
  
    var tempCanvas = document.createElement('canvas'),
        tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = cropW;
    tempCanvas.height = cropH;
    tempCtx.putImageData(this.cropImageData, 0, 0);

    var tempImg = new Image(),
        tempImgUrl = tempCanvas.toDataURL();

    tempImg.src = tempImgUrl;

    previewCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
  }

}

export default new PlotitResize();
