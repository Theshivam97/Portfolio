var windowHeight;
var windowWidth;
var bURL = "/DiwaliOffer";
var em;
var phoneNumber;
var lph;


$(document).ready(function () {
    // on load
    init();
    //    getRoutes(); // to get BOGO routes
    ga('send', 'event', 'Landing Page', 'On load', 'OnLoad');
});


function init() {
    //
    //    $(window).resize(function () {
    //        setContentHeight("landingPage");
    //        setContentHeight("routePage");
    //        setContentHeight("thankYouPage");
    //    });

    //setContentHeight("landingPage");
    //setContentHeight("routePage");
    lph = function () {
        if (($("#landingPage").height() + 320) > window.innerHeight)
            return $("#landingPage").height + 320;
        else
            return window.innerHeight;
    }
    $("#body").css("height", lph() + "px").addClass("colorful");
    $("#error").hide();
    $("#helpPage").hide();
    $(".head").slideUp();
    $("#moreDetails").hide();
    $(".razorpay-payment-button").prop('disabled', true); //disabling payment button initially
    $("#userId").val(getParamFromURL("userId"));

    $(".cnum").keyup(function () {
        var val = $.trim(this.value);
        if (val.length == 10) {
            // do something
            //            alert("Validating");
            $(".cnum").addClass("loadingIcon");
            setTimeout(function () {
                verifyNumber();
            }, 700);
            ga('send', 'event', 'Details Page', 'Phone number validation', 'Clicked');
        } else {
            $("#error").hide(200);
            $(".cnum")
                .removeClass("validationError")
                .removeClass("loadingIcon")
                .removeClass("validationFailIcon")
                .removeClass("validationPassIcon")
                .css("border", "1px solid #00adb7");
            $(".razorpay-payment-button").prop('disabled', true);

        }
    });

    $("#helpMe").click(function () {
        $("#landingPage").slideUp(700);
        $("#headImg").slideUp(700);
        $("#helpPage").slideDown(700);
        $(".head").slideDown(700);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $("#body").removeClass().addClass("plainCol");
        ga('send', 'event', 'Landing Page', 'Avail Now', 'Clicked');

    });
    $("#moreDetailsBtn").click(function () {
        $("#moreDetails").slideToggle(400);
        $(this).text(function (i, v) {
            return v === '+ More Details' ? '- Less Details' : '+ More Details'
        });
        ga('send', 'event', 'Details Page', 'More/Less Details', 'Clicked');
    });

    $("#thankYouBtn").click(function () {
        window.location.href = "com.shuttl://mId:2"; // inapp deep link to close the tab
    });

    $(".razorpay-payment-button").click(function () {
        ga('send', 'event', 'Payment Page', 'Continue to Payment', 'Clicked');
    })

    //    $("#routeSelectionBtn").click(function () {
    //        homeScreenLoader();
    //        $("#selectedRouteBox").show();
    //        $("#selectRoute").hide();
    //    });

}

function getParamFromURL(param) {
    // Browser url: http: //www.example.com/?anything=123
    var searchParams = new URLSearchParams(window.location.search); //?anything=123
    return searchParams.get(param);
}

function setContentHeight(elID) {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    $("#" + elID).css("height", windowHeight + "px");
}

function verifyNumber() {
    phoneNumber = $(".cnum").val();
    em = getParamFromURL("userId");

    let dataJSON = {
        "phoneNumber": phoneNumber,
        "userId": em
    };
    var settings = {
        "method": "POST",
        "data": JSON.stringify(dataJSON),
        //"dataType": "xml/html/script/json", // expected format for response
        "contentType": "application/json", // send as JSON
        "async": true,
        "crossDomain": true,
        "url": bURL + "/user/checkUserStatus",

    };


    $.ajax(settings).done(function (response) {
        console.log("Got response", response);
        // fill value in DOM here.
        if (response['is_valid'] == 1) { // number is valid
            $("#error").hide(500);
            $(".cnum")
                .removeClass("validationError")
                .removeClass("loadingIcon")
                .addClass("validationPassIcon")
                .css("border", "1px solid #00adb7");
            $(".razorpay-payment-button").prop('disabled', false);

        } else { // number is invalid
            $(".razorpay-payment-button").prop('disabled', true);
            $("#error").html("Offer not valid for this number. Please try another one.");
            $("#error").show(500);
            $(".cnum")
                .addClass("validationError")
                .removeClass("loadingIcon")
                .removeClass("validationPassIcon")
                .addClass("validationFailIcon");
        }
    }).fail(function () {
        $(".cnum")
            .addClass("validationError")
            .removeClass("loadingIcon")
            .removeClass("validationPassIcon")
            .addClass("validationFailIcon");
        $("#error").html("Please check your internet connection or try again later.");
        $("#error").show(500);
        $(".razorpay-payment-button").prop('disabled', true);
    });


}

//function submit() {
//    // getting values again for security
//    phoneNumber = $(".cnum").val();
//    em = getParamFromURL("em");
//    //    fromLocation = $("#fromRouteName").html();
//    //    toLocation = $("#toRouteName").html();
//
//    let dataJSON = {
//        "em": em,
//        "phoneNumber": phoneNumber,
//        "fromLocation": fromRouteId,
//        "toLocation": toRouteId,
//        "routeId": routeId,
//    };
//    var settings = {
//        "async": true,
//        "data": JSON.stringify(dataJSON),
//        "contentType": "application/json", // send as JSON
//        "crossDomain": true,
//        "url": bURL + "/route/applyBogoCoupon",
//        "method": "POST"
//    };
//
//    $.ajax(settings).done(function (response) {
//        // send values
//        // if applied
//        //            jsonData = JSON.parse(response);
//        if (response['success']) {
//            console.log(response);
//            thankYouLoader(); // to load thank you page;
//        } else {
//            //  show error
//            console.log("Couldn't apply coupon.");
//            $('#submitBtn').css('opacity', 0.5).css('cursor', 'auto');
//            $("#error").show(500);
//            $(".cnum")
//                .addClass("validationError")
//                .removeClass("loadingIcon")
//                .removeClass("validationPassIcon")
//                .addClass("validationFailIcon");
//        }
//
//    });
//
//}
