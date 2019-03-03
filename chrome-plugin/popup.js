// 0a90fcfd997324346abb2afc1f8a45d59b2751cdCndhVwFbfI4PoGtL1kcgnlWHo
// text message key


//Zuk Constants
var phoneNumber = "";
var p = new Promise(function (resolve, reject) {
    chrome.storage.sync.get(['sms'], function(result) {
        phoneNumber=result.sms;
    });
});
const unlockURL = "chrome-extension://mfkmnfhjcbaifnddbaokfegjfoojglim/unlock.html"

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

function constructOptions(shuffledArray) {
	for (item in shuffledArray) {
        let img = document.createElement('img');
        let number = 'img'+String(parseInt(item)+1);
        let data = document.getElementById(number)
        img.src = shuffledArray[item];
		img.addEventListener('click', function() {
			console.log('color is ' + item);
		});
        data.append(img)
    }
    chrome.storage.sync.set({shuffledArray: shuffledArray, shuffled: true});
}

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
        if(!phoneNumber){
            document.getElementById('lockWarning').innerText = `Make sure to register your phone number ${count}`;
        }else{
            document.getElementById('lockWarning').innerText = `Locked for ${count}s`;        
        }
    }
    const counter = setInterval(timer, 1000); //1000 will  run it every 1 second
}

const permaLock = () => {
    document.getElementById('overlay').className = "visible";
    document.getElementById('lockWarning').innerText = `Locked permanently. Click link in text to unlock.`;
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
    chrome.tabs.create({url:'chrome-extension://jdabjamledpmdlcpebalpmehbpemjpjj/options.html'});
};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.getElementById("login_field").value = "' + "marzukr@platiplur.com" + '";'+
            'document.getElementById("password").value = "' + "7BRGaV]3qr7RSh+Wu.z0-X" + '";'}
    );
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
