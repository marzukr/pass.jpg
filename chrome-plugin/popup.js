let changeColor = document.getElementById('changeColor');

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

changeColor.onclick = function(element) {
    let color = element.target.value;

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'document.getElementById("password").value = "' + "BBB" + '";'});
	});

}