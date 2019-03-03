let page = document.getElementById('imgTable');
const imageSet = ["images/passimage1.jpg", "images/passimage2.jpg", "images/passimage3.jpg", "images/passimage4.jpg", "images/passimage5.jpg", "images/passimage6.jpg", "images/passimage7.jpg", "images/passimage8.jpg", "images/passimage9.jpg", "images/passimage10.jpg", "images/passimage11.jpg", "images/passimage12.jpg", "images/passimage13.jpg", "images/passimage14.jpg", "images/passimage15.jpg", "images/passimage16.jpg"];
function constructOptions(imageSet) {
	for (item in imageSet) {
        let img = document.createElement('img');
        let number = 'img'+String(parseInt(item)+1);
        let data = document.getElementById(number)
        img.src = imageSet[item];
		img.addEventListener('click', function() {
			chrome.storage.sync.set({color: item}, function() {
				console.log('color is ' + item);
			})
		});
		data.append(img)
	}
}
constructOptions(imageSet);