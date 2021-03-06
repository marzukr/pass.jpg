// 0a90fcfd997324346abb2afc1f8a45d59b2751cdCndhVwFbfI4PoGtL1kcgnlWHo
// text message key


//Zuk Constants
var phoneNumber = "";
var p = new Promise(function (resolve, reject) {
    chrome.storage.sync.get(['sms'], function(result) {
        phoneNumber=result.sms;
    });
});

const id = chrome.runtime.id;
const unlockURL = `chrome-extension://${id}/unlock.html`

const API_KEY = "0a90fcfd997324346abb2afc1f8a45d59b2751cdCndhVwFbfI4PoGtL1kcgnlWHo"

//Nikita variables
let changeColor = document.getElementById('imgTable');
let cog = document.getElementById('cog');

//Aryo Constants:
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

let randomSize = 16;
let page = document.getElementById('imgTable');

let shuffledArray = ["images/passimage1.jpg", "images/passimage2.jpg", "images/passimage3.jpg", "images/passimage4.jpg", "images/passimage5.jpg", "images/passimage6.jpg", "images/passimage7.jpg", "images/passimage8.jpg", "images/passimage9.jpg", "images/passimage10.jpg", "images/passimage11.jpg", "images/passimage12.jpg", "images/passimage13.jpg", "images/passimage14.jpg", "images/passimage15.jpg", "images/passimage16.jpg"];
var shufflePromise = new Promise(function (resolve, reject) {
    chrome.storage.sync.get(["shuffled", "shuffledArray"], function(data) {
        console.log(data)
        if(data.shuffled) {
            console.log("true");
            shuffledArray = data.shuffledArray;
        }
        else {
            console.log("false");
            shuffledArray = shuffle(["images/passimage1.jpg", "images/passimage2.jpg", "images/passimage3.jpg", "images/passimage4.jpg", "images/passimage5.jpg", "images/passimage6.jpg", "images/passimage7.jpg", "images/passimage8.jpg", "images/passimage9.jpg", "images/passimage10.jpg", "images/passimage11.jpg", "images/passimage12.jpg", "images/passimage13.jpg", "images/passimage14.jpg", "images/passimage15.jpg", "images/passimage16.jpg"]);
            console.log(shuffledArray);
        }
        constructOptions(shuffledArray);
    });
});
console.log(shuffledArray);

const correctListener = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.getElementById("login_field").value = "' + "marzukr@platiplur.com" + '";'+
                'document.getElementById("password").value = "' + "Ww2VW3duGQ=[?PYqH}64E=K3" + '";'}
        );
    });
    chrome.storage.sync.set({ shuffled: false, shuffledArray: undefined });
    window.close();
}

const noBuenoListener = () => {
    chrome.storage.sync.get('hasBeenLocked', function(data) {
        if(data.hasBeenLocked) {
            chrome.storage.sync.set({ permaLock: true });
            sendText();
            permaLock();
        }
        else lockout();
    });
}

function constructOptions(shuffledArray) {
	for (item in shuffledArray) {
        let img = document.createElement('img');
        let number = 'img'+String(parseInt(item)+1);
        let data = document.getElementById(number)
        img.src = shuffledArray[item];
        data.append(img);
        
        if(shuffledArray[item] === "images/passimage2.jpg") {
            console.log("running");
            img.addEventListener('click', function() {
                correctListener();
            });
        }
        else {
            img.addEventListener('click', function() {
                noBuenoListener();
            });
        }
    }
    chrome.storage.sync.set({shuffledArray: shuffledArray, shuffled: true});
}

const sendText = () => {
    let code = (Math.floor(Math.random() * 16**16)).toString(16).padStart(16, "0").toUpperCase();
    chrome.storage.sync.set({unlockCode: code});
    const data = {
        number: phoneNumber, 
        message: `Your pass.jpg unlock code is ${code}`,
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
    let count = 5;
    const update = () => {
        if(!phoneNumber){
            document.getElementById('lockWarning').innerText = `Make sure to register your phone number. Locked for ${count}s`;
        }else{
            document.getElementById('lockWarning').innerText = `Locked for ${count}s`;      
        }
    }
    update();

    document.getElementById('overlay').className = "visible";
    document.getElementById("unlock").className = "noUnlock";

    chrome.storage.sync.set({ isLocked: true });
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
        update();
    }
    const counter = setInterval(timer, 1000); //1000 will  run it every 1 second
}

document.getElementById("sumbitUnlock").onclick = () => {
    const input = document.getElementById("submitInput");
    chrome.storage.sync.get('unlockCode', function(data) {
        if(data.unlockCode === input.value.toUpperCase()) {
            chrome.storage.sync.set({ permaLock: false, hasBeenLocked: false });
            window.location.reload(false);
        }
        else document.getElementById('lockWarning').innerText = `Invalid unlock code :(`;;
    });
}

const permaLock = () => {
    document.getElementById('overlay').className = "visible";
    document.getElementById("unlock").className = "unlock";
    document.getElementById('lockWarning').innerText = `Locked permanently. Enter unlock code to unlock.`;
}

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

cog.onclick = function(element) {
    chrome.tabs.create({url:`chrome-extension://${id}/options.html`});
};
