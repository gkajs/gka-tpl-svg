
module.exports = function css(data, prefix, frameduration) {
    var frames = data.frames,
        len = frames.length,
        per = 100 / (len);  // len === 2，0% 50% 100% ，确保播放 0% 和 50%

    var beforefilepath = "",
        filepath = "";

    var keyframesStr = frames.reduce(function(str, frame, i, frames){

        var percent = (i * (per)).toFixed(2);
        percent = percent == 0? 0: percent; // fix 0.00 to 0;

        var x = frame.x === 0? 0: `-${frame.x}px`,
            y = frame.y === 0? 0: `-${frame.y}px`;

            filepath = './img/' + (data.file || frame.file);
            
        if (beforefilepath === filepath || i === 0) {
            str += `
    ${percent}% {
        width: ${frame.width}px;
        height: ${frame.height}px;
        margin-left: ${frame.offX}px;
        border-top: ${frame.offY}px solid transparent;
        background-position: ${x} ${y};
    }`;
        } else {
            str += `
    ${percent}% {
        width: ${frame.width}px;
        height: ${frame.height}px;
        margin-left: ${frame.offX}px;
        border-top: ${frame.offY}px solid transparent;
        background-image: url("${filepath}");
        background-position: ${x} ${y};
    }`;
        }

        if (i == len - 1) {
            str += `
    100% {
        width: ${frame.width}px;
        height: ${frame.height}px;
        margin-left: ${frame.offX}px;
        border-top: ${frame.offY}px solid transparent;
        background-position: ${x} ${y};
    }
`;      }

/* transform: translate(${frame.offX}px, ${frame.offY}px);*/

        beforefilepath = filepath;
        return str;
    }, "");


    var css = `.gka-base {
    
    /* background-size: contain;*/

    animation-timing-function: steps(1);
    animation-iteration-count: infinite;

    background-repeat: no-repeat;

    animation-fill-mode: forwards;

    /* Play once*/
    /* animation-iteration-count: 1; */
}

`;
    var firstFrame = frames[0];
    
    css += `.${prefix}animation {
    animation-name: ${prefix}keyframes;
    animation-duration: ${len * frameduration}s;
    border-top: ${firstFrame.offY}px solid transparent;
    background-image: url("${'./img/' + (data.file || firstFrame.file)}");
}

@-webkit-keyframes ${prefix}keyframes {${keyframesStr}}
`;

    return css;
}
