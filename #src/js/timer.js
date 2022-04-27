document.addEventListener("DOMContentLoaded", function () {
    const deadline = new Date(2022, 04, 10);
    let timerId = null;

    function declensionNum(num, words) {
        if (num === 1) {
            return words[0]
        } else {
            return words[1];
        }

    }
    function coutdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $days.dataset.title = declensionNum(days, ['day', 'days']);
        $hours.dataset.title = declensionNum(hours, ['hour', 'hours']);
        $minutes.dataset.title = declensionNum(minutes, ['minute', 'minutes']);
        $seconds.dataset.title = declensionNum(seconds, ['second', 'seconds',]);
    }
    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    coutdownTimer();
    timerId = setInterval(coutdownTimer, 1000);
})