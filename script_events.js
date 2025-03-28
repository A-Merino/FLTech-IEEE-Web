var upcomingHTML = document.getElementById("Upcoming");
var pastHTML = document.getElementById("Past");

const formatDate = date => new Date(date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(' at ', '<br>');

async function getEngageEvents() {
    const date = new Date();
    const dateStr = date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0') + "T" + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0');
    const urlUpcoming = "https://floridatech.campuslabs.com/engage/api/discovery/event/search?endsAfter=" + dateStr + "&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=&skip=0&organizationIds[0]=268632"
    const urlPast = "https://floridatech.campuslabs.com/engage/api/discovery/event/search?endsBefore=" + dateStr + "&orderByField=endsOn&orderByDirection=descending&status=Approved&take=15&query=&skip=0&organizationIds[0]=268632"
    console.log(urlUpcoming);
    var upcomingEvents = await fetchWithCorsBypass(urlUpcoming);
    var pastEvents = await fetchWithCorsBypass(urlPast);
    if (upcomingEvents.length > 0) {
        console.log(upcomingEvents);
    } else {
        upcomingHTML.innerHTML += "<p>There are no public upcoming events...</p>";
    }
    if (pastEvents.length > 0) {
        pastEvents.forEach(element => {
            var imgURL = "images/ieee-blue.svg"
            if (element.imagePath != null) imgURL = "https://se-images.campuslabs.com/clink/images/" + element.imagePath + "?preset=med-w";
            var name = element.name;
            var location = element.location;
            var dateTime = formatDate(element.startsOn) + " EST";
            var eventURL = "https://floridatech.campuslabs.com/engage/event/" + element.id;
            pastHTML.innerHTML += "<a href=\"" + eventURL + "\"><event><img src=\"" + imgURL + "\"><name>" + name + "</name><location class=\"notranslate\">" + location + "</location><dateTime class=\"notranslate\">" + dateTime + "</dateTime></event></a>";
        });
    } else {
        pastHTML.innerHTML += "<p>There are no public past events...</p>";
    }
}

async function fetchWithCorsBypass(url) {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        const content = JSON.parse(data.contents);
        return content.value;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}




window.onload = getEngageEvents();