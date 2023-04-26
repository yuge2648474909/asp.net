var map;
var lng_marker_clicked = 0;
var lat_marker_clicked = 0;

$(function () {
    // 百度地图API功能
    map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(121.222, 31.12), 11);
    //添加带有定位的导航控件
    var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
    });
    map.addControl(navigationControl);
    // 添加定位控件
    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function (e) {
        // 定位成功事件
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        // alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener("locationError", function (e) {
        // 定位失败事件
        //alert(e.message);
    });
    map.addControl(geolocationControl);

    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用



    var $table_devices_available = $('#table_devices_available');

    $table_devices_available.lgbTable({
        smartTable: {
            toolbar: false,
            search: false,
            showToggle: false,
            showRefresh: false,
            showColumns: false,
            showAdvancedSearchButton: false,
            showExport: false,
            pagination: false,   
            checkbox: false,
            detailView: true,
            detailFormatter: function (index, row) {
                var deviceList = row["DeviceList"].split(';');
                var detail_str = '<dl>';
                detail_str += '<dt>包含子设备</dt>';
                for (var arr_i = 0; arr_i < deviceList.length; arr_i++) {
                    detail_str += '<dd>' + deviceList[arr_i]+'</dd>';
                }
                detail_str += '</dl>';
                return detail_str;
            },
            sortName: 'Name',
            columns: [
                { title: "名称", field: "Name", sortable: true },
                //{ title: "设备", field: "DeviceList", sortable: true },
                { title: "状态", field: "Device_status", sortable: true },
                { title: "更新时间", field: "Update_time", sortable: true },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    clickToSelect: false,
                    formatter: function (value, row, index) {
                        return [
                            '<div class="btn-group">',
                            '<a class="details btn btn-info btn-sm" href="/DeviceManagement/DetailsNew/' + row.Id + '"><i class="fa fa-eye"></i><span>查看</span></a>',
                            '</div >'
                        ].join('')
                    }
                }
            ],
            exportOptions: {
                fileName: "设备名称",
                ignoreColumn: [0, 5]
            }
        }
    });

    refreshTable_avilable();

    var $table_devices_used = $('#table_devices_used');

    $table_devices_used.lgbTable({
        smartTable: {
            toolbar: false,
            search: false,
            showToggle: false,
            showRefresh: false,
            showColumns: false,
            showAdvancedSearchButton: false,
            showExport: false,
            pagination: false,
            checkbox: false,
            columns: [
                //{ title: "Id", field: "Id", sortable: true },
                { title: "目标设备", field: "target_device", sortable: true },
                { title: "源头设备", field: "source_device", sortable: true },
                {
                    title: "绑定状态",
                    field: "status",
                    sortable: true,
                    cellStyle: function (value, row, index) {
                        if (value == "绑定")
                            return { css: { "background-color": "LightGreen" } };
                        if (value == "未绑定")
                            return { css: { "background-color": "Beige" } };
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    clickToSelect: false,
                    formatter: function (value, row, index) {
                        return [
                            '<div class="btn-group">',
                            '<a class="details btn btn-danger btn-sm" href="/DeviceManagement/DetailsNew/' + row.Id + '"><i class="fa fa-trash"></i><span>删除</span></a>',
                            '</div >'
                        ].join('')
                    }
                }
            ]
        }
    });


    //初始化数据
    $table_devices_used.bootstrapTable("removeAll");

    var _data = [
        {
            "Id": 1,
            "target_device": "1#位置-雷达",
            "source_device": "-",
            "status": "未绑定"
        },
        {
            "Id": 2,
            "target_device": "1#位置-Led",
            "source_device": "-",
            "status": "未绑定"
        },
        {
            "Id": 3,
            "target_device": "2#位置-雷达",
            "source_device": "-",
            "status": "未绑定"
        },
        {
            "Id": 4,
            "target_device": "2#位置-Led",
            "source_device": "-",
            "status": "未绑定"
        }
    ]
    $table_devices_used.bootstrapTable('append', _data);



});

function addLED() {

    if (LedConfCompleted() == false) {
        refreshTable_avilable();

        var select_html = refreshOpenWindowStr();

        // 创建LED图标
        var myIcon = new BMap.Icon("/images/LED.png", new BMap.Size(50, 40));

        //获取当前地图中心位置
        var point = map.getCenter();
        point.lat = point.lat + Math.random()/20;
        point.lng = point.lng + Math.random()/20;

        // 创建Marker标注，使用LED图标
        var marker = new BMap.Marker(point, {
            enableDragging: true,
            icon: myIcon
        });

        var opts = {
            width: 400,     // 信息窗口宽度    
            title: "设备绑定窗口"  // 信息窗口标题   
        }
        var infoWindow = new BMap.InfoWindow(select_html, opts);  // 创建信息窗口对象    

        map.addOverlay(marker);
        marker.addEventListener("click", function () {
            infoWindow.setContent(refreshOpenWindowStr());
            this.openInfoWindow(infoWindow);
            lng_marker_clicked = this.getPosition().lng;
            lat_marker_clicked = this.getPosition().lat;

        });

    } else {
        lgbSwal({ title: 'Led配置完成或者设备不足，请解绑或者添加新的设备！', type: "warning" });
    }
   
   
}

