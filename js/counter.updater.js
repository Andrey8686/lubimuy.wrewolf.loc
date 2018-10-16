/**
 * Created by svc on 08.08.2018.
 */

function updateCouter(percent, count) {
    var charges = $('.prize-block__charge');
    $('#percentage').html(percent + "% призов");
    for (var i = 0; i<charges.length; i++) {
        if (i < count) {
            $(charges[i]).addClass("prize-block__charge_" + parseInt(i+1));
        } else {
            $(charges[i]).removeClass("prize-block__charge_" + parseInt(i+1));
        }
    }
}
function getCounterUpdates() {
    $.ajax({
        url: "/remained/"
    })
        .done(function( data ) {
            var percent = parseInt(data.start_amount) === 0
                ? 0
                : Math.round(100*parseInt(data.amount)/parseInt(data.start_amount));

            percent = percent > 100 ? 100 : percent;

            var count = parseInt(data.amount) === 0
                ? 0
                : data.amount/(data.start_amount/10);

            updateCouter(percent, count);
            var date = moment().add(data.finish, 's');
            $("#timer").countdown(date.valueOf());

        });
    var x = new Date();
    var currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60;
}