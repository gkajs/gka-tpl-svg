var pkg = require("../package.json");

module.exports = function html(data, names, prefix) {
    var frame = data.frames[0],
        width = frame.sourceW,
        height = frame.sourceH;

var  str = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,maximum-scale=1">
    <title>gka-preview</title>
    <link href="./gka.css" rel="stylesheet" type="text/css">
</head>
<body>
    <svg viewBox="0, 0, ${width}, ${height}" style="width: ${width}px">
        <foreignobject width="${width}" height="${height}">
            <div id="gka" class="gka-base"></div>
        </foreignobject>
    </svg>

    <div style="position: fixed; bottom: 60px;">
    Change the width：
    <input type="range" min="0" max="${width * 2}" value="${width}" class="range" id="range">
    </div>

    <div style="position: fixed; bottom: 10px;">
        Powered By <a target="_blank" href="https://github.com/gkajs/gka">gka</a> .
        Template By <a target="_blank" href="https://github.com/gkajs/gka-tpl-svg">gka-tpl-svg</a> ${pkg.version}
    </div>
    <script>
        var container = document.getElementsByTagName('svg')[0];
        range.oninput = function () {
            container.style.width = this.value + 'px';
        };
    </script>
    <script>
    function loadImage(names, cb, prefix){
        var n = 0, img;
        names.forEach(function(name) {
            img = new Image();
            img.onload = function() {
                (++n === names.length) && cb && cb();
            };
            img.src = (prefix || '') + name;
        });
    }

    var imgNames = ${names};

    loadImage(imgNames, function() {
        document.getElementById('gka').className += " ${prefix}animation"
    }, "img/")
    </script>
</body>
</html>
`;

    return str;
}
