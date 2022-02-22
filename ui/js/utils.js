$("document").ready(function () {
    init(); // to initialise stuff.
});

function init() {
    console.log("Initialising...");
    var userId = getParamFromURL("userId");
    fetchUserData(userId);
    //    fillStaticData();
}

function fillStaticData() {

    $(".heading>p").html("Shuttlrs impact in 2017");
    $(".mInfo.carbon").html("Saved 2.7k tons<br>of CO2 emissions");
    $(".mInfo.trees").html("Planted equivalent<br>of 1.3 lac trees");
    $(".mInfo.cars").html("Took 10k cars<br>off the road");
    $(".changeTheWorldMetrics > .moreText > p.big").html("<b>That’s how you &amp; 30k Shuttlrs</b> helped change the world.");
    $(".helpingYourself > .moreText > p.big").html("<b>Savings for a Shuttlr</b>");
    $(".mInfo.time").html("600 hours<br>of \"me-time\"");
    $(".mInfo.money").html("₹42k in fuel expenses")

    //
    //    $("#carbon").html("2,700");
    //    $("#trees").html("1,30,000");
    //    $("#money").html("46,000");
    //    $("#time").html("600");
    //    $("#ridesTaken").html("100");


}

function getParamFromURL(param) {
    // Browser url: http: //www.example.com/?anything=123
    var searchParams = new URLSearchParams(window.location.search); //?anything=123
    return searchParams.get(param);
}

function fetchUserData(userId) {
    url = "/yearEnd/getAllSavings";
    data = {
        "userId": userId
    }

    $.get(url, data, function (data) {
        fillWeb(data);
    })

}

function fillWeb(responseData) {
    console.log(responseData);
    /*
    Sample response: {
        "userName": "Jatin", // string
        "changeTheWorld": {
            "carbon": 16, // kilos
            "trees": 150, // number
            "ridesTaken": 99, // number
            "cars": 4242 // to be decided(icon #3)
        },

        "helpYourself": {
            "moneySaved": 151515, //$$$
            "timeInShuttl": 2434234, //hours
        }
    }
    */
    if (responseData.error) {
        //static data
        fillStaticData();

    } else {
        $("#carbon").html(responseData.changeTheWorld.carbon);
        $("#trees").html(responseData.changeTheWorld.trees);
        //$("#cars").html("10,000");
        $("#ridesTaken").html(responseData.changeTheWorld.ridesTaken);
        $("#money").html(responseData.helpYourself.moneySaved);
        $("#time").html(responseData.helpYourself.timeInShuttl);

    }

}
