/**
 * Created by svc on 13.08.2018.
 */

var popupOptions = {
    overlay: {
        css: {
            backgroundColor: '#fff',
            opacity: .65
        }
    }
};

function systemSignIn(result) {
    if (typeof result === 'undefined') {
        setTimeout(function () {
            $('.uws-input').each(function () {
                if (($(this).attr("type") != 'password')) {
                    $(this).prev().addClass('form__label_focus');
                }
            });
            afterOpenPopup();
        }, 1000)
        return false;
    }
    $.ajax({
        url: "/login/",
        data: {'_token': result.jwt}
    })
        .done(function( data ) {
            console.log(data);
            if(data.state == 'OK') {
                window.location.href = 'lk';
            }
        });
}

function systemTokenRenew(result) {
    $.ajax({
        url: "/renew_token/",
        data: {'_token': result.jwt}
    })
        .done(function( data ) {
            console.log(data);
        });
}
function systemSignOut() {
    window.location.href = "/logout";
}



function systemJsonSignOut() {
    $.ajax({
        url: "/json_logout/",
    })
        .done(function( data ) {
            console.log(data);
        });
}
const widget = new UWSPassportWidget({
    projectId: '823',
    baseUrl: 'https://uwspassport-staging.dalee.ru',
    onSignOut: function(result) {
        console.log(result)
    },
    onSignUpSuccess: function(result) {
        console.log(result)
        eC('Signup', 'SentForm', 'Success_Signup', 'OptionSingup');
    },
    onSignUpFailure: function(error) {
        var fields = Object.keys(error.validation).toString();
        eE('Signup', 'SentForm', 'Unsuccess_Signup', fields, "422 Unprocessable Entity");
    },
    onSignInSuccess: function(result) {
        eC('SignIn', 'SentForm', 'Success_SignIn', 'OptionSignIn');
        console.log(result);
        systemSignIn(result)
    },
    onSignInFailure: function(error) {
        console.error(error)
        eC('SignIn', 'SentForm', 'Unsuccess_SignIn', error.message, '403 Forbidden');
    },
    onGetTokenSuccess: function(result) {
        systemSignIn(result)
        //systemTokenRenew(result)
        console.log(result)
    },
    onGetTokenFailure: function(error) {
        systemJsonSignOut()
        console.error(error)
    },
    onGetProfileSuccess: function(result) {
        console.log(result);
        var state = widget.getState();
        if (state.token) {
            systemSignIn(state.token.jwt);
        }
    },
    onGetProfileFailure: function(error) {
        systemJsonSignOut();
        console.log(error)
    },
    onUpdateProfileSuccess: function(result) {
        console.log(result);
        var state = widget.getState();
        if (state.token) {
            systemSignIn(state.token.jwt);
        }
    },
    onUpdateProfileFailure: function(error) {
        console.error(error)
    }
})


const fields = {};
$(function() {
    $('body')
        .on('click', "a[href='#signIn']", function(){
            widget.signInWithUI(fields);
            afterOpenPopup();
            UwsWidget.SignIn();
        })
        .on('click', "a[href='#signUp']", function(){
            eA('Signup', 'OpenSignup');
            widget.signUpWithUI(fields);
            afterOpenPopup();
            UwsWidget.SignUp();
        })
        .on('click', "a[href='#signOut']", function(){
            widget.signOut();
            systemSignOut();
        })
        .on('click touchstart', "a#menuSignIn", function () {
            widget.signInWithUI(fields);
            $('#menuPopup').arcticmodal('close');
            afterOpenPopup();
        })
        .on('click', "#uws-sign-up button.uws-dialog__close", function () {
            var inputs = $('#uws-sign-up input');
            var field = '';
            for (var i = 0; i < inputs.length; i++) {
                if(($(inputs[i]).val() != '') && ($(inputs[i]).val() != 'on')) {
                    field = $(inputs[i]).attr('name');
                }
            }
            eL('Signup', 'CancelSingup', field);
        });
    $('#uploadModal').on('show.bs.modal', function () {
        var state = widget.getState();
        if (!state.token) {
            widget.signInWithUI(fields);
            afterOpenPopup();
            UwsWidget.InitDefault();
            UwsWidget.SignIn();
            return false;
        }
    });
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/*
 const queryToObject = query => query
 .replace('?', '')
 .split('&')
 .map(param => param.split('='))
 .filter(([key]) => key !== '')
 .reduce((params, [key, value]) => ({ ...params, [decodeURIComponent(key)]: decodeURIComponent(value) }), {})
 */

document.addEventListener('DOMContentLoaded', function() {
    //const params = queryToObject(location.search)
    var params = {};
    params.confirmEmailCode = getParameterByName('confirmEmailCode');
    params.passwordToken = getParameterByName('passwordToken');
    params.status = getParameterByName('status');
    const onSuccess = function(result) {
        $("#stub_text_info").html("E-mail успешно подтвержден");
        $('#stubInfo').arcticmodal(popupOptions);
        console.log(result)
    }
    const onFailure = function(error) {
        $("#stub_text_error").html(error.message);
        $('#stubError').arcticmodal(popupOptions);
        console.error(error) }
    if (params.confirmEmailCode) {
        const fields_code = { code: params.confirmEmailCode }
        console.log(fields_code);
        widget.confirmEmail(fields_code, onSuccess, onFailure)
    }
    if (params.passwordToken) {
        const fields = {token: params.passwordToken}
        widget.resetPasswordWithUI(fields, onSuccess, onFailure)
        afterOpenPopup();
    }
    if (params.status) {
        $("#stub_text_info").html("Транзакция успешно совершена. К <a href='#withdraws' class='link'>списку</a> транзакций");
        $('#stubInfo').arcticmodal(popupOptions);
    }
});