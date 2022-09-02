function toggleButtons(){
    const buttons = document.getElementsByTagName('button');
    for (const button of buttons) {
        if (button.style.display === "none") {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    }
}

function fillNow(element){
    const date = new Date();
    element.value= [
        padTo2Digits(date.getUTCHours()),
        padTo2Digits(date.getUTCMinutes())
    ].join(':');
}

function fillToday(element){
    const date = new Date();
    // element.value=[
    //     date.getFullYear(),
    //     padTo2Digits(date.getUTCMonth() + 1),
    //     padTo2Digits(date.getUTCDate()),
    // ].join('-');
    element.value=[
        date.toLocaleString('en-US', {month: 'short', timeZone: 'UTC' }),
        padTo2Digits(date.getUTCDate()),
    ].join(' ');
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}