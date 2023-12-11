//time button
const timeButton = document.getElementById('time');
const dropdown = document.getElementById('dropdown');

timeButton.addEventListener('click', function () {
    console.log('Current display:', dropdown.style.display);
    if (dropdown.style.display === 'none' || dropdown.style.display === "") {
        dropdown.style.display = 'block';
    } else if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    }
});

//button that refresh the page
const refreshButton = document.getElementById('refresh');
refreshButton.addEventListener('click', function () {
    location.reload();
});

//the initial visual (last 24 hours)
chrome.runtime.sendMessage({ action: 'getLast24Hour' }, function (response) {
    generateVisual(response);
});


const historyDiv = document.getElementById('history-items');

//buttons that send mmesages
document.addEventListener('DOMContentLoaded', function () {

    const lastHourbtn = document.getElementById('lastHour');
    lastHourbtn.addEventListener('click', function () {
        historyDiv.innerHTML = '';
        chrome.runtime.sendMessage({ action: 'getLastHour' }, function (response) {
            generateVisual(response);
        });
    });
    const lastDaybtn = document.getElementById('last24Hour');
    lastDaybtn.addEventListener('click', function () {
        historyDiv.innerHTML = '';
        chrome.runtime.sendMessage({ action: 'getLast24Hour' }, function (response) {
            generateVisual(response);
        });
    });
    const lastWeekbtn = document.getElementById('lastWeek');
    lastWeekbtn.addEventListener('click', function () {
        historyDiv.innerHTML = '';
        chrome.runtime.sendMessage({ action: 'getLastWeek' }, function (response) {
            generateVisual(response);
        });
    });

});


//function that gen erates visual of the popup
function generateVisual(response) {
    console.log(response.historyItems);
    response.historyItems.forEach(function (item) {
        const newDiv = document.createElement('div');
        const newLink = document.createElement('a');
        let letter13 = item.url.charAt(12);
        const colorMap = {};

        // color different based on domain names
        // the letter after protocal differs
        function getRandomColor() {
            const red = Math.floor(Math.random() * 256 + 1);
            const green = Math.floor(Math.random() * 256 + 1);
            const blue = Math.floor(Math.random() * 256 + 1);
            const randomShade = `rgb(${red}, ${green}, ${blue})`;
            return randomShade;
        }
        if (!(letter13 in colorMap)) {
            colorMap[letter13] = getRandomColor();
        }
        newDiv.style.backgroundColor = colorMap[letter13];
    

        //size rises as visitCount increases
        let itemVisted = item.visitCount;
        let w = Math.log(itemVisted) * 20 + 30;

        newDiv.style.width = w + 'px';
        newDiv.style.height = w + 'px';

        newDiv.style.position = 'absolute';

        let x = Math.random() * 500 + 'px';
        let y = Math.random() * 550 + 'px';
        newDiv.style.left = x;
        newDiv.style.top = y;

        newLink.href = item.url;
        newLink.target = '_blank';

        newLink.appendChild(newDiv);
        historyDiv.appendChild(newLink);
        newDiv.classList.add('squares');
    });
}



