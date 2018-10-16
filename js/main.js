$(function ($) {


    $(".nicescroll-block").niceScrollExt({
        cursorwidth : 12,
        cursorcolor : "#8d181b",
        cursoropacitymin : 1,
        cursorborder : "2px solid #fad970",
        railpadding : {
            top:0,
            right: -8,
            left:0,
            bottom:0
        }
    });


    NiceText();


    TitlePageHtemeInit();

    $("input[type=radio]").RadioTheme();
    $("input[type=checkbox]").CheckboxTheme();
    SelectTheme.Init();




    $('.carousel').carousel({
        interval: false
    });



    $(".nicescroll-block-lk").niceScrollCor({
        xl: 500,
        lg: 500,
        md: 480,
        sm: "auto",
        xs: "auto",
    });

    $(".nicescroll-block-pomosch").niceScrollCor2({
        xl: 110,
        lg: 100,
        md: 90,
        sm: "auto",
        xs: "auto",
    });

    $(".nicescroll-block-winners").niceScrollCor({
        xl: 300,
        lg: 300,
        md: 260,
        sm: 300,
        xs: "auto",
    });

    AskQuestion.Init();



    $("input[type=file]").each(function () {
        let input = $(this);
        let label = $(this).prev().find("> span");
        input.change(function () {
            let ar = $(this).val().split('\\');
            label.text(ar[ar.length - 1]);
        });
    });


    $(".page-winners .btn-collapse-block").click(function () {
        $(this).find("span").text($(this).attr("aria-expanded") == "true" ? "+" : "-");
    });


});


let AskQuestion = {
    Flag: false,
    IsOpen: false,
    Init: function () {
        this.main = $(".ask-question");
        this.btn = this.main.find(".aq-btn");

        this.btn.click(function () {
            if (AskQuestion.IsOpen) {
                AskQuestion.Close();
            }
            else {
                AskQuestion.Open();
            }
        });
    },
    Open: function () {
        if (this.Flag) return;
        this.Flag = true;
        AskQuestion.main.animate({right: "-4px"}, 200, function () {
            AskQuestion.Flag = false;
            AskQuestion.IsOpen = true;

        });
    },
    Close: function () {
        if (this.Flag) return;
        this.Flag = true;
        AskQuestion.main.animate({right: "-238px"}, 200, function () {
            AskQuestion.Flag = false;
            AskQuestion.IsOpen = false;
        });
    }
};








