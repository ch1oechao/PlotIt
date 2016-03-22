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

export default new PlotitFilter();
 