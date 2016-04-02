import Layer from './layer';

class PlotitResize{

  bindUtil(util) {
    this.util = util;
  }

  newFrame(canvas, scale) {
    this.canvas = canvas;
    this.Layer = new Layer(canvas, 'newFrame');
    this.layer = this.Layer.addFrame(scale);
  }

  removeFrame() {
    this.Layer.clear();
  }
}

export default new PlotitResize();
