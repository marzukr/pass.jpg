let button = document.getElementById('buttnum');
button.addEventListener('click', function() {
    var phone = document.getElementById('textField').value;
    chrome.storage.sync.set({
        sms: phone
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('buttnum');
        if(document.getElementById('textField').value==""||null){
            status.textContent = 'What was that?';
        }else{
            status.textContent = 'Options saved.'
            window.location.href = `chrome-extension://${chrome.runtime.id}/page2.html`
        }
        setTimeout(function() {
            status.textContent = 'Secure me!';
        }, 750);
    });
});