function LedConfCompleted() {
    var count = 0;
    var tableData_used = $('#table_devices_used').bootstrapTable('getData');
    for (var i = 0; i < tableData_used.length; i++) {
        var target_device_name = tableData_used[i]["target_device"];
        var target_device_status = tableData_used[i]["status"];
        if (target_device_status == "绑定" && target_device_name.indexOf("Led") >= 0)
            count = count + 1;
    }
     
    var result = $('#table_devices_available').bootstrapTable('getData');

    if (JSON.stringify(result) == 0 || count == 2) {
        return true;

    } else {
        return false;
    }

}

function refreshTable_avilable() {
    $('#table_devices_available').bootstrapTable("removeAll");
    //首先更新列表
    $.bc({
        url: "api/DeviceManagement/InitList",
        callback: function (result) {
            if (result) {
                //更新可用设备列表 
                for (var i = 0; i < result.length; i++) {                  
                    var device_list = result[i]["DeviceList"];
                    if (device_list.length > 0) {
                        var device_array = device_list.split(';');
                        for (var arr_i = 0; arr_i < device_array.length; arr_i++) {
                            if (device_array[arr_i] == "Led") {
                                if (isDeviceBinded(result[i]["Name"],'Led') == false) {
                                    var name = result[i]["Name"];
                                    var location = result[i]["Device_location"];
                                    var status = result[i]["Device_status"];
                                    var updatetime = result[i]["Update_time"];
                                    var deviceList = result[i]["DeviceList"];

                                    var _data = {
                                        "Name": name,
                                        "Device_location": location,
                                        "Device_status": status,
                                        "Update_time": updatetime,
                                        "DeviceList": deviceList
                                    };

                                    $('#table_devices_available').bootstrapTable('append', _data);

                                }

                               
                            }
                        }
                    }

                }
            }
        }
    });

}

function isDeviceBinded(source_name, device_type) {
    var count = 0;
    var tableData_used = $('#table_devices_used').bootstrapTable('getData');
    for (var i = 0; i < tableData_used.length; i++) {
        var target_device_name = tableData_used[i]["target_device"];
        var source_device_name = tableData_used[i]["source_device"];
        var target_device_status = tableData_used[i]["status"];
        if (target_device_status == "绑定" && target_device_name.indexOf(device_type) >= 0 && source_device_name == source_name)
            count = count + 1;
    }

    if (count > 0)
        return true;
    else
        return false;

}

function refreshOpenWindowStr() {
    //提取数据，用于初始化对话框
    var select_html = ' <form class="form-inline">';
    select_html = select_html + '<div class="row">';
    select_html = select_html + '<div class="form-group col-12">';
    select_html = select_html + ' <label class="control-label">目标设备</label>';
    select_html = select_html + '<select id="device_list_target" class="form-control flex-fill">';
    var tableData_used = $('#table_devices_used').bootstrapTable('getData');
    for (var i = 0; i < tableData_used.length; i++) {
        var target_device_name = tableData_used[i]["target_device"];
        var target_device_status = tableData_used[i]["status"];
        if (target_device_status == "未绑定" && target_device_name.indexOf("Led") >= 0)
            select_html = select_html + '<option value="' + i + '">' + target_device_name + '</option>';
    }
    select_html = select_html + '</select></div></div>';

    select_html = select_html + '<div class="row">';
    select_html = select_html + '<div class="form-group col-12">';
    select_html = select_html + ' <label class="control-label">源头设备</label>';
    select_html = select_html + '<select id="device_list" class="form-control flex-fill">';
    var result = $('#table_devices_available').bootstrapTable('getData');
    for (var i = 0; i < result.length; i++) {
        var device_name = result[i]["Name"];
        select_html = select_html + '<option value="' + i + '">' + device_name + '</option>';
    }
    select_html = select_html + '</select></div></div>';
    select_html = select_html + '</form>';
    select_html = select_html + '<div class="text-right">';
    select_html = select_html + '<button type="button" class="btn btn-primary" id="btnConfirm_device" onclick="Confirm_device()">';
    select_html = select_html + '<i class="fa fa-save"></i>';
    select_html = select_html + '<span>确定</span>';
    select_html = select_html + '</button>';
    select_html = select_html + ' </div>';

    return select_html;
}


