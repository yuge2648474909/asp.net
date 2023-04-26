function loadMap() {
    //alert("")

    //// GL版命名空间为BMapGL
    //// 按住鼠标右键，修改倾斜角和角度
    //var map = new BMapGL.Map("allmap");    // 创建Map实例
    //map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    //map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    //alert("")
    //// 百度地图API功能
    //var map = new BMap.Map("allmap");
    //map.centerAndZoom(new BMap.Point(121.222, 31.12), 11);
    //// 添加带有定位的导航控件
    //var navigationControl = new BMap.NavigationControl({
    //    // 靠左上角位置
    //    anchor: BMAP_ANCHOR_TOP_LEFT,
    //    // LARGE类型
    //    type: BMAP_NAVIGATION_CONTROL_LARGE,
    //    // 启用显示定位
    //    enableGeolocation: true
    //});
    //map.addControl(navigationControl);
    //// 添加定位控件
    //var geolocationControl = new BMap.GeolocationControl();
    //geolocationControl.addEventListener("locationSuccess", function (e) {
    //    // 定位成功事件
    //    var address = '';
    //    address += e.addressComponent.province;
    //    address += e.addressComponent.city;
    //    address += e.addressComponent.district;
    //    address += e.addressComponent.street;
    //    address += e.addressComponent.streetNumber;
    //    // alert("当前定位地址为：" + address);
    //});
    //geolocationControl.addEventListener("locationError", function (e) {
    //    // 定位失败事件
    //    //alert(e.message);
    //});
    //map.addControl(geolocationControl);

    //map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    //map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用


    //for (var i = 0; i < deviceList_json.length; i++) {
    //    var record_id = deviceList_json[i]["id"]
    //    var device_name = deviceList_json[i]["device_name"];
    //    var device_type = deviceList_json[i]["device_type"];
    //    var device_specification = deviceList_json[i]["device_specification"];
    //    var content = deviceList_json[i]["content"];
    //    var device_status = deviceList_json[i]["device_status"];
    //    var update_time = deviceList_json[i]["update_time"];

    //    var sContent =
    //        "<div><h2 style='margin:0 0 5px 0;padding:0.2em 0'>" + device_name + "</h2>" +
    //        "<p style='margin:0;line-height:1.5;font-size:13px'>类型：" + device_type + "</p>" +
    //        "<p style='margin:0;line-height:1.5;font-size:13px'>规格：</p>" +
    //        "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>" + device_specification + "</p>" +
    //        "<p style='margin:0;line-height:1.5;font-size:13px'>显示内容：</p>" +
    //        "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>" + content + "</p>" +
    //        "<p style='margin:0;line-height:1.5;font-size:13px'>状态：" + device_status + "</p>" +
    //        "<p style='margin:0;line-height:1.5;font-size:13px'>最新更新时间：" + update_time + "</p>" +
    //        "<div class='divcss5-right'><a class='btn btn-sm btn-outline-secondary' href='/device-management/device-list/my-device-list/r/" + record_id + "/device-detail'><span class='fa fa-eye'></span></a><div>" +
    //        "</div>";

    //    var lon = parseFloat(deviceList_json[i]["location_lon"].trim());
    //    var lat = parseFloat(deviceList_json[i]["location_lat"].trim());

    //    var point = new BMap.Point(lon, lat);
    //    var marker = new BMap.Marker(point);

    //    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
    //    map.addOverlay(marker);
    //    marker.addEventListener("click", function () {
    //        this.openInfoWindow(infoWindow);

    //    });

    //}


}