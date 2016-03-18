export default class CanvasUtil {
  constructor() {
    this.$canvas = document.querySelector('#plotitCanvas');
    this.$panel = document.querySelector('.panel-canvas');
  }

  render(imgSrc) {
    if (this.$canvas && this.$panel) {
      var canvas = this.$canvas,
          context = canvas.getContext('2d'),
          image = new Image();

      image.crossOrigin = 'anonymous';
      image.src = imgSrc;

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
      } 
    }
  }


  convertToBase64(canvas, size) {
    if (canvas) {
      var quality = 1,
          maxSize = 50000000,
          context = canvas.getContext('2d'),
          imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      context.putImageData(imageData, 0, 0);

      if (size > maxSize) {
        quality = Math.floor(maxSize / size);
      }

      var base64Str = canvas.toDataURL(null, quality);

      return base64Str.substring(base64Str.indexOf(',') + 1);
    }
  }

}
 