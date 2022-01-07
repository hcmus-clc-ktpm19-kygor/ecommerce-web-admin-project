$(document).ready(function () {
    $.ajax({
        url: 'localhost:8000/order/api/sales',
        method: 'get',
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
        },
        headers: {"Access-Control-Allow-Origin": "*"}
    });

})