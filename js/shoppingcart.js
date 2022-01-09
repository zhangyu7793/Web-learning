$(function () {
    $(".checkall").change(function () {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
    })
    $(".j-checkbox").change(function () {
        // console.log($(".j-checkbox:checked"));
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);

        } else {
            $(".checkall").prop("checked", false);
        }
    })
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        var price = (p*n).toFixed(2);
        $(this).parent().parent().siblings(".p-sum").html("￥" + price);
        getSum();
    })
    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        console.log(n);
        if (n > 1) {
            n--;
            $(this).siblings(".itxt").val(n);
        }
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        var price = (p*n).toFixed(2);
        $(this).parent().parent().siblings(".p-sum").html("￥" + price);
        getSum();
    })
    $(".itxt").change(function(){
        var n = $(this).val();
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        var price = (p*n).toFixed(2);
        $(this).parent().parent().siblings(".p-sum").html("￥" + price);
        getSum();
    })
    getSum();
    function getSum(){
        var count = 0 ;
        var money = 0;
        $(".itxt").each(function(i,ele){
            count += parseInt($(ele).val());

        });
        $(".j-number").text(count);
        $(".p-sum").each(function(i,ele){
            money += parseFloat($(ele).text().substr(1));
            
        })
        $(".j-money").text("￥"+money.toFixed(2));
    }

    $(".p-remove a").click(function(){
        $(this).parents(".cart-item").remove();
        getSum();
    })
    $(".j-remove a").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
})