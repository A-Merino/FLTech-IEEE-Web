// jquery document ready shorthand
$(function () {
    // run an async function (looks weird but it works)
    (async() => {
        // jquery getJSON function to grab file from our data folder
        $.getJSON('./../data/officers.json', function(data){
            let html = ``; // create string to hold html data 
            data.map(year => {
                html += `<div id="year${year.year}">
                <h1>Branch Officers ${year.year}</h1>
                <profile-list>`
                year.officers.map(person => {
                    html += `
                    <profile-card>
                        <img alt="${person.alt}" src="${person.image}">
                        <name class="notranslate">${person.name}</name>
                        <group-title>${person.title}</group-title>
                        <a href="tel:${person.phone.replace(" ", "").replace("(", "").replace(")", "")}"><phone>${person.phone}</phone></a>
                        <a href="mailto:${person.email}"><email>${person.email}</email></a>
                    </profile-card>
                    `;
                });
                html += `</profile-list></div>`
            })
            

            // add all the data at once to carousel because it is faster this way
            $("page-content").prepend(html);
        });
        $.getJSON('./../data/others.json', function(data){
            let html = ``; // create string to hold html data 
            data.map(other => {
                html += `<div id="${other.header.replace(" ", "-")}">
                <h1>${other.header}</h1>
                <profile-list>`
                other.people.map(person => {
                    html += `
                    <profile-card>
                        <img alt="${person.alt}" src="${person.image}">
                        <name class="notranslate">${person.name}</name>
                        <group-title>${person.title}</group-title>
                        <a href="tel:${person.phone.replace(" ", "").replace("(", "").replace(")", "")}"><phone>${person.phone}</phone></a>
                        <a href="mailto:${person.email}"><email>${person.email}</email></a>
                    </profile-card>
                    `;
                });
                html += `</profile-list></div>`
            })
            

            // add all the data at once to carousel because it is faster this way
            $("foot").before(html);
            $("#loading").fadeOut(750, function (){
                $(this).remove()
            });
        });
    })();

    

});