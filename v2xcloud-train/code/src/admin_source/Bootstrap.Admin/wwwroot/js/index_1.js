function go_href() {
    $.bc({
        url: "api/ClientLogin/GetLoginCode",
        method: 'get',
        callback: function (result) {
            //alert(result.url);
            window.location.href = $.formatUrl(result.url);    //用这种方式实现跳转
        }
    });

}