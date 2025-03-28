var ham = document.getElementById("hamburger")
var dropdown = document.querySelector("dropdown")
var dropdown_list = document.querySelector("dropdown ul")
var right_arrow = document.getElementById("right-arrow")
var left_arrow = document.getElementById("left-arrow")
var carousel = document.getElementById("carousel")
var carousel_children
if (carousel) carousel_children = carousel.children
var carousel_pos = 1


document.addEventListener("click", function(event) {
    if (event.target == ham) {
        dropdown.classList.toggle("untucked")
        if (dropdown.classList.contains("untucked")) {
            dropdown.style = "transform:translate(0px,0px)"
        } else {
            dropdown.style = "transform:translate(0px,-"+dropdown_list.offsetHeight+"px)"
        }
    } else {
        if (dropdown.classList.contains("untucked")) {
            dropdown.style = "transform:translate(0px,-"+dropdown_list.offsetHeight+"px)";
            dropdown.classList.remove("untucked");
        }
    }
    if (event.target == right_arrow || event.target == left_arrow) {
        var offset = 0
        var shifter = 1
        if (event.target == left_arrow) shifter = -1
        carousel_pos += shifter
        if (carousel_pos >= carousel_children.length-1) carousel_pos = 1
        if (carousel_pos < 1) carousel_pos = carousel_children.length-2
        for (var i = 0; i < carousel_pos; i++) offset += carousel_children[i].offsetWidth + 8
        let slide = Math.round(-offset + (0.5*carousel.offsetWidth) - (0.5*carousel_children[carousel_pos].offsetWidth));
        carousel.style = "transform: translate(" + slide + "px);"
    }
})

function refreshCarousel() {
    if (carousel) {
        var offset = 0
        if (carousel_pos >= carousel_children.length-1) carousel_pos = 1
        if (carousel_pos < 1) carousel_pos = carousel_children.length-2
        for (var i = 0; i < carousel_pos; i++) offset += carousel_children[i].offsetWidth + 8
        let slide = Math.round(-offset + (0.5*carousel.offsetWidth) - (0.5*carousel_children[carousel_pos].offsetWidth));
        carousel.style = "transform: translate(" + slide + "px);"
    }
}

window.onload = (event) => {
    refreshCarousel();
};

var t
window.onresize = function() {
    clearTimeout(t)
    t = setTimeout(refreshCarousel, 500)
}