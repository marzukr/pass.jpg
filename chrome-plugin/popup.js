// 0a90fcfd997324346abb2afc1f8a45d59b2751cdCndhVwFbfI4PoGtL1kcgnlWHo
// text message key

const unlockURL = "chrome-extension://mfkmnfhjcbaifnddbaokfegjfoojglim/unlock.html"
const phoneNumber = "8476822685"
const API_KEY = "0a90fcfd997324346abb2afc1f8a45d59b2751cdCndhVwFbfI4PoGtL1kcgnlWHo"

let changeColor = document.getElementById('changeColor');

const sendText = () => {
    const data = {
        number: phoneNumber, 
        message: `Go to ${unlockURL} to unlock pass.jpg!`,
        key: API_KEY,
    }
    fetch("https://textbelt.com/text", {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

const lockout = () => {
    document.getElementById('overlay').className = "visible";

    chrome.storage.sync.set({ isLocked: true });

    let count = 5;
    const timer = () => {
        count = count - 1;
        if (count <= 0)
        {
            clearInterval(counter);
            chrome.storage.sync.set({ isLocked: false });
            chrome.storage.sync.set({ hasBeenLocked: true });
            // chrome.storage.sync.set({ permaLock: true });
            document.getElementById('overlay').className = "hidden";
            return;
        }
        document.getElementById('lockWarning').innerText = `Locked for ${count}s`;
    }
    const counter = setInterval(timer, 1000); //1000 will  run it every 1 second
}

const permaLock = () => {
    document.getElementById('overlay').className = "visible";
    document.getElementById('lockWarning').innerText = `Locked permanently. Click link in text to unlock.`;
}

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

function GetInputType () {
	var inputs = document.getElementsByTagName ("input");
	
	for (var i = 0; i < inputs.length; i++) {
		if(inputs[i].type == "password"){
			return inputs[i];
		}
	}
}

chrome.storage.sync.get('isLocked', function(data) {
    if(data.isLocked) lockout();
});

chrome.storage.sync.get('permaLock', function(data) {
    if(data.permaLock) permaLock();
});

changeColor.onclick = function(element) {
    chrome.storage.sync.get('hasBeenLocked', function(data) {
        if(data.hasBeenLocked) {
            chrome.storage.sync.set({ permaLock: true });
            sendText();
            permaLock();
        }
        else lockout();
    });
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.getElementById("password").value = "' + "BBB" + '";'}
        );
    });
};
