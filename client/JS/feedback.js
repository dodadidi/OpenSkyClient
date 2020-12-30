$(document).ready(function () {
    getAllFeedbacks();
    operationsListeners();
});

function getAllFeedbacks() {
    $.ajax({
        url: 'https://opensky1234.herokuapp.com/api/feedbacks',
        type: 'GET',
        success: function (feedbacks) {
            recreateTable(feedbacks);
        }
    });
}

function recreateTable(feedbacks) {
    $("tbody").empty().remove();
    const feedbacksLen = feedbacks.length;
    if (feedbacksLen) {
        $('table').append('<tbody></tbody>');
        for (let i = 0; i < feedbacksLen; i++) {
            let tableRow = "<tr>"
            tableRow +="<td>"+feedbacks[i].published_date+"</td>"
            tableRow +="<td>"+feedbacks[i].company_name+"</td>"
            tableRow +="<td>"+feedbacks[i].feedback+"</td>"
            tableRow +="<td>"+feedbacks[i].rating+"</td>"
            $("tbody").append(tableRow);
        }
    }
}

function getAllFeedbacksByFilter(str) {
    $.ajax({
        url: `https://opensky1234.herokuapp.com/api/feedbacks/${str}`,
        type: 'GET',
        success: function(feedbacks) {
            recreateTable(feedbacks);
        }
    });
}

function cleanUpdateData(data) {
    const obj = data;
    for (var propName in obj) {
        if (obj[propName] === '') {
          delete obj[propName];
        }
      }
    return obj;
}

function operationsListeners() {

    $("#searchFeedbacks").click(() => {
        const company_name = $("#inputCompany_name").val();
        const published_date = $("#inputPublished_date").val();
        let str = "?";
        if(company_name)
        str += `&company_name=${company_name}`;
        if(published_date)
        str += `&published_date=${published_date}`;
        else if(!company_name && !published_date){
            str = "";
        }
        getAllFeedbacksByFilter(str);
    });

}


