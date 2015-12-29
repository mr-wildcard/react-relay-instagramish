export const encode = (file, done) => {
    let reader = new FileReader();

    reader.onloadend = ({ target: { result: base64result } }) => done(base64result);
    reader.readAsDataURL(file);
};