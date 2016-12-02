
$(document).ready(function() {
// register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});

/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();
    // get the user's input text from the DOM
    var captcha = $("#captcha").val();
    var query = $("#tag").val()
    var searchQuery = $("input#tag").val(); // should be e.g. "dance"

    if (!searchQuery.trim()) {
      $("#feedback").html("Please enter a search query!");
      $("#feedback").attr("hidden", false);
      setGifLoadedStatus(false);
      return;
    }



    // if(!captcha.trim()) {
    //   $("#robotError").text("Please solve the riddle to get some Jackson action.");
    //   setGifLoadedStatus(false);
    // }

    console.log(captcha.trim(), typeof captcha);

    if (captcha.trim() ===  '' ) {
     console.log("empty number");
     $("#captchaError")
        .attr("hidden", false)
        .text("Please solve the riddle to get some Jackson action.");
     setGifLoadedStatus(false);

   } else if (captcha.trim() !== "5") {
     console.log("bad number");
     $("#captchaError")
       .attr("hidden", false)
       .text("Wrong answer. Please try again.");
     setGifLoadedStatus(false);

   } else {
        setGifLoadedStatus(true);
        console.log($("#captcha").val());

        $("#captchaError").attr("hidden", true).text();
        console.log("Trying to hide")
        submitAjax();
   }
}


function submitAjax ( ) {

  console.log("hooray");
  var searchQuery = $("input#tag").val(); // should be e.g. "dance"

  // configure a few parameters to attach to our request
  var params = {
      api_key: "dc6zaTOxFJmzC",
      tag : "jackson 5 " + searchQuery // should be e.g. "jackson 5 dance"
  };

    // make an ajax request for a random GIF
  $.ajax({
      dataType: 'jsonp',
      url: "https://api.giphy.com/v1/gifs/random", // where should this request be sent?
      data: params, // attach those extra parameters onto the request
      success: function(response) {
          // if the response comes back successfully, the code in here will execute.
          setTimeout(function() {

          // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
          console.log("we received a response!");
          console.log(response.data);

          var pic_url = response.data.image_original_url;
          $("#gif").attr("src",pic_url);
          setGifLoadedStatus(true);
          // $(someSelector).html()
          // $(someSelector).val()
          // $(someSelector).find()
        }, 2000);
          // 1. set the source attribute of our image to the image_url of the GIF
          // 2. hide the feedback message and display the image
      },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function
            // give the user an error message
            $("#captcha").text === "5"
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });

    // give the user a "Loading..." message while they wait
    $("#feedback").text("Loading...");
    setGifLoadedStatus(false);

    $("#captchaError")
      .attr("hidden", true)
      // .text("Wrong answer. Please try again.");

    setGifLoadedStatus(false);
}

/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
 function setGifLoadedStatus(isCurrentlyLoaded) {
     $("#gif").attr("hidden", !isCurrentlyLoaded);
     $("#feedback").attr("hidden", isCurrentlyLoaded);
 }

function setFeedback(getFeedback) {
  $("#feedback").attr("hidden", getFeedback);
  var searchQuery = $("input#tag").val(); // should be e.g. "dance"

  if(searchQuery.trim()) {
  $("#feedback").attr("hidden", true);

  setTimeout(function() {
    $("#feedback").text('Loading...')
  }, 2000);
  $("feedback").attr("hidden", true);
}
}
