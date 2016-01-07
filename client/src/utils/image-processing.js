// https://github.com/brunobar79/J-I-C/blob/master/src/JIC.js
// https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/

const getCanvas = () => {
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');

    return { cvs, ctx };
};

const process = (file, width, quality, done) => {
    let reader = new FileReader();

    reader.onloadend = (event) => {

        let { target: { result: base64result } } = event;
        let imgElement = document.createElement('img');

        imgElement.onload = () => {

            if (imgElement.naturalWidth <= width) {
                return base64result;
            }

            let scaleAmount = width / imgElement.naturalWidth;
            let finalWidth = width;
            let finalHeight = imgElement.naturalHeight * scaleAmount;

            let { cvs, ctx } = getCanvas();
            cvs.width = finalWidth;
            cvs.height = finalHeight;

            ctx.drawImage(imgElement, 0, 0, finalWidth, finalHeight);
            done( cvs.toDataURL("image/jpeg", quality / 100) );
        }

        imgElement.src = base64result;
    };

    reader.readAsDataURL(file);
};

export default process;
