import Adjuster from './adjuster';
import Filter from './filter';
import StackBlur from 'stackblur-canvas';

export default class PlotitUtil {
  constructor() {
    this.$canvas = document.querySelector('#plotitCanvas') || {};
    this.$panel = document.querySelector('.panel-canvas') || {};
  }

  renderImage(imgSrc, config) {
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

        if (imageW > imageH) {
          scale = imageW / panelW;
        } else {
          scale = imageH / panelH;
        }

        imageW = imageW / scale;
        imageH = imageH / scale;

        var dx = (panelW - imageW) / 2,
            dy = (panelH - imageH) / 2;

        canvas.width = imageW;
        canvas.height = imageH;
        canvas.style.top = dy + 'px';
        canvas.style.left = dx + 'px';

        context.drawImage(image, 0, 0, imageW, imageH);

        if (config && typeof config === 'object') {
          Object.keys(config).map((item) => {
            switch(item) {
              case 'filter':
                var filter = config[item] || '';
                self.processFilter(filter, canvas);
              break;
              case 'adjusters':
                var adjusters = config[item] || {};
                Object.keys(adjusters).map((i) => {
                  if (i === 'blur') {
                    // self.stackBlurImg(adjusters[i]).bind(self);
                  } else {
                    self.processPixel(i, adjusters[i]);
                  }
                });
              break;
            }
          });
        }

        this.originData = this.getData();
      }
    }
  }

  getData(canvas) {
    var canvas = canvas || this.$canvas,
        context = this.context || canvas.getContext('2d');
    if (context) {
      return context.getImageData(0, 0, canvas.width, canvas.height);
    }
  }

  setData(data) {
    var context = this.context || this.$canvas.getContext('2d');
    if (context) {
      this.clearData();
      return context.putImageData(data, 0, 0);
    }
  }

  clearData() {
    var context = this.context || this.$canvas.getContext('2d');
    if (context) {
      return context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }
  }

  resetImage() {
    if (this.originData) {
      this.setData(this.originData);  
    }
  }

  processFilter(processor, canvas) {
    
    // new layer
    Filter.newLayer(canvas);
    // bind Util
    Filter.bindUtil(this);

    if (processor && typeof processor === 'string') {
      processor = Filter[processor].bind(Filter);
    }

    // filter processing
    if (processor && typeof processor === 'function') {
      processor();
      // filter render
      Filter.renderLayer();
    }
    
  }

  processPixel(processor, degree) {
    if (this.getData()) {
      var imageData = imageData || this.getData(),
          deg = +degree || 0,
          pixel;

      if (processor && typeof processor === 'string') {
        processor = Adjuster[processor];
        processor = processor ? processor.bind(Adjuster) : null;
      }

      if (processor && typeof processor === 'function') {
        for (var i = 0; i < imageData.data.length; i += 4) {
          var pixel = {
            r: imageData.data[i + 0],
            g: imageData.data[i + 1],
            b: imageData.data[i + 2],
            a: imageData.data[i + 3]
          };

          pixel = processor(pixel, deg);

          imageData.data[i + 0] = pixel.r;
          imageData.data[i + 1] = pixel.g;
          imageData.data[i + 2] = pixel.b;
          imageData.data[i + 3] = pixel.a;
        }
      }

      this.setData(imageData);
    }
  }

  stackBlurImg(radius) {
    if (this.getData()) {
      var imageData = this.getData(),
          canvas = this.$canvas;
      this.setData(StackBlur.imageDataRGB(imageData, 0, 0, canvas.width, canvas.height, +radius));   
    }
  }

  convertToBase64(size) {
    var quality = 1,
        maxSize = 10000000,
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
 
