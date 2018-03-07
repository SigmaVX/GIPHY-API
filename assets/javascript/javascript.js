
    var name="";
    var queryURL="";

    // Array of GIF Searches
    var gifTitle = ["Lust", "Greed", "Sloth", "Wrath", "Envy", "Pride", "Gluttony"];
    var gifSearch = ["bling", "Mr Burns", "Homer Simpson", "wrath", "Envy", "Pride", "South Park"];
    var gifImage = ["./assets/images/lust.png","./assets/images/greed.png","./assets/images/sloth.png","./assets/images/wrath.png","./assets/images/envy.png","./assets/images/pride.png","./assets/images/gluttony.png"];

    // Renders The Array Buttons
    function makeButtons() {
    
        // Clears Div Before Adding Buttons | Prevents Duplicates
        $("#iconHolder").empty();
        
        for (i=0; i < gifSearch.length ; i++ ){
            
            var newDiv = $("<div>");
            newDiv.attr("class", "col-md-3 col-6 my-2 iconDiv text-center");
            newDiv.attr("search-term", gifSearch[i]);
            $("#iconHolder").append(newDiv);

            var newTerm = $("<p>").html(gifTitle[i]+"<br>");
            newTerm.attr("class", "col-12 text-center titles");
            $(newDiv).append(newTerm);
            
            var newImage = $("<img>").attr("src", gifImage[i]);
            newImage.attr("class", "img-responsive iconImage");
            newImage.attr("id", gifImage[i]);
            $(newDiv).append(newImage);
        }
    }

    

    // Function To Make New Search Term
    function newButton(){
        var term = $("#gifSearch").val().trim();
      

        // Adds To Array
        gifSearch.push(term);
        gifTitle.push(term);
        gifImage.push("./assets/images/misc.png");
        console.log(gifSearch);
        console.log(gifImage);
        
        name = term;
        console.log("Name: " + name);  
        
        makeButtons();
        gifPull();
        $("#clickMsg").show();
        $("#startImage").hide();

    }

    // Function Searches For GIFs    
    function gifPull(){

    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&limit=10&rating=pg&api_key=QZDf0QjsN3A0gN7rgrTgf5sCJHGNw4tj";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            $("#iconResults").empty();
            $("#iconResults").show();
            

            for(i=0; i < 10 ; i++){

                var holder = $("<div>").attr("class", "gifHolder col-12 col-md-3 text-center");
                $("#iconResults").append(holder);
                
                var gif = $("<img>").attr("src", response.data[i].images.fixed_width_still.url);
                gif.attr("class", "gifs my-2 mx-1");
                gif.attr("data-motion", response.data[i].images.fixed_width.url);
                gif.attr("data-still", response.data[i].images.fixed_width_still.url);
                gif.attr("state", "still");
                gif.attr("id", "gif"+i);
                holder.append(gif);
                
                var rating = $("<div>").html("Rating: " + response.data[i].rating.toUpperCase());
                rating.attr("class", "rating text-center");
                holder.append(rating);
            }
        });
    }
    

    // Searchs Based On Selected Icon
    $(document).on("click", ".iconDiv", function(){
        name = $(this).attr("search-term");
        gifPull();
        $("#clickMsg").show();
        $("#startImage").hide();
    });
        

    // Toggle GIF
    $(document).on("click", ".gifs", function(){
        
        console.log(this);

        var state = $(this).attr("state");
        
        if(state==="still"){
            $(this).attr("src", $(this).attr("data-motion"));
            $(this).attr("state", "motion");
        }

        if(state==="motion"){
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("state", "still");
        }
    });


// Adds New Search Term 
  $("#enterBtn").on("click", function(event) {
        event.preventDefault();
        newButton();
        $("#gifSearch").val("");
        $("#clickMsg").show();
        $("iconResults").show();
        $("#startImage").hide();
  });


// Page Set-Up On Load
    makeButtons();
    $("#clickMsg").hide();
    $("#iconResults").hide();
   
  
