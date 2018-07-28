(function () {
    $(document).ready(function () {
        let hostname = window.location.hostname, port = window.location.port, shortID = '';

        $('#shorten').submit(function (e) {
            e.preventDefault();

            $.post('/shorten', $('#shorten').serialize(), function (data) {
                let shortURL = hostname + (port ? ":" + port : "") + '/' + data;
                $('#content').html('<p class="text-center success">' + '<a href="http://' + shortURL + '" target="_blank">' + shortURL + '</a>' + ' ' + '<a class="btn btn-default" href="#" onclick="copyToClipboard(\'' + shortURL +'\')">Copy</a></p>').slideDown();
            })
                .done(function () {
                    console.log("DONE!!!");
                })
                .fail(function () {
                    $('#content').html('<p class="text-center warn">Failed to shoten url.</p>');
                });
            return false;
        });

        $("#doesExpire").click(function(event){
            $("#expiry").toggleClass('hidden');
            // event.preventDefault();
        })
    });
})();


const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};

