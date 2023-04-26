document.ready = function() {
    updateNumbers();
};


function updateNumbers() {
    //var start_time = 1253980800;
    var beginTime = "2019-4-11 22:00:00";  
    var start_time = Date.parse(beginTime)
   // var start_time =  new Date("2014-11-11 10:10:10").Format("yyyy-MM-dd hh:mm:ss");
    var duration = parseInt(Date.now()- start_time)/1000;

    var seconds = parseInt( duration % 60);
    if (seconds < 10)
        seconds = "0" + seconds;
    duration = parseInt(duration / 60);
    var minutes = duration % 60;
    if (minutes < 10)
        minutes = "0" + minutes;
    duration = parseInt(duration / 60);
    var hours = duration % 24;
    if (hours < 10)
        hours = "0" + hours;
    duration = parseInt(duration / 24);
    var days = duration;
    $('.days-number').text("" + days);
    $('.seconds').text(hours + " 时 " + minutes + " 分 " + seconds + " 秒");
    setTimeout("updateNumbers()", 1000);
}