var clock_int = 0;
var clock_radar_int = 0;
var map = null;

$(function () {
    $('#modules_table').lgbTable({
        smartTable: {
            toolbar: false,
            search: false,
            showToggle: false,
            showRefresh: false,
            showColumns: false,
            showAdvancedSearchButton: false,
            showExport: false,
            pagination: false,
            columns: [
                { title: "Id", field: "Id", sortable: true },
                { title: "模块名称", field: "child_dev_name", sortable: true },
                {
                    title: "模块状态",
                    field: "status",
                    sortable: true,
                    cellStyle: function (value, row, index) {
                        if (value == "运行")
                            return { css: { "background-color": "LightGreen" } };
                        if (value == "可用")
                            return { css: { "background-color": "Beige" } };
                        if (value == "不可用")
                            return { css: { "background-color": "LightPink" } };
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    clickToSelect: false,
                    formatter: function (value, row, index) {
                        if (row["child_dev_name"] == "摄像头")
                            return [
                                '<div class="btn-group">',
                                '<button type="button" class="delete btn btn-primary" onclick="PostOpenCamera()"><i class="fa fa-toggle-on"></i><span>开启</span></button>',
                                '<button type="button" class="delete btn btn-warning" onclick="PostCloseCamera()"><i class="fa fa-toggle-on"></i><span>关闭</span></button>',
                                '<button type="button" class="delete btn btn-info" onclick="ViewCamera(' + index + ')"><i class="fa fa-eye"></i><span>远程调用</span></button>',
                                '</div >'
                            ].join('')
                        if (row["child_dev_name"] == "GPS")
                            return [
                                '<div class="btn-group">',
                                '<button type="button" class="delete btn btn-primary" onclick="PostOpenGPS()"><i class="fa fa-toggle-on"></i><span>开启</span></button>',
                                '<button type="button" class="delete btn btn-warning" onclick="PostCloseGPS()"><i class="fa fa-toggle-on"></i><span>关闭</span></button>',
                                '<button type="button" class="delete btn btn-info" onclick="GetLatestGPS(' + index + ')"><i class="fa fa-eye"></i><span>获取数据</span></button>',
                                '</div >'
                            ].join('')
                        if (row["child_dev_name"] == "雷达")
                            return [
                                '<div class="btn-group">',
                                '<button type="button" class="delete btn btn-primary" onclick="PostOpenRadar()"><i class="fa fa-toggle-on"></i><span>开启</span></button>',
                                '<button type="button" class="delete btn btn-warning" onclick="PostCloseRadar()"><i class="fa fa-toggle-on"></i><span>关闭</span></button>',
                                '<button type="button" class="delete btn btn-info" onclick="GetLatestRadar(' + index + ')"><i class="fa fa-eye"></i><span>获取数据</span></button>',
                                '</div >'
                            ].join('')
                        if (row["child_dev_name"] == "Led")
                            return [
                                '<div class="btn-group">',
                                '<button type="button" class="delete btn btn-primary" onclick="PostOpenLed()"><i class="fa fa-toggle-on"></i><span>开启</span></button>',
                                '<button type="button" class="delete btn btn-warning" onclick="PostCloseLed()"><i class="fa fa-toggle-on"></i><span>关闭</span></button>',
                                '<button type="button" class="delete btn btn-info" onclick="PostLedWriteText(' + index + ')"><i class="fa fa-eye"></i><span>发送文字</span></button>',
                                '</div >'
                            ].join('')
                    }
                }
            ]
        }
    });

    init_page();

    var $button_test_connection = $('#test_connection');
    $button_test_connection.click(function () {

        TestConnection();

    });

    var $button_CloseView = $("#CloseView");
    $button_CloseView.click(function () {
        $("#dialogNew").modal("hide");
        $("#MJPGStreamer").attr('src', "#");

    });

    
    var $btnSubmit_text = $("#btnSubmit_text");
    $btnSubmit_text.click(function () {
        PostLedWriteText_run();
      
    });

    var $select_map = $("#select_map");
    $select_map.change(function () {

        var selected = $('#select_map')[0].value;
        if (selected == 0) {
            window.clearInterval(clock_int);
        } else {
            clock_int = self.setInterval("clock()", 3000);


        }


    });

    var $close_map_dlg = $("#close_map_dlg");
    $close_map_dlg.click(function () {
        var selected = $('#select_map')[0].value;
        if (selected == 1) {
            window.clearInterval(clock_int);
            $('#select_map')[0].value = 0;
        }

    });

    var $select_radar = $("#select_radar");
    $select_radar.change(function () {

        var selected = $('#select_radar')[0].value;
        if (selected == 0) {
            window.clearInterval(clock_radar_int);
        } else {
            clock_radar_int = self.setInterval("clock_radar()", 1000);
            //alert(clock_radar_int)

        }


    });

    var $close_radar_dlg = $("#close_radar_dlg");
    $close_radar_dlg.click(function () {
        var selected = $('#select_radar')[0].value;
        if (selected == 1) {
            window.clearInterval(clock_radar_int);
            $('#select_radar')[0].value = 0;
        }

    });


    var $btn_update_submit = $("#btn_update_submit");
    $btn_update_submit.click(function () {

        //获取所有数据
        var id = parseInt($('#id')[0].value);
        var device_name = $('#device_name')[0].value;
        var device_specification = $('#device_specification')[0].value;
        var device_tcp_address = $('#device_tcp_address')[0].value;
        var device_port = $('#device_port')[0].value;
        var camera_port = $('#camera_port')[0].value;
        var device_status = $('#device_status')[0].value;
        var update_time = $('#update_time')[0].value;
        var table_data = $('#modules_table').bootstrapTable('getData');

        var data_post = {          //字段保持和model一致
            Id:id,
            Name: device_name,
            Device_specification: device_specification,
            Tcp_address: device_tcp_address,
            Port: device_port,
            Camera_port: camera_port,
            Device_status: device_status,
            Update_time: update_time,
            DeviceList: JSON.stringify(table_data)

        };

        $.bc({
            url: "api/DeviceManagement/Edit",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('DeviceManagement/DetailsNew/' + id);    //用这种方式实现跳转
                else
                    toastr.error(result.erro);
            }
        });

    });

});