function addRadar() {
    // 创建LED图标
    var myIcon = new BMap.Icon("/images/RADAR.png", new BMap.Size(40, 32));

    //首先获取当前地图中心位置
    var point = map.getCenter();

    // 创建Marker标注，使用LED图标
    var marker = new BMap.Marker(point, {
        enableDragging: true,
        icon: myIcon
    });
    map.addOverlay(marker);

}


function Confirm_device() {

    var device_target = $("#device_list_target").find("option:selected").text();
    var device_source = $("#device_list").find("option:selected").text();
    var device_count = 0;

    //更新绑定表
    var tableData_used = $('#table_devices_used').bootstrapTable('getData');
    for (var i = 0; i < tableData_used.length; i++) {
        var target_device_name = tableData_used[i]["target_device"];
        if (target_device_name == device_target) {
            tableData_used[i]["source_device"] = device_source;
            tableData_used[i]["status"] = "绑定";
        }
    }

    var tableData_used_str = JSON.stringify(tableData_used);  //注意js深拷贝
   
    $('#table_devices_used').bootstrapTable("removeAll");
    $('#table_devices_used').bootstrapTable('append', JSON.parse(tableData_used_str));

    //更新可用设备表
    var tableData_available = $('#table_devices_available').bootstrapTable('getData');

    for (var i = 0; i < tableData_available.length; i++) {
        var available_device_name = tableData_available[i]["Name"];
        if (available_device_name == device_source) {
            //用于后续更新显示
            var deviceList = tableData_available[i]["DeviceList"];
            var device_array = deviceList.split(';');
            device_count = device_array.length;
           

            //移除数据
            tableData_available.splice(i, 1);
        }
    }

    var tableData_available_str = JSON.stringify(tableData_available);  //注意js深拷贝

    $('#table_devices_available').bootstrapTable("removeAll");
    $('#table_devices_available').bootstrapTable('append', JSON.parse(tableData_available_str));

    //获取地图上所有的覆盖物
    var allOverlay = map.getOverlays();
    for (var i = 0; i < allOverlay.length; i++) {
        if (allOverlay[i].toString() == "[object Marker]") {
            if (allOverlay[i].getPosition().lng == lng_marker_clicked && allOverlay[i].getPosition().lat == lat_marker_clicked) {
                var marker_current = allOverlay[i];
      
                if (device_count > 1)  //有多个子设备
                {

                    // 创建LED图标
                    var myIcon = new BMap.Icon("/images/SmartBoard.png", new BMap.Size(50, 40));
                    marker_current.setIcon(myIcon);

                }

                var opts = {
                    width: 400,     // 信息窗口宽度    
                    title: "设备绑定窗口"  // 信息窗口标题   
                }
                var infoWindow = new BMap.InfoWindow(CompletedOpenWindowStr(device_target, device_source), opts);  // 创建信息窗口对象    

                marker_current.addEventListener("click", function () {
                    //infoWindow.setContent(refreshOpenWindowStr());
                    this.openInfoWindow(infoWindow);
                    //lng_marker_clicked = this.getPosition().lng;
                    //lat_marker_clicked = this.getPosition().lat;

                });

               
                marker_current.disableDragging();
            }
        }
    }

}

function CompletedOpenWindowStr(target_device,source_device) {
    //提取数据，用于初始化对话框
    var window_html = ' <form class="form-inline">';
    window_html = window_html + '<div class="row">';
    window_html = window_html + '<div class="form-group col-12">';
    window_html = window_html + '<label class="control-label">目标设备</label>';
    window_html = window_html + '<input value="' + target_device +'" class="form-control flex-fill" readonly="readonly" />';
    window_html = window_html + '</div></div>';

    window_html = window_html + '<div class="row">';
    window_html = window_html + '<div class="form-group col-12">';
    window_html = window_html + ' <label class="control-label">源头设备</label>';
    window_html = window_html + '<input value="' + source_device + '" class="form-control flex-fill" readonly="readonly" />';
    window_html = window_html + '</div></div>';
    window_html = window_html + '</form>';
    window_html = window_html + '<div class="text-right">';
    window_html = window_html + '<button type="button" class="btn btn-primary">';
    window_html = window_html + '<i class="fa fa-close"></i>';
    window_html = window_html + '<span>关闭</span>';
    window_html = window_html + '</button>';
    window_html = window_html + ' </div>';

    return window_html;
}