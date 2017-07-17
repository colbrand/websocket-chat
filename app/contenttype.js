module.exports = function (ct) {
    var partCt;
    switch (ct) {
        case ".css":
            partCt = "text/css";
            break;
        case ".js":
            partCt = "text/javascript";
            break;
        case ".html":
            partct = "text.html";
            break;
        default:
            partCt = "text";
            break;
    }
    return { "Content-Type": partCt };
}