async function init_page() {
    await init_page_controls();
    await init_page_table(); 
    TestConnection();

}

function init_page_table() {
    //为了支持同步操作，采用promise方法
    return new Promise((resolve, reject) => {
        var id = parseInt($('#id')[0].value);

        $.bc({
            url: "api/DeviceManagement/DetailsInitTable/" + id,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success") {

                    //alert(JSON.stringify(result))

                    var child_dev_list = result.child_dev_list;
                    for (var row_i = 0; row_i < child_dev_list.length; row_i++) {
                        var child_dev_id = child_dev_list[row_i]["Id"];
                        var child_dev_name = child_dev_list[row_i]["child_dev_name"];
                        var child_dev_status = "不可用";// child_dev_list[row_i]["status"];

                        if (child_dev_name == "Camera")
                            child_dev_name = "摄像头";
                        if (child_dev_name == "Radar")
                            child_dev_name = "雷达";

                        var _data = {
                            "Id": child_dev_id,
                            "child_dev_name": child_dev_name,
                            "status": child_dev_status
                        }
                        $('#modules_table').bootstrapTable('append', _data);

                    }

                }
                else
                    toastr.error(result.erro);

                //无返回值
                resolve();
            }
        });

    })

}


function init_page_controls() {
    //为了支持同步操作，采用promise方法
    return new Promise((resolve, reject) => {
        var id = parseInt($('#id')[0].value);
        $.bc({
            url: "api/DeviceManagement/Details/" + id,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success") {
                    var device_name = result.device.Name;
                    var device_specification = result.device.Device_specification;
                    var device_tcp_address = result.device.Tcp_address;
                    var device_port = result.device.Port;
                    var camera_port = result.device.Camera_port;
                    var update_time = result.device.Update_time;

                    $('#device_name')[0].value = device_name;
                    $('#device_specification')[0].value = device_specification;
                    $('#device_tcp_address')[0].value = device_tcp_address;
                    $('#device_port')[0].value = device_port;
                    $('#camera_port')[0].value = camera_port;
                    $('#device_status')[0].value = "离线";
                    $('#update_time')[0].value = update_time;

                }
                else
                    toastr.error(result.erro);

                //无返回值
                resolve();
            }
        });
    })

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

