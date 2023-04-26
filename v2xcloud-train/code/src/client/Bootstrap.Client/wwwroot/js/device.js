$(function () {
    var $table = $('#list');
    $table.lgbTable({
        url: "Device/InitList",
        smartTable: {
            columns: [
                { title: "id", field: "id", sortable: true },
                { title: "名称", field: "name", sortable: true },
                { title: "价格", field: "price", sortable: true }
            ]
        }
    });
});