function reloadTinyscrollbar() {

	if ($("#information .viewport").length > 0) {
		// TinyScrollbar
		var viewportHeight = $(window).height();
		var widgetInformationMarginTop = $(".top-nav").height() + $(".page-title").height() + $(".widget-simple").height();
		var widgetInformationTitle = $(".widget-simple .title").height();

		$(".widget-information").height(viewportHeight-widgetInformationMarginTop);
		$("#information .viewport").height((viewportHeight-widgetInformationMarginTop-widgetInformationTitle));

		var $scrollbar = $('#information');
   $scrollbar.tinyscrollbar({scrollInvert:true});
   $scrollbar.tinyscrollbar_update();

 }


}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function CheckPersonID(id) {

    var x = new String(id);
    splitext = x.split("");
    var total = 0;
    var mul = 13;
    for (i = 0; i < splitext.length - 1; i++) {
        total = total + splitext[i] * mul;
        mul = mul - 1;
    }

    mod = total % 11;
    var nsub = 11 - mod;
    mod2 = nsub % 10;

    if (mod2 != splitext[12])
        return false;
    else
        return true;
}


$(document).ready(function () {


    msieversion();






    reloadTinyscrollbar();

    // Fix Dropdown
    $('.dropdown-menu input, .dropdown-menu label').click(function (e) {
        e.stopPropagation();
    });


    // Tooltip
    $(".font-adjustment a").tooltip({ placement: 'bottom' });


    $('#uploadfile').change(function () {
        console.log('changed');
        console.log($(this).val())
        $('#subfile').val($(this).val());
    });

    // Text Increase, Decrease


    // Date picker

    if ($('.input-group.date').length > 0) {

        $('.input-group.date input').datepicker();
    }

    if ($('.news').length > 0) {
        var news = $('.news').find('li');
        var totalNews = $(news).length;
        if (totalNews > 0) {
            var index = 0;
            $(news).eq(index).show().animate({
                'opacity': 1
            }, 500);

            setInterval(function () {
                if (true) {
                    $(news).eq(index).animate({
                        'opacity': 0
                    }, 400, function () {
                        $(news).eq(index).hide();
                        if (index >= (totalNews - 1)) {
                            index = 0;
                        } else {
                            index++;
                        }
                        $(news).eq(index).show().animate({
                            'opacity': 1
                        })
                    })
                }

            }, 3000);
        }
    }

    $('.delete-campaign').click(function () {
        var confirmed = confirm("Are you sure to delete this campaign?");
        if (confirmed) {
            // delete 
        } else {
            return false;
        }
    });

    $('#email-register-btn').click(function () {
        if (validateEmail($('#user-email').val())) {
            $('#email-register-form').hide();
            $('.thankyou-message').show();
        } else {
            alert('Email address is incorrect!');
        }

    });

    if ($('#register-form').length > 0) {

        $(".customer-type").change(function () {

            if ($(this).val() == 'thai-citizen') {
                $("#userpassport").val('');
                $("#userpassport").parent().parent().hide();
                $("#useridcard").parent().parent().show();

            } else {
                $("#useridcard").val('');
                $("#userpassport").parent().parent().show();
                $("#useridcard").parent().parent().hide();

            }
        })

        $("#useridcard").focus(function () {
            $(this).parent().parent().removeClass('has-error');
        })

        $('.registerbtn').click(function () {
            if ($(".customer-type:checked").val() == 'thai-citizen') {
                if (!CheckPersonID($("#useridcard").val())) {
                    $("#useridcard").parent().parent().addClass('has-error');
                    alert('Personal ID is incorrect!');
                    return false;
                }

                return true;
            }
        });

    }

    if ($('.table-scrollable').length > 0) {
        //console.log('make scrollable table');
        /* $('.table-scrollable').fixedHeaderTable({
        altClass: 'odd',
        footer: true,
        fixedColumns: 1,
        });
        */
    }

});



