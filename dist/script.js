var image = null;
var redimage = null;
var grayimage = null;
var blurimage = null;
var frameimage = null;
var rainbowimage = null;
var original = null;
var color = "#FF0000";

function upload() {
    var imgcanvas = document.getElementById("foreground");

    var fileinput = document.getElementById("fgfile");
    image = new SimpleImage(fileinput);

    redimage = new SimpleImage(fileinput);

    rainbowimage = new SimpleImage(fileinput);

    grayimage = new SimpleImage(fileinput);

    blurimage = new SimpleImage(fileinput);

    frameimage = new SimpleImage(fileinput);


    original = new SimpleImage(fileinput);

    image.drawTo(imgcanvas);
}


function grayscale() {

    if (grayimage == null) {
        alert("Image not loaded!");
    }


    for (var pixel of grayimage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    var imgcanvas = document.getElementById("foreground");
    grayimage.drawTo(imgcanvas);

}


function red() {
    if (image == null) {
        alert("Image not loaded!");
    }


    for (var p of redimage.values()) {
        var avg = (p.getRed() + p.getGreen() + p.getBlue()) / 3;
        if (avg < 128) {
            p.setRed(2 * avg);
            p.setGreen(0);
            p.setBlue(0);
        } else {
            p.setRed(255);
            p.setGreen(2 * avg - 255);
            p.setBlue(2 * avg - 255);
        }
    }
    var imgcanvas = document.getElementById("foreground");
    redimage.drawTo(imgcanvas);


}


function doColor() {

    color = document.getElementById("clr");

}

function border() {
    if (image == null) {
        alert("Image not loaded!");
    }

    var T = Math.max(frameimage.getWidth(), frameimage.getHeight()) / 6;
    var A = (frameimage.getWidth() + frameimage.getHeight()) / 40;
    for (var pixel of frameimage.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (y < A * Math.abs(Math.sin(2 * Math.PI * x / T)) || y > frameimage.getHeight() - A * Math.abs(Math.sin(2 * Math.PI * x / T))) {

            var arrBuff = new ArrayBuffer(4);
            var vw = new DataView(arrBuff);
            vw.setUint32(0, parseInt(color, 16), false);
            var arrByte = new Uint8Array(arrBuff);


            pixel.setRed(arrByte[1]);
            pixel.setGreen(arrByte[2]);
            pixel.setBlue(arrByte[3]);
        }
        if (x < A * Math.abs(Math.sin(2 * Math.PI * y / T)) || x > frameimage.getWidth() - A * Math.abs(Math.sin(2 * Math.PI * y / T))) {
            var arrBuff = new ArrayBuffer(4);
            var vw = new DataView(arrBuff);
            vw.setUint32(0, parseInt(color, 16), false);
            var arrByte = new Uint8Array(arrBuff);


            pixel.setRed(arrByte[1]);
            pixel.setGreen(arrByte[2]);
            pixel.setBlue(arrByte[3]);


        }

    }
    var imgcanvas = document.getElementById("foreground");
    frameimage.drawTo(imgcanvas);
}


function filterBlur() {
    var img = new SimpleImage(blurimage.getWidth(), blurimage.getHeight());
    for (var pixel of img.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (isBlur()) {
            img.setPixel(x, y, getNearbyPxl(blurimage.getPixel(x, y)));
        } else {
            img.setPixel(x, y, blurimage.getPixel(x, y));
        }
    }
    return img;
}

function toblur() {

    blurimage = filterBlur();
    var imgcanvas = document.getElementById("foreground");
    blurimage.drawTo(imgcanvas);

}

function isBlur() {
    if (Math.random() < 0.5) {
        return false;
    } else {
        return true;
    }
}

function getNearbyPxl(aPixel) {
    // untrimmed x component of aPixel's nearby pixel
    var x = aPixel.getX() + Math.floor(Math.random() * 41) - 20;
    // untrimmed y component of aPixel's nearby pixel
    var y = aPixel.getY() + Math.floor(Math.random() * 41) - 20;
    var Xmax = blurimage.getWidth();
    var Ymax = blurimage.getHeight();

    if (x > Xmax - 1) {
        x = 2 * Xmax - x - 1;
    }

    if (x < 0) {
        x = Math.abs(x);
    }

    if (y > Ymax - 1) {
        y = 2 * Ymax - y - 1;
    }

    if (y < 0) {
        y = Math.abs(y);
    }
    var pxl = blurimage.getPixel(x, y);
    return pxl;
}



function rainbow() {
    if (image == null) {
        alert("Image not loaded!");
    }

    var space = rainbowimage.getHeight() / 7;
    for (var pixel of rainbowimage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (pixel.getY() < space) {
            if (avg > 128) {
                pixel.setRed(255);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(2 * avg - 255);
            } else {
                pixel.setRed(2 * avg);
                pixel.setGreen(0);
                pixel.setBlue(0);
            }
        } else if (pixel.getY() < 2 * space) {
            if (avg > 128) {
                pixel.setRed(255);
                pixel.setGreen(1.2 * avg - 51);
                pixel.setBlue(2 * avg - 255);
            } else {
                pixel.setRed(2 * avg);
                pixel.setGreen(0.8 * avg);
                pixel.setBlue(0);
            }
        } else if (pixel.getY() < 3 * space) {
            if (avg > 128) {
                pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue(2 * avg - 255);
            } else {
                pixel.setRed(2 * avg);
                pixel.setGreen(2 * avg);
                pixel.setBlue(0);
            }
        } else if (pixel.getY() < 4 * space) {
            if (avg > 128) {
                pixel.setRed(2 * avg - 255);
                pixel.setGreen(255);
                pixel.setBlue(2 * avg - 255);
            } else {
                pixel.setRed(0);
                pixel.setGreen(2 * avg);
                pixel.setBlue(0);
            }
        } else if (pixel.getY() < 5 * space) {
            if (avg > 128) {
                pixel.setRed(2 * avg - 255);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(255);
            } else {
                pixel.setRed(0);
                pixel.setGreen(0);
                pixel.setBlue(2 * avg);
            }
        } else if (pixel.getY() < 6 * space) {
            if (avg > 128) {
                pixel.setRed(1.2 * avg - 51);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(255);
            } else {
                pixel.setRed(0.8 * avg);
                pixel.setGreen(0);
                pixel.setBlue(2 * avg);
            }
        } else {
            if (avg > 128) {
                pixel.setRed(0.4 * avg + 153);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(0.4 * avg + 153);
            } else {
                pixel.setRed(1.6 * avg);
                pixel.setGreen(0);
                pixel.setBlue(1.6 * avg);
            }
        }
    }
    var imgcanvas = document.getElementById("foreground");
    rainbowimage.drawTo(imgcanvas);

}


function reset() {

    if (image == null) {
        alert("Image not loaded!");
    }

    var imgcanvas = document.getElementById("foreground");


    const context = foreground.getContext('2d');

    context.clearRect(0, 0, foreground.width, foreground.height);


    image.drawTo(imgcanvas);

}


function downloadred() {

}