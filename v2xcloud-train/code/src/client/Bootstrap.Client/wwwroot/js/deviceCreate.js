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
            columns: [
                { title: "Id", field: "Id", sortable: true },
                { title: "模块名称", field: "device_module_name", sortable: true },
                { title: "模块类型", field: "dev_type", sortable: true, visible:false },
                {
                    title: "模块状态",
                    field: "device_module_status",
                    sortable: true,                   
                    cellStyle: function (value, row, index) {
                        if (value == "运行")
                            return { css: { "background-color": "LightGreen" } };
                        if (value == "可用")
                            return { css: { "background-color": "Beige" } };
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    clickToSelect: false,
                    formatter: function (value, row, index) {
                        if (row["device_module_name"] == "摄像头")
                            return [
                                '<div class="btn-group">',
                                '<button type="button" class="delete btn btn-primary" onclick="PostOpenCamera()"><i class="fa fa-toggle-on"></i><span>开启</span></button>',
                                '<button type="button" class="delete btn btn-warning" onclick="PostCloseCamera()"><i class="fa fa-toggle-on"></i><span>关闭</span></button>',
                                '<button type="button" class="delete btn btn-info" onclick="ViewCamera(' + index +')"><i class="fa fa-eye"></i><span>远程调用</span></button>',
                                '</div >'
                            ].join('')
                        if (row["device_module_name"] == "GPS")
                            return [
                                '<div class="btn-group">',
                                '<button type="button" class="delete btn btn-primary" onclick="PostOpenGPS()"><i class="fa fa-toggle-on"></i><span>开启</span></button>',
                                '<button type="button" class="delete btn btn-warning" onclick="PostCloseGPS()"><i class="fa fa-toggle-on"></i><span>关闭</span></button>',
                                '<button type="button" class="delete btn btn-info" onclick="GetLatestGPS(' + index +')"><i class="fa fa-eye"></i><span>获取数据</span></button>',
                                '</div >'
                            ].join('')
                        if (row["device_module_name"] == "雷达")
                            return [
                                '<div class="btn-group">',
                                '<button type="button" class="delete btn btn-primary" onclick="PostOpenRadar()"><i class="fa fa-toggle-on"></i><span>开启</span></button>',
                                '<button type="button" class="delete btn btn-warning" onclick="PostCloseRadar()"><i class="fa fa-toggle-on"></i><span>关闭</span></button>',
                                '<button type="button" class="delete btn btn-info" onclick="GetLatestRadar(' + index +')"><i class="fa fa-eye"></i><span>获取数据</span></button>',
                                '</div >'
                            ].join('')
                        if (row["device_module_name"] == "Led")
                            return [
                                '<div class="btn-group">',
                                '<button type="button" class="delete btn btn-primary" onclick="PostOpenLed()"><i class="fa fa-toggle-on"></i><span>开启</span></button>',
                                '<button type="button" class="delete btn btn-warning" onclick="PostCloseLed()"><i class="fa fa-toggle-on"></i><span>关闭</span></button>',
                                '<button type="button" class="delete btn btn-info" onclick="PostLedWriteText(' + index +')"><i class="fa fa-eye"></i><span>发送文字</span></button>',
                                '</div >'
                            ].join('')
                    }
                }
            ]
        }
    });



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


    var $create_submit_btn = $("#create_submit_btn");
    $create_submit_btn.click(function () {

        //获取所有数据
        var device_name = $('#device_name')[0].value;
        var device_specification = $('#device_specification')[0].value;
        var device_tcp_address = $('#device_tcp_address')[0].value;
        var device_port = $('#device_port')[0].value;
        var camera_port = $('#camera_port')[0].value;
        var device_status = $('#device_status')[0].value;
        var update_time = $('#update_time')[0].value;
        var table_data = $('#modules_table').bootstrapTable('getData');      

        //var child_dev_list = [];
        //for (var i = 0; i < table_data.length; i++) {
        //    var child_dev_name = table_data[i]["device_module_name"];
        //    var chile_dev_json = {
        //        child_dev_name: child_dev_name

        //    }
        //    child_dev_list.push(chile_dev_json);
        //}


        var data_post = {          //字段保持和model一致
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
            url: "api/DeviceManagement/Create",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('DeviceManagement/DetailsNew/' + result.device_id);    //用这种方式实现跳转
                else
                    toastr.error(result.erro);
            }
        });

    });


});



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

                $('#modules_table').bootstrapTable("removeAll");

                var data_json = result.data;
                for (var i = 0; i < data_json.length; i++) {
                    var device_name = data_json[i]["device_name"];
                    if (device_name == "Camera")
                        device_name = "摄像头";
                    if (device_name == "Radar")
                        device_name = "雷达";

                    var device_status = data_json[i]["status"];
                    var _data = {
                        "Id": $('#modules_table').bootstrapTable('getData').length + 1,
                        "device_module_name": device_name,
                        "device_module_status": device_status,
                        "dev_type": data_json[i]["device_name"]
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
    var status = tabledata[index]["device_module_status"];

    if (status == "可用")
        lgbSwal({ title: '摄像头未运行，请开启！', type: "warning" });
    else {
        $("#dialogNew").modal("show");
        var ip_address = $('#device_tcp_address')[0].value;
        var camera_port = $('#camera_port')[0].value;
        var src = "http://" + ip_address + ":" + camera_port + "/?action=stream";
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
    var status = tabledata[index]["device_module_status"];

    if (status == "可用")
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

                if (lon_float >0 && lat_float >0) {
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
    var status = tabledata[index]["device_module_status"];

    if (status == "可用")
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
    var status = tabledata[index]["device_module_status"];

    if (status == "可用")
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
