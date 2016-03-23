import Layer from './layer';

class PlotitFilter {
  constructor() {
    this.options = ['r', 'g', 'b'];
  }

  checkOpts(pixel) {
    var keys = Object.keys(pixel);
    return this.options.every((item) => {
      return keys.indexOf(item) !== -1;
    });
  }

  bindUtil(util) {
    this.util = util;
  }

  getData(canvas) {
    var context = canvas.getContext('2d');
    if (context) {
      return context.getImageData(0, 0, canvas.width, canvas.height);
    }
  }

  newLayer(canvas) {
    this.canvas = canvas;
    this.layer = new Layer(canvas).layer;
  }

  renderLayer() {
    this.canvas.getContext('2d').drawImage(this.layer, 0, 0);
    console.log('render Filter ... is OK!');
  }

  moon() {
    this.util.processPixel('greyscale');
  }

  toaster() {

    this.util.processPixel('brightness', 30);
    this.util.processPixel('contrast', 18);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 3,
        x1 = width / 2,
        y1 = height / 2,
        r1 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, 'rgba(128, 78, 15, .2)');
    grd.addColorStop(1, 'rgba(59, 0, 59, .2)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  _1977() {

    this.util.processPixel('brightness', 20);
    this.util.processPixel('saturation', -10);
    this.util.processPixel('contrast', 8);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, 0, 0, 0);
    grd.addColorStop(0, 'rgba(243, 106, 188, .07)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  aden() {
    this.util.processPixel('brightness', 10);
    this.util.processPixel('saturation', 5);
    this.util.processPixel('contrast', 10);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 3,
        x1 = width / 2,
        y1 = height / 2,
        r1 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, 'rgba(66, 10, 14, .1)');
    grd.addColorStop(1, 'transparent');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  earlybird() {
    this.util.processPixel('saturation', -10);
    this.util.processPixel('sepia', 15);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 3,
        x1 = width / 2,
        y1 = height / 2,
        r1 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, 'rgba(208, 186, 142, .15)');
    grd.addColorStop(.75, 'rgba(54, 3, 9, .1)');
    grd.addColorStop(1, 'rgba(29, 2, 16, .1)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  walden() {
    this.util.processPixel('brightness', 22);
    this.util.processPixel('saturation', -18);
    this.util.processPixel('sepia', 36);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, 0, 0, 0);
    grd.addColorStop(0, 'rgba(20, 68, 204, .07)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  xpro2() {
    this.util.processPixel('contrast', 10);
    this.util.processPixel('sepia', 20);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 3,
        x1 = width / 2,
        y1 = height / 2,
        r1 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, 'rgba(230, 231, 224, .15)');
    grd.addColorStop(1, 'rgba(43, 42, 161, .05)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  lofi() {
    this.util.processPixel('saturation', 15);
    this.util.processPixel('contrast', 20);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 3,
        x1 = width / 2,
        y1 = height / 2,
        r1 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, 'transparent');
    grd.addColorStop(1, 'rgba(34, 34, 34, .12)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

} 

export default new PlotitFilter();
 