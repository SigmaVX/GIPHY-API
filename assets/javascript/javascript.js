
    var name="";
    var queryURL="";

    // Array of GIF Searches
    var gifSearch = ["Lust", "Greed", "Sloth", "Wrath", "Envy", "Pride", "Gluttony"];
    var gifImage = ["http://via.placeholder.com/100x100","http://via.placeholder.com/100x100","http://via.placeholder.com/100x100","http://via.placeholder.com/100x100","http://via.placeholder.com/100x100","http://via.placeholder.com/100x100","http://via.placeholder.com/100x100"];

    // Renders The Array Buttons
    function makeDefaults() {
    
        // Clears Div Before Adding Buttons | Prevents Duplicates
        $("#iconHolder").empty();
        
        for (i=0; i < gifSearch.length ; i++ ){
            
            var newDiv = $("<div>").html(gifSearch[i]+"<br>");
            newDiv.attr("class", "col-md-3 col-6 iconText text-center");
            newDiv.attr("name", gifSearch[i]);
            $("#iconHolder").append(newDiv);
            
            var newImage = $("<img>").attr("src", gifImage[i]);
            newImage.attr("class", "img-circle img-responsive iconImage");
            newImage.attr("id", "iconImg");
            $(newDiv).append(newImage);
        }
    }

    makeDefaults();

    // Function To Make New Search Term
    function newSearch(){
        var term = $("#gifSearch").val().trim();
        var newSearch = $("<div>").html(term);
        gifSearch.push(term);
        console.log(gifSearch);
        newSearch.attr("class", "col-md-3 col-6 iconText text-center");
        newSearch.attr("name", term);
        $("#iconHolder").append(newSearch);
        var newSearchImage = $("<img>").attr("src", "http://via.placeholder.com/100x100");
        newSearch.append(newSearchImage);

    }
    

    // Function Searches For GIFs    
    function gifPull(){
    // var name = $(this).attr("name");
    name = "greed";
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&limit=10&rating=g&api_key=QZDf0QjsN3A0gN7rgrTgf5sCJHGNw4tj";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            
            for(i=0; i < 26 ; i++){
                var holder = $("<div>").attr("class", "gifHolder col-12 col-md-2");
                $("#iconResults").append(holder);
                
                var gif = $("<img>").attr("src", response.data[i].images.fixed_width.url);
                holder.append(gif);
                gif.hide();
                
                var still = $("<img>").attr("src", response.data[i].images.fixed_width_still.url);
                holder.append(still);
                
                var rating = $("<div>").html(response.data[i].rating);
                rating.attr("class", "rating");
                holder.append(rating);
            }
        });
    }

  gifPull();



  // This function handles events where the add movie button is clicked
  $("#add-movie").on("click", function(event) {
    event.preventDefault();
    
    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

  });

  