$(document).ready(function () {
    //prevent right click
   /* $('body').bind("contextmenu", function (e) {
        e.preventDefault();
    });*/

    // toggle sidebar
    $(document).on('click', '#toggleSidebar', function (e) {
        var w = $('.sidebar').outerWidth() - 2;
        if ($(this).hasClass('sidebar-visible')) {
            $(".sidebar").animate({ "right": '-=' + w + '' }, 200, function () { $('#toggleSidebar').removeClass('sidebar-visible'); }); // close it
        } else {
            if ($('.nav-visible').length) { $('.toggle-nav').trigger('click'); }
            $(".sidebar").animate({ "right": '+=' + w + '' }, 200, function () { $('#toggleSidebar').addClass('sidebar-visible'); }); // open it
        }
    });

    // print function
    $(document).on('click', '.btn-print', function (e) {
        e.preventDefault();
        window.print();
    });



    jQuery(window).resize_delayed(function () {
        if ($(window).width() > 1200) { $('.sidebar').removeAttr('style'); $('.sidebar #toggleSidebar').removeClass('sidebar-visible'); }
    }, 200);

    // decrease font size
    $(document).on('click', 'a.font-decrease', function (e) {
        e.preventDefault();
        var parentObj = $('.main');
        var childCount = parentObj.find('*').length - 1;
        for (var i = childCount; i >= 0; i--) { // for children
            var obj = parentObj.find(":eq(" + i + ")");
            obj.css("font-size", function () { return parseInt(obj.css('font-size')) - 2 + 'px'; });
        }
        // for parent
        parentObj.css("font-size", function () { return parseInt(parentObj.css('font-size')) - 2 + 'px'; });
    });

    // increase font size
    $(document).on('click', 'a.font-increase', function (e) {
        e.preventDefault();
        var parentObj = $('.main');
        var childCount = parentObj.find('*').length - 1;
        for (var i = childCount; i >= 0; i--) { // for children
            var obj = parentObj.find(":eq(" + i + ")");
            obj.css("font-size", function () { return parseInt(obj.css('font-size')) + 2 + 'px'; });
        }
        // for parent
        parentObj.css("font-size", function () { return parseInt(parentObj.css('font-size')) + 2 + 'px'; });
    });

    /*Responsive------------------------------------------------------*/
    // main nav
    $(document).on('click', 'a.toggle-nav', function (e) {
        e.preventDefault();
        if ($('.nav').hasClass('nav-visible')) {
            $(this).removeClass('nav-open');
            $('.nav').animate({ "left": '-=300' }, 200, function () { $('.nav').removeClass('nav-visible'); }); // close it
        } else {
            if ($('.sidebar-visible').length) { $('#toggleSidebar').trigger('click'); }
            $(this).addClass('nav-open');
            $('.nav').animate({ "left": '+=300' }, 200, function () { $('.nav').addClass('nav-visible'); }); // open it
        }
    });
    if ($('table').length) {
        mobileTable();
    }
    $(window).resize(function () {
        if ($('table').length) {
            mobileTable();
        }
    });
    $(document).on('click', '.user-menu .dropdown-toggle', function (e) {
        if ($('.user-menu .open').length) {
            $('.btn-print').hide();
        } else {
            $('.btn-print').show();
        }
    });
    /*Responsive------------------------------------------------------*/

});
/*Responsive------------------------------------------------------*/
function mobileTable() {
    if ($(".table-hover").length) {
        var mainTable = $(".table-hover");
        var w = $(window).width();
        var e = $('.label-table').length;
        var theadTxt = [];
        var ii = 0;

        var cellInHeader = countHeadColumn(mainTable);
        var cellInBody = countBodyColumn(mainTable);

        if (w <= 767 && cellInHeader >= 3) {
            mainTable.addClass('mobile-table');
            mainTable.find('thead tr th').each(function (i) {
                theadTxt[i] = $(this).text();
            });
            if (e == 0) {
                mainTable.find('tbody tr').each(function (i) {
                    var cellInRow = $(this).find("td").length; console.log(cellInRow);
                    if (cellInHeader == cellInRow) {
                        $(this).find('td').each(function (j) {
                            var tdTxt = $(this).html();
                            $(this).prepend('<strong class="label-table">' + theadTxt[j] + '</strong>');
                        });
                    }
                });
            }
        } else {
            mainTable.removeClass('mobile-table');
            mainTable.find('.label-table').each(function (i) {
                $(this).remove();
            });
        }
    }
}

function countHeadColumn(e) {
    var numCols = e.find('thead tr')[0].cells.length;
    return numCols;
}

function countBodyColumn(e) {
    var numCols = e.find('tbody tr')[0].cells.length;
    return numCols;
}

/*Responsive------------------------------------------------------*/

jQuery.fn.resize_delayed = function (func, duration) {
    this.resize(function () {
        clearTimeout(window.____resize_delayed);
        window.____resize_delayed = setTimeout(func, duration);
    });
};


function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        $('body').addClass('ie');
    }
    return false;
}