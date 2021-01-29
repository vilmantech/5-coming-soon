function clock(selector, deadline) {

    // input validation
    if (typeof selector !== 'string' ||
    selector === ''){
        console.error('ERROR: natinkamo formato slektorius.');
        return false;
    }
    if (typeof deadline !== 'string' ||
    deadline === '' ||
    !isFinite((new Date (`2000-${deadline}`)).getTime())) {
        console.error('ERROR: netinkamo formato deadline reiksme.');
        return false
    }

// logic
    const clockDOM = document.querySelector(selector);
    if (!clockDOM) {
        console.error('ERROR: pagal pateikta selktoriu nepavyko rasti norimo DOM elemento');
        return false;
    }
    
    let allValuesDOM = null;
    let numbers = calcTime(deadline);
    const labels = ['days', 'hours', 'minutes', 'seconds'];
    let HTML = '';

    for (let i = 0; i < 4; i++) {
        HTML += `<div class="time">
        <div class="value">${numberFormat(numbers[i])}</div>
        <div class="label">${labels[i]}</div>
        </div>`;
    }
    clockDOM.innerHTML = HTML;
    allValuesDOM = document.querySelectorAll(`${selector}.value`);

    setInterval(function() {
        numbers = calcTime(deadline);
        for (let i = 0; i < 4; i++) {
            allValuesDOM[i].innerText = numberFormat(numbers[i]);
        }
    }, 1000);
}

function numberFormat(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function calcTime(deadline){
    const date = new Date();
    const now = Date.now();
    let year = date.getFullYear();
    let fulldeadline = `${year} + ${deadline}`;
    let fulldeadlinemiliseconds = (new Date(fulldeadline)).getTime();


    if (fulldeadlinemiliseconds < now) {
        year++;
        fulldeadline = `${year}-${deadline}`;
        fulldeadlinemiliseconds = (new Date(fulldeadline)).getTime();
    }

    const diff = fulldeadlinemiliseconds - now;
    const seconds = Math.round(diff / 1000);

    const days = Math.floor(seconds / 60 / 60 / 24);
    let unusedseconds = seconds - days * 60 * 60 * 24;

    const hours = Math.floor(unusedseconds / 60 / 60);
    unusedseconds -= hours * 60 * 60;

    const minutes = Math.floor(unusedseconds / 60);
    unusedseconds -= minutes * 60;

    return [days, hours, minutes, unusedseconds];
}

export { clock }