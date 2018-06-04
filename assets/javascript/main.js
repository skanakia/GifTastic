var animals = ["dog", "eagle", "sloth", "cat", "parrot", "lemur", "raccoon", "iguana"];

$(document).ready(function () {
    function renderButtons() {
        for (var i = 0; i < animals.length; i++) {
            var btn = $("<button>");
            $(btn).addClass("animal");
            $(btn).attr("data-animal", animals[i]);
            $(btn).text(animals[i]);
            $("#button-loc").append(btn);
        }
    }


    $("#submit").on("click", function () {
        $("form").submit(function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var newAnimal = $("#animal-search").val();
            animals.push(newAnimal);
            $("#button-loc").empty();
            renderButtons();
        });
    });
    $(document).on("click", ".animal", function () {
        $("#gif-dump").empty();
        var animalVal = $(this).data("animal");
        console.log(animalVal)
        var apiKey = "Jvq1ltTAkd3y26XVoAAWRZv0dFKdiQ81";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalVal + "&limit=10&api_key=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            for (i = 0; i < results.length; i++) {

                var animalDiv = $("<div class='animal-div'>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gifImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);
                $(gifImage).attr("data-still", results[i].images.fixed_height_still.url);
                $(gifImage).attr("data-animate", results[i].images.fixed_height.url);
                $(gifImage).attr("data-state", "still");
                $(gifImage).attr("class", "animal-gif");

                $(animalDiv).append(p);
                $(animalDiv).append(gifImage);
                $(animalDiv).attr("data-fav", "no");
                $("#gif-dump").append(animalDiv);
            }
        });

    });

    $(document).on("click", ".animal-gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $(document).on('dragend', '.animal-div', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var favorite = $(this).attr("data-fav");
        if (favorite === "no") {
            $(this).appendTo(".dropzone");
            $(this).attr("data-fav", "yes");
        } else if (favorite === "yes") {
            $(this).appendTo("#gif-dump");
            $(this).attr("data-fav", "no");
        } else {
            
        }
       
    });
    

    renderButtons();
});