console.log('this works.')

chrome.runtime.sendMessage({ action: 'getHistory' }, function (response) {
    console.log(response.historyItems);
    response.historyItems.forEach(function (item) {
        const historyDiv = document.getElementById('history-items');
        const newDiv = document.createElement('div');
        const newLink = document.createElement('a');


        // color different based on domain names
        const gg = 'google';
        const w3 = 'w3schools';
        const figma = 'figma';
        newDiv.style.backgroundColor = 'red';

        if (item.url.indexOf(gg) > -1) {
            console.log(item.url);
            newDiv.style.backgroundColor = '#0000FF';
        }else if (item.url.indexOf(w3) > -1){
            newDiv.style.backgroundColor = '#4FFFB0';
        }
        else if (item.url.indexOf(figma) > -1){
            newDiv.style.backgroundColor = '#FFC72C';
        }

        //size rises as visitCount increases

        let itemVisted = item.visitCount;
        let w = 0;
        if (itemVisted < 5){
            w = itemVisted * 10;
        }else if (5 <= itemVisted < 10){
            w = itemVisted + 5;
        }else if (10 <= itemVisted < 50){
            w = itemVisted + 5;
        }else if (50 <= itemVisted){
            w = itemVisted - 40;
        }

        newDiv.style.width = w + 'px';
        newDiv.style.height = w + 'px';

        newDiv.style.position = 'absolute';

        let x = Math.random() * 500 + "px";
        let y = Math.random() * 550 + "px";
        newDiv.style.left = x;
        newDiv.style.top = y;

        newLink.href = item.url;
        newLink.target = '_blank';

        newLink.appendChild(newDiv);
        historyDiv.appendChild(newLink);
        newDiv.classList.add('squares');

        
        
   //     newDiv.addEventListener("mouseover", (event) => {
    //event.style.backgroundColor = 'lightblue';
   // });
    });
});