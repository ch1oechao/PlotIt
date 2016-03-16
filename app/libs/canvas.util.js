export default class CanvasUtil {
  constructor() {
    this.$canvas = document.getElementById('plotitCanvas');
    this.$panel = document.getElementsByClassName('panel-canvas')[0];
  }

  render(imgSrc) {
    if (this.$canvas && this.$panel) {
      var canvas = this.$canvas,
          context = canvas.getContext('2d'),
          image = new Image()
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
}
 