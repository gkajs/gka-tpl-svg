var gkaUtils = require('gka-utils');

function getConfig(frame, i, frames, key) {
    var {
        width,
        height,
        offX,
        offY,
        file,
        x,
        y,
        w,
        h,
    } = frame;

    var file = './img/' + file;

    return {
        width: `${width}px`,
        height: `${height}px`,
        'margin-left': `${offX}px`,
        'border-top': `${offY}px solid transparent`,
        'background-image': `url("${file}")`,
        'background-position': `${-x} ${-y}`
    }
}

function injectAnimationCSS(firstFrame) {
    var {
        width,
        height,
        offX,
        offY,
        file,
        x,
        y,
        w,
        h,
    } = firstFrame;

    return {
        'border-top': `${offY}px solid transparent`
    }
}

module.exports = function css(data, opts) {
    var css = gkaUtils.css.getKeyframesCSS(data, opts, {
        getConfig,
        injectAnimationCSS
    });

    return css;
}
