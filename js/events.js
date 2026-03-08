
const formatDate = date => new Date(date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(' at ', '<br>');

$(function() {
    (async => {
        $.getJSON("./../data/events.json", function(data){
            let upcomingHTML = `` // init html for future events
            let pastHTML = `` // init html for past events
            const now = new Date(); // get the current date
            data.map(et => {
                const date = new Date(et.date); // get date of event

                // create the html for the card
                const card = `<a href="${et.link}">
                <event>
                    <img src="${et.image}"/>
                    <name>${et.name}</name>
                    <location class="notranslate>${et.location}</location>
                    <datetime class="notranslate">${et.date}<br/>${et.time}</datetime>
                    </event></a>`

                // the precision of the comparision is by day 
                // if in the past (comparing seconds since 1970) then add to past
                if (now > date){
                    pastHTML += card
                } else { // else add to future
                    upcomingHTML += card
                }
                    
            }) 
            // insert into the html of the event lists
            $("#Upcoming").html(upcomingHTML); 
            $("#Past").html(pastHTML);
        });
    })();


    $("#loading").fadeOut(750, function (){
                $(this).remove()
    });
})

