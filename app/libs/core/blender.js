class PlotitBlender {

  constructor() {
    this.options =  ['r', 'g', 'b'];
  }
  
  normal(layer, parent) {
    return layer;
  }

  multiply(layer, parent) {
    var res = {
      a: 1
    };

    this.options.map((i) => {
      res[i] = (layer[i] * parent[i] * parent.a) / 255;
    });

    return res;
  }

  screen(layer, parent) {
    var res = {
      a: 1
    };

    this.options.map((i) => {
      res[i] = 255 - (((255 - layer[i]) * (255 - parent[i] * parent.a)) / 255)
    });

    return res;
  }

  overlay(layer, parent) {
    var res = {
      a: 1
    };

    this.options.map((i) => {
      if (parent[i] > 128) {
        res[i] = 255 - 2 * (255 - layer[i]) * (255 - parent[i]) / 255;
      } else {
        res[i] = (parent[i] * layer[i] * 2) / 255;
      }
    });

    return res;
  }

  difference(layer, parent) {
    var res = {
      a: 1
    };

    this.options.map((i) => {
      res[i] = layer[i] - parent[i];
    });

    return res;
  }

  addition(layer, parent) {
    var res = {
      a: 1
    };

    this.options.map((i) => {
      res[i] = layer[i] + parent[i];
    });

    return res;
  }

  exclusion(layer, parent) {
    var res = {
      a: 1
    };

    this.options.map((i) => {
      res[i] = 128 - 2 * (parent[i] - 128) * (layer[i] - 128) / 255;
    });

    return res;
  }

  softLight(layer, parent) {
    var res = {
      a: 1
    };

    this.options.map((i) => {
      if (parent[i] > 128) {
        res[i] = 255 - ((255 - parent[i]) * (255 - (layer[i] - 128))) / 255;
      }
    });

    return res;
  }

  lighten(layer, parent) {
    var res = {
      a: 1
    };

    this.options.map((i) => {
      res[i] = parent[i] > layer[i] ? parent[i] : layer[i];
    });

    return res;
  }

  darken(layer, parent) {
    var res = {
      a: 1
    };

    this.options.map((i) => {
      res[i] = parent[i] > layer[i] ? layer[i] : parent[i];
    });

    return res;
  }

}

export default new PlotitBlender();
