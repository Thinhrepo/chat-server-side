// Import js socket.io
var host = 'http://localhost:8080/';
var socket = io.connect(host);

// Functions
function getChatBox(data) {
    console.log(data.message);
    var html = '<div class="popup-box chat-popup popup-box-on chatbox-identifier" ' +
        'id="' + data.sender + '">' +
        '<div class="popup-head">' +
        '<div class="popup-head-left pull-left">' +
        '<img src="http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg" alt="iamgurdeeposahan"> ' +
        data.name +
        '</div>' +
        '<div class="popup-head-right pull-right">' +
        '<div class="btn-group">' +
        '<button class="chat-header-button" data-toggle="dropdown" type="button" aria-expanded="false">' +
        '<i class="glyphicon glyphicon-cog"></i>' +
        '</button>' +
        '<ul class="dropdown-menu pull-right" role="menu">' +
        '<li><a href="#">Media</a></li>' +
        '<li><a href="#">Block</a></li>' +
        '<li><a href="#">Clear Chat</a></li>' +
        '<li><a href="#">Email Chat</a></li>' +
        '</ul>' +
        '</div>' +
        '<button class="chat-header-button pull-right" id="removeClass" data-widget="remove" type="button">' +
        '<i class="glyphicon glyphicon-off"></i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '<div class="popup-messages" id="c-content-' + data.sender + '">' +
        '<div class="direct-chat-messages">' +
        '<div class="chat-box-single-line">' +
        '<abbr class="timestamp">October 8th, 2015</abbr>' +
        '</div>' +
        '<div class="direct-chat-msg doted-border">' +
        '<div class="direct-chat-info clearfix">' +
        '<span class="direct-chat-name pull-left">' + data.sender + '</span>' +
        '</div>' +
        '<img class="direct-chat-img" alt="message user image" src="http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg"><div class="direct-chat-text"> ' +
        data.message +
        '</div>' +
        '<div class="direct-chat-info clearfix">' +
        '<span class="direct-chat-timestamp pull-right">3.36 PM</span>' +
        '</div><div class="direct-chat-info clearfix">' +
        '<span class="direct-chat-img-reply-small pull-left"></span>' +
        '<span class="direct-chat-reply-name">Singh</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="popup-messages-footer">' +
        '<textarea onkeypress="sendMessage(this, event)" class="status_message" placeholder="Type a message..." ' +
        'rows="10" cols="40" name="message" sender="' + data.recipient + '" recipient="' + data.sender + '"></textarea>' +
        '<div class="btn-footer">' +
        '<button class="bg_none">' +
        '<i class="glyphicon glyphicon-film"></i>' +
        '</button>' +
        '<button class="bg_none">' +
        '<i class="glyphicon glyphicon-camera"></i>' +
        '</button>' +
        '<button class="bg_none">' +
        '<i class="glyphicon glyphicon-paperclip"></i>' +
        '</button>' +
        '<button class="bg_none pull-right"><i class="glyphicon glyphicon-thumbs-up"></i></button>' +
        '</div>' +
        '</div>' +
        '</div>';

    return html;
}

function addMessage(data) {
    console.log(data);
    var conversationContent = document.getElementById('c-content-' + data.sender);
    console.log(conversationContent.getAttribute('class'));
    var htmlMessage = '<div class="direct-chat-messages">' +
        '<div class="chat-box-single-line">' +
        '<abbr class="timestamp">October 8th, 2015</abbr>' +
        '</div>' +
        '<div class="direct-chat-msg doted-border">' +
        '<div class="direct-chat-info clearfix">' +
        '<span class="direct-chat-name pull-left">' + data.name + '</span>' +
        '</div>' +
        '<img class="direct-chat-img" alt="message user image" src="http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg">' +
        '<div class="direct-chat-text"> ' + data.message + '</div>' +
        '<div class="direct-chat-info clearfix">' +
        '<span class="direct-chat-timestamp pull-right">3.36 PM</span>' +
        '</div>' +
        '<div class="direct-chat-info clearfix">' +
        '<span class="direct-chat-img-reply-small pull-left"></span>' +
        '<span class="direct-chat-reply-name">Singh</span>' +
        '</div>' +
        '</div>' +
        '</div>';
    conversationContent.innerHTML += htmlMessage;
    // Scroll div
    conversationContent.scrollTop = conversationContent.scrollHeight;
}

function sendMessage(element, event) {
    if (event.keyCode == 13) {
        var message = element.value;
        console.log(message);
        socket.emit('send', {
            message: message,
            sender: element.getAttribute('sender'),
            recipient: element.getAttribute('recipient')
        });
        // Reset value textarea
        element.value = '';
    } else {

    }
}

// var messages = [];
// var field = document.getElementById("field");
// var content = document.getElementById("content");
var username = document.getElementById("username");
var joinButton = document.getElementById('join-chat')
socket.on('message', function (data) {
    console.log(data);
    if (data.message) {
        var box = document.getElementById(data.sender);
        if (box === null) {
            var chatbox = getChatBox(data);

            document.body.innerHTML += chatbox;
        } else {
            addMessage(data);
        }
    } else {
        console.log("There is a problem:", data);
    }
});
//
// joinButton.onclick = function () {
//     if(name.value == "") {
//         alert("Please type your name!");
//     } else {
//         // var text = field.value;
//         socket.emit('join', {name: username.value});
//         // socket.emit('send', { message: text, username: name.value });
//         // socket.to('receipient').emit('send', { message: text, username: name.value });
//     }
// }

// sendButton.onclick = function() {
//     if(name.value == "") {
//         alert("Please type your name!");
//     } else {
//         var text = field.value;
//         socket.emit('send', { message: text, username: name.value });
//         // socket.to('Thinhnv').emit('send', { message: text, username: name.value });
//     }
// };