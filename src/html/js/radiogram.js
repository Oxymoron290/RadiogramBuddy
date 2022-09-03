
function autofill() {
    fillNextMessageId();
    document.getElementById('gram-precedence').value = "R"; // TODO: hx default
    document.getElementById('gram-handling-instructions').value = "HXG"; // TODO: hx default
    fillStationDetails();

    calcCheck();
    let gramTimeFiled = document.getElementById('gram-time-filed');
    let gramDateFiled = document.getElementById('gram-date-filed');
    
    if(gramTimeFiled.value.trim().length > 0) fillNow(gramTimeFiled)
    if(gramDateFiled.value.trim().length > 0) fillToday(gramDateFiled)
}

function fillStationDetails(){
    // TODO: Get from storage
    document.getElementById('gram-station-of-origin').value = "N5OXY";
    document.getElementById('gram-place-of-origin').value = "BEDFORD, TX";
}

function fillNextMessageId() {
    // TODO: actually get from storage
    let min = 100;
    let max = 9999;
    min = Math.ceil(min);
    max = Math.floor(max);
    let res = Math.floor(Math.random() * (max - min + 1) + min);

    document.getElementById('gram-number').value = res;
}

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

function calcCheck(){
    let count = 0;
    for (var i = 0; i < gramBodyElements.length; i++) {
        if(gramBodyElements[i].value.trim().length > 0) {
            count ++;
        }
    }
    document.getElementById('gram-check').value = count;
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
    element.value=[
        date.toLocaleString('en-US', {month: 'short', timeZone: 'UTC' }),
        padTo2Digits(date.getUTCDate()),
    ].join(' ');
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

async function handleSubmit(event) {
    // TODO: validate check digit
    var data = {
        "gram-number": document.getElementById('gram-number').value,
        "gram-precedence": document.getElementById('gram-precedence').value,
        "gram-handling-instructions": document.getElementById('gram-handling-instructions').value,
        "gram-station-of-origin": document.getElementById('gram-station-of-origin').value,
        "gram-check": document.getElementById('gram-check').value,
        "gram-place-of-origin": document.getElementById('gram-place-of-origin').value,
        "gram-place-of-origin": document.getElementById('gram-place-of-origin').value,
        "gram-time-filed": document.getElementById('gram-time-filed').value,
        "gram-date-filed": document.getElementById('gram-date-filed').value,
        "gram-recipient-address1": document.getElementById('gram-recipient-address1').value,
        "gram-recipient-address2": document.getElementById('gram-recipient-address2').value,
        "gram-recipient-address3": document.getElementById('gram-recipient-address3').value,
        "gram-recipient-telephone": document.getElementById('gram-recipient-telephone').value,
        "gram-receiver-callsign": document.getElementById('gram-receiver-callsign').value,
        "gram-receiver-phone": document.getElementById('gram-receiver-phone').value,
        "gram-receiver-name": document.getElementById('gram-receiver-name').value,
        "gram-receiver-address": document.getElementById('gram-receiver-address').value,
        "gram-receiver-city-state-zip": document.getElementById('gram-receiver-city-state-zip').value,
        "word-01": document.getElementById('word-01').value,
        "word-02": document.getElementById('word-02').value,
        "word-03": document.getElementById('word-03').value,
        "word-04": document.getElementById('word-04').value,
        "word-05": document.getElementById('word-05').value,
        "word-06": document.getElementById('word-06').value,
        "word-07": document.getElementById('word-07').value,
        "word-08": document.getElementById('word-08').value,
        "word-09": document.getElementById('word-09').value,
        "word-10": document.getElementById('word-10').value,
        "word-11": document.getElementById('word-11').value,
        "word-12": document.getElementById('word-12').value,
        "word-13": document.getElementById('word-13').value,
        "word-14": document.getElementById('word-14').value,
        "word-15": document.getElementById('word-15').value,
        "word-16": document.getElementById('word-16').value,
        "word-17": document.getElementById('word-17').value,
        "word-18": document.getElementById('word-18').value,
        "word-19": document.getElementById('word-19').value,
        "word-20": document.getElementById('word-20').value,
        "word-21": document.getElementById('word-21').value,
        "word-22": document.getElementById('word-22').value,
        "word-23": document.getElementById('word-23').value,
        "word-24": document.getElementById('word-24').value,
        "word-25": document.getElementById('word-25').value,
        "signature": document.getElementById('signature').value,
        "received-from": document.getElementById('received-from').value,
        "received-date": document.getElementById('received-date').value,
        "received-time": document.getElementById('received-time').value,
        "sent-to": document.getElementById('sent-to').value,
        "sent-date": document.getElementById('sent-date').value,
        "sent-time": document.getElementById('sent-time').value
    };

    console.log(JSON.stringify(data, null, 2));
    await window.radiogram.save(data);
}

const gramBodyElements = document.querySelectorAll('[id^="word"');

for (var i = 0; i < gramBodyElements.length; i++) {
    gramBodyElements[i].addEventListener('keydown', (event) => {
        if (event.keyCode === 32) {
            let id = Number(event.target.id.split('-')[1]) + 1;
            let target = "word-" + id.pad();
            if(id <= 25) {
                document.getElementById(target).focus();
            }
        }
    })
}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}