function TestConnection() {
    toastr.info('请稍后...', '加载中');

    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "GetRunningDeviceList"
    };


    $.ajax({
        url: ApiServerAddress.url +"api/Devices/GetRunningDeviceList",
        method: "post",
        data: data,
        success: function (result) {
            //alert(JSON.stringify(result))

            var status = result.status;
            if (status == "success") {

                var table_data_old = $('#modules_table').bootstrapTable('getData');
                var table_data_old_str = JSON.stringify(table_data_old);
                var table_data = JSON.parse(table_data_old_str);          //用这样的方式深拷贝

                $('#modules_table').bootstrapTable("removeAll");

                for (var row_i = 0; row_i < table_data.length; row_i++) {
                    var child_dev_id = table_data[row_i]["Id"];
                    var child_dev_name = table_data[row_i]["child_dev_name"];
                    var child_dev_status = table_data[row_i]["status"];

                    var data_json = result.data;
                    for (var i = 0; i < data_json.length; i++) {
                        var device_name = data_json[i]["device_name"];
                        if (device_name == "Camera")
                            device_name = "摄像头";
                        if (device_name == "Radar")
                            device_name = "雷达";

                        var device_status = data_json[i]["status"];

                        if (child_dev_name == device_name) {

                            child_dev_status = device_status;
                        }
                    }

                    var _data = {
                        "Id": child_dev_id,
                        "child_dev_name": child_dev_name,
                        "status": child_dev_status
                    }
                    $('#modules_table').bootstrapTable('append', _data);

                }            

                $('#device_status')[0].value = "在线";

            } else {

                $('#device_status')[0].value = "离线";

            }

            var myDate = new Date();

            $('#update_time')[0].value = myDate.toLocaleString(); 


        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });

}




