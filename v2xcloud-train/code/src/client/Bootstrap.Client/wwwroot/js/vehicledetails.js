$(function () {

    var id = parseInt($('#id')[0].value);
    
    $.bc({
        url: "api/VehicleManagement/Details/" + id,
        //dataType: 'text', //注意返回值类型
        callback: function (result) {
            if (result.status == "success") {
                var name = result.vehicle.Name;
                var type = result.vehicle.Type;
                $('#image').attr('src', '~/images/Tailand.JPG');
                /*$('#image').attr('src', '~/images/Tailand.JPG');*/
                //$('#name').attr('placeholder', name);
                $('#name')[0].value = name;
                $('#type')[0].value = type;
              
            }
            else
                toastr.error(result.erro);

        }
    });

})

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