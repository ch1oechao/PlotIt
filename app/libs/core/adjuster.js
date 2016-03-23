class PlotitAdjuster {
  constructor() {
    this.defaultDegree = 0;
    this.options = ['r', 'g', 'b'];
  }

  checkOpts(pixel) {
    var keys = Object.keys(pixel);
    return this.options.every((item) => {
      return keys.indexOf(item) !== -1;
    });
  }

  // 亮度
  brightness(pixel, degree) {
    var deg = parseInt(degree || this.defaultDegree, 10);

    deg = Math.floor(255 * (deg / 250));

    if (this.checkOpts(pixel)) {
      pixel.r += deg;
      pixel.g += deg;
      pixel.b += deg;
    }

    return pixel;
  }

  // 饱和度
  saturation(pixel, degree) {
    var deg = parseInt(degree || this.defaultDegree, 10);

    if (this.checkOpts(pixel)) {
      var max = Math.max(pixel.r , pixel.g, pixel.b);

      pixel.r += (pixel.r !== max ? ((max - pixel.r) * (deg / 50)) : 0);
      pixel.g += (pixel.g !== max ? ((max - pixel.g) * (deg / 50)) : 0);
      pixel.b += (pixel.b !== max ? ((max - pixel.b) * (deg / 50)) : 0);

    }
    
    return pixel;
  }

  // 对比度
  contrast(pixel, degree) {
    var deg = parseInt(degree || this.defaultDegree, 10);

    deg = Math.pow((deg + 100) / 100, 2);

    if (this.checkOpts(pixel)) {
      // Red Channel
      pixel.r /= 255;
      pixel.r -= .5;
      pixel.r *= deg;
      pixel.r += .5;
      pixel.r *= 255;
      // Green Channel
      pixel.g /= 255;
      pixel.g -= .5;
      pixel.g *= deg;
      pixel.g += .5;
      pixel.g *= 255;
      // Blue Channel
      pixel.b /= 255;
      pixel.b -= .5;
      pixel.b *= deg;
      pixel.b += .5;
      pixel.b *= 255;
    }

    return pixel;
  }

  // 褐度
  sepia(pixel, degree) {
    var deg = parseInt(degree || this.defaultDegree, 10) / 100;
    if (this.checkOpts(pixel)) {
      pixel.r = Math.min(255, (pixel.r * (1 - (0.607 * deg))) + (pixel.g * (0.769 * deg)) + (pixel.b * (0.189 * deg)));
      pixel.g = Math.min(255, (pixel.r * (0.349 * deg)) + (pixel.g * (1 - (0.314 * deg))) + (pixel.b * (0.168 * deg)));
      pixel.b = Math.min(255, (pixel.r * (0.272 * deg)) + (pixel.g * (0.534 * deg)) + (pixel.b * (1- (0.869 * deg))));;
    }
    return pixel;
  }

  // 噪点
  noise(pixel, degree) {
    var deg = parseInt(degree || this.defaultDegree, 10);

    var randomRange = (min, max) => {
      var rand = min + (Math.random() * (max - min));
      return Math.round(rand) / 50;
    }

    deg = Math.abs(deg) * 255;

    if (this.checkOpts(pixel)) {

      var random = randomRange(deg * -1, deg);
      
      pixel.r += random;
      pixel.g += random;
      pixel.b += random;
    }

    return pixel;
  }

  // 灰度
  greyscale(pixel) {
    if (this.checkOpts(pixel)) {
      var avg = (0.299 * pixel.r) + (0.587 * pixel.g) + (0.114 * pixel.b);
      
      pixel.r = avg;
      pixel.g = avg;
      pixel.b = avg;
    }

    return pixel;
  }

} 

export default new PlotitAdjuster();
 