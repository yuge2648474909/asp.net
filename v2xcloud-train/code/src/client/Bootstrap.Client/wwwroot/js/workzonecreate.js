var map;
var lng_marker_clicked = 0;
var lat_marker_clicked = 0;
var setup_data = [];

$(function () {
    var $setupWorkzone = $('#setupWorkzone');
    $setupWorkzone.click(function () {

        $("#dialogNew_setup").modal("show");

        //地图初始化
        initMap();

        //根据业务初始化“已用设备”表格-与模板一致
        var module_selected = $("#Workzone_Service_type").find("option:selected").text();
        if (module_selected == "动态限速") {
            initTable_used_dynSpeed();
        }
        if (module_selected == "车辆出入") {
 
        }
        if (module_selected == "安全评价") {
 
        }

        //初始化可用设备表格-默认为Led
        iniTable_available();

    });

    var $create_btn = $('#create_btn');
    $create_btn.click(function () {

        //获取所有数据
        var Workzone_Road_name = $('#Workzone_Road_name')[0].value;
        var Workzone_Stake_number = $('#Workzone_Stake_number')[0].value;
        var direction = $('#direction').find("option:selected").text();
        var Workzone_Start_time = $('#Workzone_Start_time')[0].value;
        var Workzone_End_time = $('#Workzone_End_time')[0].value;
        var Workzone_Work_content = $('#Workzone_Work_content')[0].value;
        var Workzone_Traffic_control = $('#Workzone_Traffic_control')[0].value;
        var Workzone_Latitude = $('#Workzone_Latitude')[0].value;
        var Workzone_Longititude = $('#Workzone_Longititude')[0].value;
        var Workzone_Description = $('#Workzone_Description')[0].value;
        var Workzone_Service_type = $('#Workzone_Service_type').find("option:selected").text();
        var Workzone_Payment_type = $('#Workzone_Payment_type').find("option:selected").text();
        var table_data = JSON.stringify(setup_data);

        var data_post = {          //字段保持和model一致
            Road_name: Workzone_Road_name,
            Stake_number: Workzone_Stake_number,
            Direction: direction,
            Start_time: Workzone_Start_time,
            End_time: Workzone_End_time,
            Work_content: Workzone_Work_content,
            Traffic_control: Workzone_Traffic_control,
            Latitude: Workzone_Latitude,
            Longititude: Workzone_Longititude,
            Description: Workzone_Description,
            Service_type: Workzone_Service_type,
            Payment_type: Workzone_Payment_type,
            Setup_meta: table_data

        };

        $.bc({
            url: "api/WorkzoneManagement/Create",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('WorkZone/Details/' + result.workzone_id);    //用这种方式实现跳转
                else
                    toastr.error(result.erro);
            }
        });

    });

    var $save_setup = $('#save_setup');
    $save_setup.click(function () {

        setup_data = $('#table_devices_used').bootstrapTable('getData');
        $("#dialogNew_setup").modal("hide");
        toastr.info("已保存！");

    });


});


function initMap() {
    // 百度地图API功能
    map = new BMap.Map("allmap", { enableMapClick: false });
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

}

