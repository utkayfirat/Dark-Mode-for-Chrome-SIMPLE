/*
    Creator: Utkay FIRAT
    Date: 21.06.2022
    Simple dark mode for Chrome.
*/

if (document.querySelector(".popup")) {
    const button = document.querySelector(".button");
    const circle = document.querySelector(".circle")
    let buttonStatus = false;
    chrome.storage.local.get(['key'], function(result) {
        if(result.key == true){
            button.style.animation = "transformToBlue 0s ease-in-out 0s forwards"
            circle.style.animation = "moveCircleRight 0s ease-in-out 0s forwards"
            buttonStatus = true;
        }else{
            button.style.animation = "transformToYellow 0s ease-in-out 0s forwards"
            circle.style.animation = "moveCircleLeft 0s ease-in-out 0s forwards"
        }
    });

    function invert() {
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
        let media = document.querySelectorAll("img, picture, video");
        media.forEach((mediaItem) => {
            mediaItem.style.filter = "invert(1) hue-rotate(180deg)"
        })
    }

    button.addEventListener("click", () => {
        if (!buttonStatus) {
            buttonStatus = true;

            button.style.animation = "transformToBlue 0.5s ease-in-out 0s forwards"
            circle.style.animation = "moveCircleRight 0.5s ease-in-out 0s forwards"

            chrome.tabs.query({}, function(tabs) {
                tabs.forEach(function (tab) {
                    chrome.scripting.executeScript({
                        target: {tabId: tab.id},
                        files: ['js/useOn.js'],
                    })
                })
            })

        }else {
            buttonStatus = false;
            button.style.animation = "transformToYellow 0.5s ease-in-out 0s forwards"
            circle.style.animation = "moveCircleLeft 0.5s ease-in-out 0s forwards"
            
            chrome.tabs.query({}, function(tabs) {
                tabs.forEach(function (tab) {
                    chrome.scripting.executeScript({
                        target: {tabId: tab.id},
                        files: ['js/useOff.js'],
                    })
                })
            })
        }

        chrome.storage.local.set({key: buttonStatus}, function() {});

        chrome.storage.local.get(['key'], function(result) {
            console.log('Mode:' + result.key);
        });
        
    })

}

