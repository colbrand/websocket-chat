window.onload = function () {
    console.log("loaded")
    var nick = prompt("Enter your nickname") || "Anonymous";
    var socket = new WebSocket("ws://" + location.host + "/");
    var input = document.getElementById("input");
    input.focus();

    socket.onmessage = function (event) {
        var msg = event.data;
        var div = document.createElement("div");
        var node = document.createTextNode(msg);
        div.appendChild(node);
        if (msg.split(':')[0] == nick) {
            div.style.color = "blue";
        }
        else
            div.style.color = "red";
        document.getElementById("wrapper").insertBefore(div, input);
        input.scrollIntoView();
    }

    input.onchange = () => {
        var msg = nick + ": " + input.value;
        socket.send(msg);
        input.value = "";
    };
}