let UwsWidget = {
    InitDefault: function() {
        UwsWidget.main = $(".uws-widget");
        UwsWidget.inputText = UwsWidget.main.find("input[type=email], input[type=password], input[type=tel], input[type=text]");
        UwsWidget.buttons = UwsWidget.main.find("button");
        UwsWidget.main.find(".uws-dialog *").removeAttr("class");


        $(UwsWidget.buttons[0]).addClass("icon-close");
    },
    SetPlaceholder: function() {
        UwsWidget.inputText.each(function () {
            let label = $($(this).prev("label")).remove();
            $(this).attr("placeholder", label.text());
        });
    },
    SignIn: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();
            if (UwsWidget.buttons.length == 9) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("h1").text("Вход");

                $(UwsWidget.buttons[1]).addClass("btn-fb").html("<img src='/images/btn-fb.png'>").attr("onclick", "UwsWidget.SignUp()");
                $(UwsWidget.buttons[2]).addClass("btn-ok").html("<img src='/images/btn-ok.png'>").attr("onclick", "UwsWidget.SignUp()");
                $(UwsWidget.buttons[3]).addClass("btn-vk").html("<img src='/images/btn-vk.png'>").attr("onclick", "UwsWidget.SignUp()");
                $(UwsWidget.buttons[4]).hide();

                $(UwsWidget.buttons[5]).addClass("button-theme order-1").html("<span><span>" + $(UwsWidget.buttons[5]).text() + "</span></span>");
                $(UwsWidget.buttons[7]).addClass("button-theme order-4").html("<span><span>" + $(UwsWidget.buttons[7]).text() + "</span></span>").attr("onclick", "UwsWidget.SignUp()");

                $(UwsWidget.buttons[6]).addClass("btn btn-link order-2").attr("onclick", "UwsWidget.RestorePassword()");
                $(UwsWidget.buttons[8]).addClass("btn btn-link order-3").attr("onclick", "UwsWidget.ConfirmEmail()");
            }
        }, 10);
    },
    SignUp: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();
            if (UwsWidget.buttons.length == 8) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("input[type=radio]").RadioTheme();
                UwsWidget.main.find("input[type=checkbox]").CheckboxTheme();

                UwsWidget.main.find("input[name=captcha]").attr("type", "text");



                $(UwsWidget.buttons[1]).addClass("btn-fb").html("<img src='/images/btn-fb.png'>");
                $(UwsWidget.buttons[2]).addClass("btn-ok").html("<img src='/images/btn-ok.png'>");
                $(UwsWidget.buttons[3]).addClass("btn-vk").html("<img src='/images/btn-vk.png'>");
                $(UwsWidget.buttons[4]).hide();



                $(UwsWidget.buttons[5]).addClass("refresh").html("<span class='icon-refresh'><span>");

                $(UwsWidget.buttons[6]).addClass("button-theme").html("<span><span>" + $(UwsWidget.buttons[6]).text() + "</span></span>");

                $(UwsWidget.buttons[7]).addClass("btn btn-link").attr("onclick", "UwsWidget.SignIn()");
            }
        }, 10);
    },
    RestorePassword: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();
            if (UwsWidget.inputText.length) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("h1").text("Восстановление").after("<h1>пароля</h1>");

                $(UwsWidget.inputText[1]).parent().hide();


                $(UwsWidget.buttons[1]).addClass("button-theme").html("<span><span>" + $(UwsWidget.buttons[1]).text() + "</span></span>");

                $(UwsWidget.buttons[2]).addClass("btn btn-link").attr("onclick", "UwsWidget.SignIn()");
            }
        }, 10);
    },
    ConfirmEmail: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();
            if (UwsWidget.inputText.length) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("h1").text("Подтверждение").after("<h1>e-mail</h1>");

                $(UwsWidget.buttons[1]).addClass("button-theme").html("<span><span>" + $(UwsWidget.buttons[1]).text() + "</span></span>");
            }
        }, 10);
    },
    ConfirmPhone: function () {
        this.intervalId = setInterval(function () {
            UwsWidget.InitDefault();
            if (UwsWidget.inputText.length) {
                clearInterval(UwsWidget.intervalId);

                UwsWidget.SetPlaceholder();

                UwsWidget.main.find("h1").text("Подтверждение").after("<h1>телефона</h1>");

                $(UwsWidget.buttons[1]).addClass("button-theme").html("<span><span>" + $(UwsWidget.buttons[1]).text() + "</span></span>");
            }
        }, 10);
    }
};







$.fn.niceScrollCor = function (e) {
    let main = $(this);


    if (main.length) {

        setInterval(Check, 100)


        $(window).resize(Check);



        function Check() {
            let w = $(window);
            if (w.width() >= 1200) {
                main.height(e.xl == "auto" ? "auto" : w.height() - e.xl);
            }
            else if (w.width() >= 992) {
                main.height(e.lg == "auto" ? "auto" : w.height() - e.lg);
            }
            else if (w.width() >= 768) {
                main.height(e.md == "auto" ? "auto" : w.height() - e.md);
            }
            else if (w.width() >= 576) {
                main.height(e.sm == "auto" ? "auto" : w.height() - e.sm);
            }
            else {
                main.height(e.xs == "auto" ? "auto" : w.height() - e.xs);
            }
        }
    }
};




function c(t) {
    console.log(t);
}

$.fn.niceScrollCor2 = function (e) {
    let main = $(this);


    if (main.length) {

        let idI = setInterval(function () {
            main.height(1);
        }, 10);


        setInterval(Check, 100);

        $(window).resize(function () {
            main.height(300);
            Check();
        });



        function Check() {
            clearInterval(idI);

            let w = $("main");
            if (w.width() >= 1200) {
                main.height(e.xl == "auto" ? "auto" : w.height() - e.xl);
            }
            else if (w.width() >= 992) {
                main.height(e.lg == "auto" ? "auto" : w.height() - e.lg);
            }
            else if (w.width() >= 768) {
                main.height(e.md == "auto" ? "auto" : w.height() - e.md);
            }
            else if (w.width() >= 576) {
                main.height(e.sm == "auto" ? "auto" : w.height() - e.sm);
            }
            else {
                main.height(e.xs == "auto" ? "auto" : w.height() - e.xs);
            }
        }
    }
};






$.fn.niceScrollExt = function (e) {
    let main = $(this);
    if (main.length) {
        main.niceScroll(e);
        setInterval(function () {
            main.getNiceScroll().resize();
        }, 100);
    }
};







function TitlePageHtemeInit() {
    $(".title-page").each(function () {
        var main = $(this);
        if (!main.find(".title-page-shadow").length) {
            main.html(main.text() + "<span class=\"title-page-shadow\">" + main.text() + "</span>");
        }
    });
}

