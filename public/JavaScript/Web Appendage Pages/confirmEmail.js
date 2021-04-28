var emailButton = document.getElementById("resendMail");
emailButton.disabled = true;
document.getElementById('countdown-timer').innerHTML =
    005 + ":" + 00;
startTimer();

function startTimer() {
    var presentTime = document.getElementById('countdown-timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    document.getElementById('countdown-timer').innerHTML =
        m + ":" + s;
    if (m < 0) {
        document.getElementById('countdown-timer').innerHTML = "0:00";
        emailButton.disabled = false;
        emailButton.style.cursor = "pointer";
    }
    else {
        setTimeout(startTimer, 1000);
    }
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
}


$('#resendMail').on('click', (e) => {
    e.preventDefault()
    e.stopPropagation()

    $.ajax({
        type: "POST",
        url: "/resendEmail",
        data: { 'UUID': document.getElementById("resendMail").value },
        dataType: "json", // it defines the return data type
        error: ((error) => {
            if (error) {
                toastr.error(error.responseJSON['message'])
            }
        }),
        success: ((response) => {
            if (response) {
                console.log(response['UUID'])
                $('#aaa').html(response['UUID'])
                document.getElementById("resendMail").value = response['UUID']
                toastr.success(response['successMessage'])
            }
        })
    });
})
