// global variables
let carousel_pos = 0

// jquery document ready shorthand
$(function () {
    // run an async function (looks weird but it works)
    (async() => {
        // jquery getJSON function to grab file from our data folder
        await $.getJSON('./../data/carousel.json', function(data){
            let html = ``; // create string to hold html data 
            data.map(image => {
                html += `<img alt="${image.alt}" src="${image.url}">`;
            })
            // add all the data at once to carousel because it is faster this way
            $("#carousel").html(html);
            // refresh carousel on load
            refreshCarousel();
            $("#loading").fadeOut(750, function (){
                $(this).remove()
            });
        });

        
    })();

    

});


// add an arrow-container click listener
$('arrow-container').on("click", function (event){
    // determine right (+1) or left (-1) shift using JS ternary operator
    carousel_pos += $(event.target).is("#right-arrow") ? 1 : -1
    refreshCarousel() // refresh the carousel

});

function refreshCarousel() {
    // get carousel element
    let carousel = document.getElementById("carousel");
    // get children of carousel
    let carousel_children = carousel.children;
    // initialize offset
    let offset = 0;
    if (carousel_pos > carousel_children.length-1){
        carousel_pos = 0 // reset position to 0 if over length
    }
    if (carousel_pos < 0){
        // reset position to end if at beginning of list
        carousel_pos = carousel_children.length-1  
    }
    // go through each image and get width
    for (let i = 0; i < carousel_pos; i++){
        offset += carousel_children[i].width + 8

        
    }
    let slide = 200;
    if (offset !== 0) {
        slide = (carousel.offsetWidth * 0.5) - offset - (carousel_children[carousel_pos].offsetWidth * 0.5);
    }
    // calculate how much to move
    carousel.style = `transform: translate(${slide}px);`

    
}


let t
window.onresize = function() {
    clearTimeout(t)
    t = setTimeout(refreshCarousel, 500)
}