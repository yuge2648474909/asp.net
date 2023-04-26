function showMessagebox() {
    $.bc({
        url: "api/Test/Getstr",
        method: 'get',
        callback: function (result) {
            alert(result.str);
            document.getElementById("row1").innerHTML = result.str;
        }
    });
}

function submit() {


}