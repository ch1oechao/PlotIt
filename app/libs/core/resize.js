import Layer from './layer';

class PlotitResize{

  bindUtil(util) {
    this.util = util;
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
  }

  setPreview(canvas) {
    var originCtx = this.canvas.getContext('2d'),
        previewCtx = canvas.getContext('2d'),
        previewW = canvas.width,
        cropW = this.layerInfo.cropW,
        cropH = this.layerInfo.cropH,
        x = (this.layerInfo.originW - cropW) / 2,
        y = (this.layerInfo.originH - cropH) / 2;

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
