

var currentTheme = "cats";
var themeArray = ["cats","random"];
var postedThemes = [];

$(document).on("load",populateButtons(themeArray));
$("#currentTheme").html("Current Theme: " + currentTheme);






//what happens when you 'submit' either the form group or text area
//of the user input area
$("#input-form").on("submit", function (event) {
    event.preventDefault();
    var inputText = $("#input-text").val().trim();
    if (inputText == ""){
        return false; //prevent blank submission
      }
    console.log("inputTExt received: "+inputText);
    $("#currentTheme").html("Current Theme: " + inputText);
    $("#input-text").text("");
 //   currentTheme=$(this).data("value");
    currentTheme = inputText.toLowerCase();
    newThemeSearch = currentTheme.replace(" ","+");
    console.log("theme after click: " +currentTheme);
      //sets URL for API query
      console.log(currentTheme);
      if (themeArray.indexOf(currentTheme)==-1) {
          console.log("theme not found, adding button");
          addThemeButton(currentTheme,newThemeSearch);
      }
    });







//$("#currentTheme").html("Current Theme: " + currentTheme);
    //function for what happens when we click a get-some class element (these will be buttons)


    //what happens when you click a theme button
    //update the current theme
    //add display div for that theme if it is not currently posted
    //call getImages function

 $("#themeDiv").on("click","button", function (event) {
 //   event.preventDefault();
    currentTheme=$(this).data("value");
    $("#currentTheme").html("Current Theme: " + currentTheme);
    searchString=$(this).data("search");
    offsetValue=$(this).data("offset");
    var newOffset=offsetValue+5;    
    console.log("new offset: "+ newOffset);
    $(this).data("offset",newOffset);
    console.log("theme after click: " +currentTheme);
     

      if (postedThemes.indexOf(currentTheme)==-1) {
          console.log("theme not found, adding div");
          addNewTheme(currentTheme);
          console.log(themeArray);
          console.log(postedThemes);
          getImages(searchString,offsetValue);
      }
      else {getImages(searchString,offsetValue)};
      

      

    });
    function getImages(searchString,offsetValue){
      
        console.log("made it here to get Images");
      console.log("search, offset: "+ searchString,offsetValue);
      console.log(themeArray);
      console.log(postedThemes);
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=5&rating=g&q=" + searchString + "&offset="+offsetValue ;
      console.log("url: "+queryURL);
      //get the gifs from the query URL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      //what to do after the GET is complete:
      //    if it is a new theme:
      //add new theme div 
      //add a new theme button 
      //add the theme to the themeArray div
      //add pictures to div matching the current theme

      .then(function(response) {

            console.log("url after GET: "+queryURL);
            console.log(response.data[0]);
            console.log("response.length: "+response.data.length);
            console.log("gif URL: "+ response.data[0].images["fixed_width_downsampled"].url)
            
            //create new images
            
            for (var i = 0;i<response.data.length;i++) { 
                        console.log(i);
                    //create new image div
                var imageUrl = response.data[i].images["fixed_width_downsampled"].url;
                var staticUrl = response.data[i].images["fixed_width_still"].url;
                var quickTag=response.data[i].slug;
                var imageHolder = $("<div>").attr("class","gif-holder");
             //   var altTitle = currentTheme+"Image"+i;

             //      imageHolder.attr("id",altTitle);

             var imgLink = $("<div>").html("<a href="+imageUrl+" download='"+quickTag+"'>Download Me</a>");
                   imageHolder.append(imgLink);
                    
                    var newImage = $("<img>");
                    console.log("just created the new image element");
                    //assign attributes of new image
                    newImage.attr("src", imageUrl);
                    newImage.attr("data-still", staticUrl);
                    newImage.attr("data-animate", imageUrl);
                    newImage.attr("class", "gifpic");
                    newImage.attr("href","data:image/gif");
                    newImage.attr("download",quickTag+".gif");
                    newImage.attr("data-state","animate");
           //         newImage.attr("ondblclk", "removeMe(this)");
            //     newImage.attr("ondblclk", "downloadMe(imageUrl)");
            //     newImage.attr("alt", altTitle);
                    newImage.attr("style","height:175px, width:auto");
                    imageHolder.append(newImage);
                    // $("#"+altTitle+"").html("<a class='download-link' href="+imageUrl+" download="+altTitle+">Download</a>")
            //       $("#"+imageHolder+"").append(newImage);

                    //prepend the new image into the images div
                    var divID = currentTheme;
                    console.log("divID:" + divID);
                    $("#"+divID+"").append(imageHolder);

            };//end for loop
      }) //end THEN  function
    
    } //end getImages

  
    $(document).on("dblclick",".gifpic",function() {
        $(this).parent().remove();
       
    })
    $(document).on("click",".gifpic",function() {
       
        if ($(this).attr("data-state")=="animate") {
            $(this).attr("src",$(this).data("still"));
            $(this).attr("data-state","still");
        }
        else {
            $(this).attr("src",$(this).data("animate"));
            $(this).attr("data-state","animate");
        }

    })

    

    // $(".gifpic").on("dblclk",function(event) {
    //     removeMe(this);
    // })

    // $(".btn-theme-submit").on("click", function(event) {
     
    //     event.preventDefault();

    //     // grab the text from the input field, set the current theme, 
    //     var inputText = $("#input-text").val().trim();
    //     currentTheme = inputText.toLowerCase();
    //     newThemeSearch = currentTheme.replace(" ","+");
    //     $("#currentTheme").text("Current theme: "+currentTheme);
  
    //     //add the new theme into the themes array
    //    addThemeButton(currentTheme,newThemeSearch);
    //     getImages(newThemeSearch);
    //   });

    function removeMe(element) 
    {
        $(element).remove();
    }



    function addThemeButton(currentTheme,newThemeSearch) 
    {
        if (themeArray.indexOf(currentTheme)==-1){ //check theme array to see if currentTheme is missing
            themeArray.push(currentTheme);
            var newButton = $("<button>");
            newButton.text(currentTheme);
            newButton.attr("id",currentTheme + "button");
            newButton.attr("data-value",currentTheme);
            newButton.attr("data-offset",0);
            newButton.attr("data-search",newThemeSearch);
            newButton.attr("class","btn-lg btn-get-some");
            $("#themeDiv").append(newButton);
        }
        else {
            
        }
            
    }
    
