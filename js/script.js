let ham = document.getElementById("hamburger")
let dropdown = document.querySelector("dropdown")
let dropdown_list = document.querySelector("dropdown ul")



document.addEventListener("click", function(event) {
    if (event.target === ham) {
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
})







