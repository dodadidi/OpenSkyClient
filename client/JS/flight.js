$(document).ready(function () {
    getAllFlights();
    operationsListeners();
});

function getAllFlights() {
    $.ajax({
        url: 'https://opensky1234.herokuapp.com/api/flights/',
        type: 'GET',
        success: function (flights) {
            recreateTable(flights);
        }
    });
}

function recreateTable(flights) {
    $("tbody").empty().remove();
    const flightsLen = flights.length;
    if (flightsLen) {
        $('table').append('<tbody></tbody>');
        for (let i = 0; i < flightsLen; i++) {
            let tableRow = "<tr>"
            tableRow += "<td>" + flights[i].flight_number + "</td>";
            tableRow += "<td>" + flights[i].departure_date+"</td>";
            tableRow += "<td>" + flights[i].time+"</td>";
            tableRow += "<td>" + flights[i].departure_city + "</td>";
            tableRow += "<td>" + flights[i].landing_city + "</td>";
            tableRow += "<td>" + flights[i].company_name + "</td>";
            tableRow += "<td>" + flights[i].price + "</td>";
            tableRow += "<td>" + flights[i].stops + "</td>";
            tableRow += "<td><a href =./feedbacksList.html>Feedback</a></td>";
            tableRow += "<td class='pointer' onclick='buyFlight(" + JSON.stringify(flights[i]) + ")'>Buy</td>";
            tableRow += "<td><span class='pointer' id='like-" + flights[i].flight_number + "' onclick='likeCLicked(" + flights[i].flight_number + ")'><i class='far fa-heart'></i></span></td>"
            tableRow += "</tr>";
            $("tbody").append(tableRow);

        }
    }
}

function likeCLicked(flightNumber) {

    //Need to check the status of the like from the DB
    // if(like) {

    // } else {

    // }

    $("#like-" + flightNumber).html("<i class='fas fa-heart'></i>");
}

function buyFlight(flightObj) {

    if(confirm('Are you sure you want to purchase this flight?')) {

        let msg = "Order completed successfully";
        msg += "Flight number: " + flightObj.flight_number + " \r";
        msg += "Time: " + flightObj.departure_date +" "+ flightObj.time + " \r";
        msg += "Departure city: " + flightObj.departure_city + " \r";
        msg += "Landing city: " + flightObj.landing_city + " \r";
        msg += "Company name: " + flightObj.company_name + " \r";
        msg += "Price: " + flightObj.price + " \r";
        msg += "Stops: " + flightObj.stops + " \r";
        alert(msg);
    } 
}

function getAllFlightsByFilter(str) {
    $.ajax({
        url: `https://opensky1234.herokuapp.com/api/flights/${str}`,
        type: 'GET',
        success: function(flights) {
            recreateTable(flights);
        }
    });
}

function operationsListeners() {

    $("#searchFlights").click(() => {
        const landing_city = $("#inputLanding_city").val();
        const departure_city = $("#inputDeparture_city").val();
        const stops = $("#inputStops").val();
        const departure_date = $("#inputDeparture_date").val();
        let str = "?";
        if(departure_date)
        str += `departure_date=${departure_date}`;
        if(stops)
        str += `stops=${stops}`;
        if(landing_city)
        str += `&landing_city=${landing_city}`;
        if(departure_city)
        str += `&departure_city=${departure_city}`;
        else if(!departure_date&&!stops && !landing_city && !departure_city){
            str = "";
        }
        getAllFlightsByFilter(str);
    });
}





