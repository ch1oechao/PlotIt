//adapted from github.com/meltingice/CamanJS/ - convert.coffee

class Converter {
  
  hexToRBG(hex) {
    hex = hex.charAt(0) === '#' ? hex.substr(1) : hex;

    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    }
  }

  rgbToHSL(r, g, b) {

    var h, s, l;

    if (typeof r === 'object') {
      g = r.g;
      b = r.b;
      r = r.r;
    }

    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > .5 ? d / (a - max - min) : d / (max + min);

      if (r === max) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (g === max) {
        h = (b - r) / d + 2;
      } else {
        h = (r - g) / d + 4;
      }

      h /= 6;
    }

    return {
      h: h,
      s: s,
      l: l
    }
  }

  hslToRGB(h, s, l) {

    var r, g, b, q, p;

    if (typeof h === 'object') {
      s = h.s;
      l = h.l;
      h = h.h;
    }

    if (s === 0) {
      r = g = b = l;
    } else {
      q = l < .5 ? l * (1 + s) : (l + s - l * s);
      p = 2 * l - q;

      r = this.hueToRGB(p, q, h) + 1/3;
      g = this.hueToRGB(p, q, h);
      b = this.hueToRGB(p, q, h) - 1/3;
    }

    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    }
  }

  hueToRGB(p, q, t) {

    if (t < 0) t += 1;
    if (t > 1) t -= 1;

    if (t < 1/6) {
      return p + (q - p) * 6 * t;
    } else if (t < 1/2) {
      return q;
    } else if (t < 2/3) {
      return p + (q - p) * (2/3 - t) * 6;
    }

    return p;
  }

  rgbToHSV(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        v = max,
        d = max - min,
        s = (max === 0) ? 0 : d / max,
        h;

    if (max === min) {
      h = 0
    } else {
      if (r === max) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (g === max) {
        h = (b - r) / d + 2;
      } else {
        h = (r - g) / d + 4;
      }

      h /= 6;
    }

    return {
      h: h,
      s: s,
      v: v
    }
  }

  hsvToRGB(h, s, v) {
    var i, f, p, q, t, r, g, b;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 -s);
    q = v * (1- f * s);
    t = v * (1 - (1 - f) * s);

    switch(i % 6) {
      case 0: 
        r = v;
        g = t;
        b = p;
      case 1:
        r = q;
        g = v;
        b = p;
      case 2:
        r = p;
        g = v;
        b = t;
      case 3:
        r = p;
        g = q;
        b = v;
      case 4:
        r = p;
        g = q;
        b = v;
      case 5: 
        r = v;
        g = p;
        b = q;
    }

    return {
      r: Math.floor(r * 255),
      g: Math.floor(g * 255),
      b: Math.floor(b * 255)
    }
  }

}


export default new Converter();