function initTable_used_dynSpeed() {
    var $table_devices_used = $('#table_devices_used');

    $table_devices_used.lgbTable({
        smartTable: {
            height: 260,
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
                { title: "源设备Id", field: "source_device_id", sortable: true,visible:false },
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
                            '<a class="details btn btn-warning btn-sm" href="#"><i class="fa fa-unlink"></i><span>解绑</span></a>',
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
            "target_device": "1#位置-Radar",
            "source_device": "-",
            "source_device_id":"",
            "status": "未绑定",
            "lat": "",
            "lon":""
        },
        {
            "Id": 2,
            "target_device": "1#位置-Led",
            "source_device": "-",
            "source_device_id": "",
            "status": "未绑定",
            "lat": "",
            "lon": ""
        },
        {
            "Id": 3,
            "target_device": "2#位置-Radar",
            "source_device": "-",
            "source_device_id": "",
            "status": "未绑定",
            "lat": "",
            "lon": ""
        },
        {
            "Id": 4,
            "target_device": "2#位置-Led",
            "source_device": "-",
            "source_device_id": "",
            "status": "未绑定",
            "lat": "",
            "lon": ""
        }
    ]
    $table_devices_used.bootstrapTable('append', _data);
}

function iniTable_available() {
    var $table_devices_available = $('#table_devices_available');

    $table_devices_available.lgbTable({
        smartTable: {
            height:260,
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
                var deviceList = row["DeviceList"];
                var deviceList_json = JSON.parse(deviceList);

                var detail_str = '<dl>';
                detail_str += '<dt>包含子设备</dt>';
                for (var arr_i = 0; arr_i < deviceList_json.length; arr_i++) {
                    detail_str += '<dd>' + deviceList_json[arr_i]["device_module_name"] + '</dd>';
                }
                detail_str += '</dl>';
                return detail_str;
            },
            sortName: 'Name',
            columns: [
                { title: "Id", field: "Id", sortable: true, visible:false },
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

    refreshTable_avilable('Led');
}



async function addLED() {

    if (ConfCompleted('Led', 2) == false) {
        //刷新可用设备列表，这个动作要在重新激活动作之前执行
        await refreshTable_avilable('Led');     //用await修饰，实现异步改同步

        //将包含多个子设备的已添加的marker功能重新激活
        reRegisterMarkers_mul('Led');

        var select_html = refreshOpenWindowStr('Led');

        // 创建LED图标
        var myIcon = new BMap.Icon("/images/LED.png", new BMap.Size(50, 40));

        //获取当前地图中心位置
        var point = map.getCenter();
        point.lat = point.lat + Math.random() / 20;
        point.lng = point.lng + Math.random() / 20;

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
            //infoWindow.setContent(refreshOpenWindowStr('Led'));
            this.openInfoWindow(infoWindow);
            lng_marker_clicked = this.getPosition().lng;
            lat_marker_clicked = this.getPosition().lat;

        });

        var menu = new BMap.ContextMenu();
        menu.addItem(new BMap.MenuItem('移除', function () {
            map.removeOverlay(marker);
        }));
        marker.addContextMenu(menu);                           // 添加右键菜单

    } else {
        lgbSwal({ title: 'Led配置完成或者设备不足，请解绑或者添加新的设备！', type: "warning" });
    }


}

async function addRadar() {

    if (ConfCompleted('Radar', 2) == false) {

        await refreshTable_avilable('Radar'); //用await修饰，实现异步改同步


        //将包含多个子设备的已添加的marker功能重新激活
        reRegisterMarkers_mul('Radar');

        var select_html = refreshOpenWindowStr('Radar');

        // 创建雷达图标
        var myIcon = new BMap.Icon("/images/RADAR.png", new BMap.Size(40, 32));

        //获取当前地图中心位置
        var point = map.getCenter();
        point.lat = point.lat + Math.random() / 20;
        point.lng = point.lng + Math.random() / 20;

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
            infoWindow.setContent(refreshOpenWindowStr('Radar'));
            this.openInfoWindow(infoWindow);
            lng_marker_clicked = this.getPosition().lng;
            lat_marker_clicked = this.getPosition().lat;

        });

        var menu = new BMap.ContextMenu();
        menu.addItem(new BMap.MenuItem('移除', function () {
            map.removeOverlay(marker);
        }));
        marker.addContextMenu(menu);                           // 添加右键菜单


       

    } else {
        lgbSwal({ title: '雷达配置完成或者设备不足，请解绑或者添加新的设备！', type: "warning" });
    }
}

