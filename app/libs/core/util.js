export default class PlotitUtil {
  constructor() {
    this.$canvas = document.querySelector('#plotitCanvas') || {};
    this.$panel = document.querySelector('.panel-canvas') || {};
  }

  renderImage(imgSrc) {
    if (this.$canvas && this.$panel) {
      var canvas = this.$canvas,
          context = canvas.getContext('2d'),
          image = new Image(),
          self = this;

      image.crossOrigin = 'anonymous';
      image.src = imgSrc;

      this.context  = context;
      this.image = image;

      image.onload = () => {
        var $panel = this.$panel,
            panelW = $panel.clientWidth,
            panelH = $panel.clientHeight,
            imageW = image.width,
            imageH = image.height,
            scale;

        context.clearRect(0, 0, canvas.width, canvas.height);

        canvas.width = panelW;
        canvas.height = panelH;

        if (imageW > imageH) {
          scale = imageW / panelW;
        } else {
          scale = imageH / panelH;
        }

        imageW = imageW / scale;
        imageH = imageH / scale;

        var dx = (panelW - imageW) / 2,
            dy = (panelH - imageH) / 2;

        context.drawImage(image, dx, dy, imageW, imageH);

        this.originData = this.getData(dx, dy, imageW, imageH);
      }
    }
  }

  getData() {
    var canvas = this.$canvas;
    return this.context.getImageData(0, 0, canvas.width, canvas.height);
  }

  setData(data) {
    return this.context.putImageData(data, 0, 0);
  }

  resetImage() {
    this.setData(this.originData);
  }

  convertToBase64(size) {
    var quality = 1,
        maxSize = 50000000,
        base64Str = '';

    if (size > maxSize) {
      quality = Math.floor(maxSize / size);
    }

    var imageData = this.getData();
    
    this.setData(imageData);

    base64Str = this.$canvas.toDataURL(null, quality);

    return base64Str.substring(base64Str.indexOf(',') + 1);
  }

}
 