function PostOpenCamera() {
    var data = {
        "host": $('#device_tcp_address')[0].value, 
        "port": parseInt($('#device_port')[0].value),
        "controlName": "PostOpenCamera"
    };


    $.ajax({
        url: ApiServerAddress.url +"api/Camera/PostOpenCamera",
        method: "post",
        data: data,
        success: function (result) {
            TestConnection();

        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

function PostCloseCamera() {
    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "PostCloseCamera"
    };


    $.ajax({
        url: ApiServerAddress.url + "api/Camera/PostCloseCamera",
        method: "post",
        data: data,
        success: function (result) {
            TestConnection();

        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

function ViewCamera(index) {
    var tabledata = $("#modules_table").bootstrapTable('getData');
    var status = tabledata[index]["status"];

    if (status != "运行")
        lgbSwal({ title: '摄像头未运行，请开启！', type: "warning" });
    else {
        $("#dialogNew").modal("show");
        var ip_address = $('#device_tcp_address')[0].value;
        var src = "http://" + ip_address + ":" + $('#camera_port')[0].value+"/?action=stream";
        $("#MJPGStreamer").attr('src', src);
       
    }
       

}


function PostOpenGPS() {
    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "PostOpenGPS"
    };


    $.ajax({
        url: ApiServerAddress.url + "api/GPS/PostOpenGPS",
        method: "post",
        data: data,
        success: function (result) {
            TestConnection();

        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

function PostCloseGPS() {
    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "PostCloseGPS"
    };


    $.ajax({
        url: ApiServerAddress.url + "api/GPS/PostCloseGPS",
        method: "post",
        data: data,
        success: function (result) {
            TestConnection();

        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

function GetLatestGPS(index) {

    var tabledata = $("#modules_table").bootstrapTable('getData');
    var status = tabledata[index]["status"];

    if (status != "运行")
        lgbSwal({ title: 'GPS未运行，请开启！', type: "warning" });
    else {
        $("#dialogNew_map").modal("show");


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

        GetLatestGPS_run();

    }



}


function clock() {
    GetLatestGPS_run();
}

function GetLatestGPS_run() {
    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "GetLatestGPS"
    };


    $.ajax({
        url: ApiServerAddress.url + "api/GPS/GetLatestGPS",
        method: "post",
        data: data,
        success: function (result) {
            if (result.status == "success") {

                var lon_str = result["data"]["lon"];
                var lon_float = parseFloat(lon_str);
                var lat_str = result["data"]["lat"];
                var lat_float = parseFloat(lat_str);

                if (lon_float > 0 && lat_float > 0) {
                    var point = new BMap.Point(lon_float, lat_float);
                    var marker = new BMap.Marker(point);
                    map.addOverlay(marker);

                    //map.centerAndZoom(new BMap.Point(lon_float, lat_float), 11);

                }

            }



        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });

}


function PostOpenRadar() {
    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "PostOpenRadar"
    };


    $.ajax({
        url: ApiServerAddress.url + "api/Radar/PostOpenRadar",
        method: "post",
        data: data,
        success: function (result) {
            TestConnection();

        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

function PostCloseRadar() {
    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "PostCloseRadar"
    };


    $.ajax({
        url: ApiServerAddress.url + "api/Radar/PostCloseRadar",
        method: "post",
        data: data,
        success: function (result) {
            TestConnection();

        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

function GetLatestRadar(index) {
    var tabledata = $("#modules_table").bootstrapTable('getData');
    var status = tabledata[index]["status"];

    if (status != "运行")
        lgbSwal({ title: '雷达未运行，请开启！', type: "warning" });
    else {
        $("#dialogNew_radar").modal("show");

        //初始化
        show_speed_gauge(0);


        GetLatestRadar_run();

    }
}

function show_speed_gauge(value) {
    //$("#show_speed").append('<p>当前速度为：'+value+'km/h</p>')
    var dom = document.getElementById("container_speed");
    var myChart = echarts.init(dom);
    var app = {};

    var option;



    option = {
        series: [{
            type: 'gauge',
            progress: {
                show: true,
                width: 18
            },
            axisLine: {
                lineStyle: {
                    width: 18
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                length: 15,
                lineStyle: {
                    width: 2,
                    color: '#999'
                }
            },
            axisLabel: {
                distance: 25,
                color: '#999',
                fontSize: 20
            },
            anchor: {
                show: true,
                showAbove: true,
                size: 25,
                itemStyle: {
                    borderWidth: 10
                }
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: true,
                fontSize: 80,
                offsetCenter: [0, '70%']
            },
            data: [{
                value: value
            }]
        }]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });

    }


}

function clock_radar() {
    GetLatestRadar_run();
}

function GetLatestRadar_run() {
    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "GetLatestRadar"
    };


    $.ajax({
        url: ApiServerAddress.url + "api/Radar/GetLatestRadar",
        method: "post",
        data: data,
        success: function (result) {
            if (result.status == "success") {

                var speed = result["data"]["speed"];
                var speed_float = parseFloat(speed);


                if (speed_float > 0) {
                    show_speed_gauge(speed_float)

                } else {

                    show_speed_gauge(0)
                }




            }



        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });

}


function PostOpenLed() {
    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "PostOpenLed"
    };


    $.ajax({
        url: ApiServerAddress.url + "api/Led/PostOpenLed",
        method: "post",
        data: data,
        success: function (result) {
            TestConnection();

        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

function PostCloseLed() {
    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "PostCloseLed"
    };


    $.ajax({
        url: ApiServerAddress.url + "api/Led/PostCloseLed",
        method: "post",
        data: data,
        success: function (result) {
            TestConnection();

        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

function PostLedWriteText(index) {

    var tabledata = $("#modules_table").bootstrapTable('getData'); 
    var status = tabledata[index]["status"];

    if (status != "运行")
        lgbSwal({ title: 'Led未运行，请开启！', type: "warning" });
    else {
        $("#dialogNew_text").modal("show");     

    }

   
}

function PostLedWriteText_run() {

    var data = {
        "host": $('#device_tcp_address')[0].value,
        "port": parseInt($('#device_port')[0].value),
        "controlName": "PostOpenCamera",
        "host_led": "192.168.10.5",
        "port_led": 30000,
        "text": $('#led_text')[0].value
    };


    $.ajax({
        url: ApiServerAddress.url + "api/Led/PostLedWriteText",
        method: "post",
        data: data,
        success: function (result) {

            $("#dialogNew_text").modal("hide");

        },
        erro: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}