function addNewTheme(){
            var newThemeDiv=$("<div>");
            newThemeDiv.html("<h3 class='theme-header' data-value='"+currentTheme+"'>Theme: "+ currentTheme + "</h3>");
            var newID=currentTheme;
            console.log("newID",newID);
            newThemeDiv.attr("id",""+newID+"");
            newThemeDiv.attr("class","theme-div");
            newThemeDiv.attr("data-value",currentTheme)
            $("#images").prepend(newThemeDiv);
    //        addThemeButton(currentTheme);
            postedThemes.push(currentTheme);
            console.log("posted Themes updated: "+postedThemes);
           
};

    function populateButtons(targetArray) 
    {
        
        for (var i = 0;i<targetArray.length;i++) {
            var label =targetArray[i];
            var newButton = $("<button>");
            newButton.text(label);
            newButton.attr("id",label+"button");
            newButton.attr("data-value",label);
            newButton.attr("data-offset",0);
            newButton.attr("data-search",label);
            newButton.attr("class","btn-lg btn-get-some");
            $("#themeDiv").append(newButton);
        };
    }
//function to remove entire theme div if you click on the heading

    $(document).on("click", ".theme-header", function() {
       
         var divID = $(this).data("value");
         $("#"+divID+"").remove();
         var buttonID = divID+"button";
         $("#"+buttonID+"").remove();
         $("#themeDiv").html("");
    //    $("#"+divID+"").remove();//removes the theme div
        var themeIndex = themeArray.indexOf(divID);
        var postedIndex = postedThemes.indexOf(divID);
    //delete theme from themeArray and list of posted themes
        themeArray.splice(themeIndex,1);
        postedThemes.splice(postedIndex,1);
        populateButtons(postedThemes);
    //     $("#"+buttonID+"").remove(); //removes associated button
         
    //    console.log(postedThemes);
      });