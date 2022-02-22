$(document).ready(function () {
    setContentHeight("thankYouPage");
    ga('send', 'event', 'Thankyou Page', 'On load', 'OnLoad');

    $("#thankYouBtn").click(function () {
        ga('send', 'event', 'Thankyou Page', 'Thank you btn', 'Clicked');
        window.location.href = "com.shuttl://mId:2"; // replace with in app link as per front end team

    })
});

function setContentHeight(elID) {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    $("#" + elID).css("height", windowHeight + "px");
}