function NiceText() {
    $(".nice-text").each(function () {
        let main = $(this);
        if (!main.find(".title-page-shadow").length) {
            main.html(main.html() + "<span class=\"nice-text-shadow\">" + main.html() + "</span>");
        }
    });
}



$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};


$.fn.CheckboxTheme = function () {
    $(this).each(function () {
        let main = $(this);
        let mainParent = main.parent();

        if (mainParent.hasClass("checkbox-block")) return false;
        mainParent.addClass("checkbox-block").prepend("<i></i>");

        if (main.is(":checked") && main.is(":disabled")) {
            mainParent.addClass("checked-disabled");
        }
        else if (!main.is(":checked") && main.is(":disabled")) {
            mainParent.addClass("disabled");
        }
        else if (main.is(":checked") && !main.is(":disabled")) {
            mainParent.addClass("checked");
        }

        mainParent.find("i, label").click(function () {


            if (main.is(":disabled")) return false;

            main.click();

            if (!main.is(":checked")) {
                //main.prop("checked", false);
                mainParent.removeClass("checked");
            }
            else {
                //main.prop("checked", true);
                mainParent.addClass("checked");
            }
            return false;
        });
    });
};


$.fn.RadioTheme = function () {
    $(this).each(function () {
        var main = $(this);
        var mainParent = main.parent();

        if (mainParent.hasClass("theme-radio")) return false;

        mainParent.addClass("theme-radio").prepend("<i></i>");

        if (main.hasAttr("checked") && main.hasAttr("disabled")) mainParent.addClass("checked-disabled");
        else if (!main.hasAttr("checked") && main.hasAttr("disabled")) mainParent.addClass("disabled");
        else if (main.hasAttr("checked") && !main.hasAttr("disabled")) mainParent.addClass("checked");

        mainParent.find("i, label").click(function () {

            var input = $(this).parent().find("input");
            var name = input.attr("name");
            var allInputs = $("input[name=" + name + "]");
            allInputs.each(function () {
                $(this).prop("checked", false).parent().removeClass("checked");
            });
            input.prop("checked", true).parent().addClass("checked");
        });
    });
};


var SelectTheme = {
    Flag: false,
    Init: function () {
        this.Build();
        $(document).click(function (e) {
            SelectTheme.main.each(function () {
                var b = $(this).parent();
                if (!b.has(e.target).length) b.find("ul").hide();
            });
        });
    },
    Build: function () {
        this.main = $("select");
        this.main.each(function () {
            var main = $(this);
            if ($(this).parent().hasClass("theme_select")) return false;
            $(this).wrap("<div class='theme_select'></div>");
            var optionAr = $(this).find("option");
            var defaultOptions = $(this).find(":selected").text();
            defaultOptions = defaultOptions.length ? defaultOptions : $(this).hasAttr("placeholder") ? $(this).attr("placeholder") : "";
            var newSelect = "<div onclick='SelectTheme.OpenList(this)'><div class='ts_selected_item'>" + defaultOptions + "</div><div class='ts_arrow'><span class='icon-arrow-down'></span></div></div><ul class='ts_list'>";
            for (var i = 0; i < optionAr.length; i++) {
                if ($(optionAr[i]).is(":selected")) {
                    newSelect += "<li class='selected' value='" + $(optionAr[i]).val() + "'>" + $(optionAr[i]).text() + "</li>";
                }
                else {
                    newSelect += "<li value='" + $(optionAr[i]).val() + "'>" + $(optionAr[i]).text() + "</li>";
                }
            }
            newSelect += "</ul>";
            $(this).parent().append(newSelect);

            main.parent().find("ul li").click(function () {
                main.find("[selected]").prop("selected", false);
                main.parent().find("[class=selected]").removeAttr("class");
                $(this).addClass("selected");
                main.parent().find(".ts_selected_item").html(main.find("[value=" + $(this).attr("value") + "]").prop("selected", true).html());
                $(this).parent().hide();

            });

            SelectTheme.Cor(main);
            $(window).resize(function() {
                SelectTheme.Cor(main);
            });
        });
    },
    Cor: function (main) {
        var w = main.parent().width();
        main.parent().find(".ts_selected_item").width(w - 32 - 40);
    },
    OpenList: function (btn) {
        SelectTheme.Flag = true;
        var list = $(btn).next();
        if (list.is(":visible")) list.hide();
        else list.show();
        SelectTheme.Flag = false;
    }
};
function afterOpenPopup() {
}