function ConfCompleted(device_type, num_req) {
    //device_type: 设备类型，Led、Radar
    //num_req： 模板规定的设备数
    var count = 0;
    var tableData_used = $('#table_devices_used').bootstrapTable('getData');
    for (var i = 0; i < tableData_used.length; i++) {
        var target_device_name = tableData_used[i]["target_device"];
        var target_device_status = tableData_used[i]["status"];
        if (target_device_status == "绑定" && target_device_name.indexOf(device_type) >= 0)
            count = count + 1;
    }

    var result = $('#table_devices_available').bootstrapTable('getData');

    if (JSON.stringify(result) == 0 || count == num_req) {
        return true;

    } else {
        return false;
    }

}

function refreshTable_avilable(device_type) {
      //device_type: 设备类型，Led、Radar

    //为了支持同步操作，采用promise方法
    return new Promise((resolve, reject) => {
        $('#table_devices_available').bootstrapTable("removeAll");
        //首先更新列表
        $.bc({
            url: "api/DeviceManagement/InitList",
            async: false,
            callback: function (result) {
                //alert(JSON.stringify(result))
                if (result) {
                    //更新可用设备列表 
                    for (var i = 0; i < result.length; i++) {
                        var device_list_str = result[i]["DeviceList"];
                        if (device_list_str.length > 0) {
                            var device_list_json = JSON.parse(device_list_str);

                            for (var arr_i = 0; arr_i < device_list_json.length; arr_i++) {

                                if (device_list_json[arr_i]["dev_type"] == device_type) {
                                    if (isDeviceBinded(result[i]["Name"], device_type) == false) {
                                        var id = result[i]["Id"];
                                        var name = result[i]["Name"];
                                        var location = result[i]["Device_location"];
                                        var status = result[i]["Device_status"];
                                        var updatetime = result[i]["Update_time"];
                                        var deviceList = result[i]["DeviceList"];

                                        var _data = {
                                            "Id": id,
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
                //无返回值
                resolve()
            }
        });   
       
    })

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

function refreshOpenWindowStr(device_type) {
      //device_type: 设备类型，Led、Radar
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
        if (target_device_status == "未绑定" && target_device_name.indexOf(device_type) >= 0)
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
        var device_id = result[i]["Id"];
        select_html = select_html + '<option value="' + device_id + '">' + device_name + '</option>';
    }
    select_html = select_html + '</select></div></div>';
    select_html = select_html + '</form>';
    select_html = select_html + '<div class="text-right">';
    select_html = select_html + '<button type="button" class="btn btn-primary btn-ms" id="btnConfirm_device" onclick="Confirm_device()">';
    select_html = select_html + '<i class="fa fa-save"></i>';
    select_html = select_html + '<span>确定</span>';
    select_html = select_html + '</button>';
    select_html = select_html + ' </div>';

    return select_html;
}


function Confirm_device() {

    var device_target = $("#device_list_target").find("option:selected").text();
    var device_source = $("#device_list").find("option:selected").text();
    var device_source_id = $("#device_list")[0].value;
    var device_count = 0;

    //更新绑定表
    var tableData_used = $('#table_devices_used').bootstrapTable('getData');
    for (var i = 0; i < tableData_used.length; i++) {
        var target_device_name = tableData_used[i]["target_device"];
        if (target_device_name == device_target) {
            tableData_used[i]["source_device"] = device_source;
            tableData_used[i]["status"] = "绑定";
            tableData_used[i]["source_device_id"] = device_source_id;
            tableData_used[i]["lat"] = lat_marker_clicked.toString();
            tableData_used[i]["lon"] = lng_marker_clicked.toString();
        }
    }

    var tableData_used_str = JSON.stringify(tableData_used);  //注意js深拷贝
    //alert(tableData_used_str)

    $('#table_devices_used').bootstrapTable("removeAll");
    $('#table_devices_used').bootstrapTable('append', JSON.parse(tableData_used_str));

    //更新可用设备表
    var tableData_available = $('#table_devices_available').bootstrapTable('getData');

    for (var i = 0; i < tableData_available.length; i++) {
        var available_device_name = tableData_available[i]["Name"];
        if (available_device_name == device_source) {
            //用于后续更新显示
            var deviceList = tableData_available[i]["DeviceList"];

            var deviceList_json = JSON.parse(deviceList);
            device_count = deviceList_json.length;


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

                var label = new BMap.Label("完成", {       // 创建文本标注
                    offset: new BMap.Size(0, -10)
                })

                label.setStyle({                              // 设置label的样式
                    color: '#00FF00',
                    fontSize: '8px',
                    border: "0px",
                    backgroundColor: "0.000000000001" //通过这个方法，去掉背景色
                })

                label.setTitle(device_source);
                marker_current.setLabel(label);

                var opts = {
                    width: 400,     // 信息窗口宽度    
                    title: "设备绑定窗口"  // 信息窗口标题   
                }


                var infoWindow = new BMap.InfoWindow(CompletedOpenWindowStr(lat_marker_clicked.toString(), lng_marker_clicked.toString()), opts);  // 创建信息窗口对象    

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
    //恢复其他已完成的marker
    deRegisterMarkers_mul();   //此操作与reRegisterMarkers_mul相对应
    map.closeInfoWindow()

}

function CompletedOpenWindowStr(lat_str, lon_str) {
    //alert("lat:" + lat_str + ",lng:" + lon_str);

    var window_html = '<div class="row">';
    window_html = window_html + '<div class="form-group col-12">';

    window_html = window_html + '<table data-toggle="table" class="table table-hover">';
    window_html = window_html + '<thead>';
    window_html = window_html + '<tr>';
    window_html = window_html + '<th data-field="index">#</th>';
    window_html = window_html + '<th data-field="source_device">源头设备</th>';
    window_html = window_html + '<th data-field="target_device">目标设备</th>';
    window_html = window_html + '</tr>';
    window_html = window_html + '</thead>';
    window_html = window_html + '<tbody>';

    //找到已用设备表中和参数经纬度一致的设备
    var tableData_used = $('#table_devices_used').bootstrapTable('getData');


    var count = 0;
    for (var i = 0; i < tableData_used.length; i++) {
        var target_device = tableData_used[i]["target_device"];
        var source_device = tableData_used[i]["source_device"];
        var lat = tableData_used[i]["lat"];
        var lon = tableData_used[i]["lon"];
        if (lat == lat_str && lon == lon_str) {
            count = count + 1;
            window_html = window_html + '<tr>';
            window_html = window_html + '<td>' + count.toString() + '</td>';
            window_html = window_html + '<td>' + source_device+'</td>';
            window_html = window_html + '<td>' + target_device+'</td>';
            window_html = window_html + '</tr>';   
        }
    }

    window_html = window_html + '</tbody>';
    window_html = window_html + '</table>';                        
    window_html = window_html + '</div></div>';
    window_html = window_html + '<div class="text-right">';
    window_html = window_html + '<button type="button" class="btn btn-primary btn-ms" onclick=closeInfoWin()>';
    window_html = window_html + '<i class="fa fa-close"></i>';
    window_html = window_html + '<span>关闭</span>';
    window_html = window_html + '</button>';
    window_html = window_html + ' </div>';


    return window_html;
}

function closeInfoWin() {

    map.closeInfoWindow()
}


function reRegisterMarkers_mul(device_type) {
    //获取地图上所有的覆盖物
    var allOverlay = map.getOverlays();
    for (var i = 0; i < allOverlay.length; i++) {
        if (allOverlay[i].toString() == "[object Marker]") {
            var marker_current = allOverlay[i];
            var label = marker_current.getLabel();
            if (label != null && label.content == "完成") {

                //判断是否包含本类型的设备，如果是则开通
                var source_device_name = label.getTitle();

                var tableData_available = $('#table_devices_available').bootstrapTable('getData');
                //alert(JSON.stringify(tableData_available))
                var count = 0;
                var source_device_id;
                for (var mm = 0; mm < tableData_available.length; mm++) {
                    var available_device_name = tableData_available[mm]["Name"];
                    if (available_device_name == source_device_name) {
                        source_device_id = tableData_available[mm]["Id"];

                        //用于后续更新显示
                        var deviceList = tableData_available[mm]["DeviceList"];
                        if (deviceList.indexOf(device_type) >= 0)
                            count = count + 1;
                    }
                }

                if (count > 0) {

                    updateMark = function (marker, info_html) {                          //采用闭包写法，不然会出错https://blog.csdn.net/huanglei0809/article/details/24780999?utm_source=blogxgwz0&utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242
                        var opts = {
                            width: 400,     // 信息窗口宽度    
                            title: "设备绑定窗口"  // 信息窗口标题   
                        }
                        marker.addEventListener("click", function (e) {
                            this.openInfoWindow(new BMap.InfoWindow(info_html, opts));
                        });
                        return marker;
                    };

                    var select_html = refreshOpenWindowStr_mul(device_type, source_device_name, source_device_id);
                    updateMark(marker_current, select_html);

                }

            }
            
        }
    }

}

function deRegisterMarkers_mul() {
    ////获取地图上所有的覆盖物
    var allOverlay = map.getOverlays();
    for (var i = 0; i < allOverlay.length; i++) {
        if (allOverlay[i].toString() == "[object Marker]") {
            var marker_current = allOverlay[i];
            var label = marker_current.getLabel();

            if (label != null && label.content == "完成") {
                var lat_str = marker_current.getPosition().lat.toString();
                var lng_str = marker_current.getPosition().lng.toString();

                updateMark = function (marker, info_html) {                          //采用闭包写法，不然会出错https://blog.csdn.net/huanglei0809/article/details/24780999?utm_source=blogxgwz0&utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242
                    var opts = {
                        width: 400,     // 信息窗口宽度    
                        title: "设备绑定窗口"  // 信息窗口标题   
                    }
                    marker.addEventListener("click", function (e) {
                        this.openInfoWindow(new BMap.InfoWindow(info_html,opts));
                    });
                    return marker;
                };

                updateMark(marker_current, CompletedOpenWindowStr(lat_str, lng_str));

            }
            else
                map.removeOverlay(marker_current)   //对于临时的，移除


        }
    }



}

function refreshOpenWindowStr_mul(device_type, source_device_name, source_device_id) {
    //device_type: 设备类型，Led、Radar
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
        if (target_device_status == "未绑定" && target_device_name.indexOf(device_type) >= 0)
            select_html = select_html + '<option value="' + i + '">' + target_device_name + '</option>';
    }
    select_html = select_html + '</select></div></div>';

    select_html = select_html + '<div class="row">';
    select_html = select_html + '<div class="form-group col-12">';
    select_html = select_html + ' <label class="control-label">源头设备</label>';
    select_html = select_html + '<select id="device_list" class="form-control flex-fill">';
    select_html = select_html + '<option value="' + source_device_id+'">' + source_device_name + '</option>';
    select_html = select_html + '</select></div></div>';
    select_html = select_html + '</form>';
    select_html = select_html + '<div class="text-right">';
    select_html = select_html + '<button type="button" class="btn btn-primary btn-ms" id="btnConfirm_device" onclick="Confirm_device()">';
    select_html = select_html + '<i class="fa fa-save"></i>';
    select_html = select_html + '<span>确定</span>';
    select_html = select_html + '</button>';
    select_html = select_html + ' </div>';

    return select_html;

}


function return_without_save() {
    var return_without_save_button = "return_without_save_button";
    var return_without_save_span = "return_without_save_span";

    $("#" + return_without_save_button).hide();
    $("#" + return_without_save_span).show();

}


function cancelback(uniqueId) {
    var return_without_save_button = "return_without_save_button";
    var return_without_save_span = "return_without_save_span";

    $("#" + return_without_save_button).show();
    $("#" + return_without_save_span).hide();


}