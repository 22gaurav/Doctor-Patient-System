  document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};











  // trigger when registration form is submitted
    $(document).on('submit', '#sign_up_form', function () {

        // get form data
        var sign_up_form = $(this);
        var form_raw_data = {
            "FirstName": $('input[name=FirstName]').val(),
            "LastName": $('input[name=LastName]').val(),
            "Username": $('input[name=Username]').val(),
            "email": $('input[name=email]').val(),
            "Age": $('input[name=Age]').val(),
            "city": $('input[name=city]').val(),
            "disease": $('select[name=disease]').val(),
            "Password": $('input[name=Password]').val(),
        };
        var disea=document.getElementById('disease');
        

        console.log(JSON.stringify(form_raw_data));
        var form_data = JSON.stringify(form_raw_data);
        $('.loader__container').css('display', 'block');

        $.ajax({
            url: "https://finalyearp.herokuapp.com/user",
            type: "POST",
           contentType: 'application/json',
            data: form_data,
            success: function (result) {
               
                localStorage.setItem("disease", disea.value);
                sign_up_form.find('input').val('');
                console.log(result);
                
                $('.loader__container').css('display', 'none');
            },
            error: function (xhr, resp, text) {
                // on error, tell the user sign up failed
                alert("already signed in")
                $('.loader__container').css('display', 'none');
            }
        });

        return false;
    });



     // trigger when login form is submitted
    $(document).on('submit', '#login_form', function () {

        // get form data
        var login_form = $(this);
        console.log($('input[name=login_form_Username]').val());
        var json_raw_data = {
            "Username": $('input[name=login_form_Username]').val(),
            "Password": $('input[name=login_form_Password]').val(),
        };
        var dis=$('select[name=disease_changingDisease]').val();

        var form_data = JSON.stringify(json_raw_data);
        $('.loader__container').css('display', 'block');
        console.log(form_data);
        // submit form data to api
        $.ajax({
            url: "https://finalyearp.herokuapp.com/login",
            type: "POST",
            contentType: 'application/json',
            data: form_data,
            success: function (result) {
                
                // store jwt to cookie
                // setCookie("jwt", result.jwt, 1);
               console.log(result);
               localStorage.setItem('token', result.token);
               localStorage.setItem("disease", dis);
                // show home page & tell the user it was a successful login
                 window.location = "login/mainpage/index.html";
                // $('#response').html("<div class='alert alert-success'>Successful login.</div>");
               
                $('.loader__container').css('display', 'none');
            },
            error: function (xhr, resp, text) {
                // on error, tell the user login has failed & empty the input boxes
                $('#response').html("<div class='alert alert-danger'>Login failed. Email or password is incorrect.</div>");
                login_form.find('input').val('');
                $('.loader__container').css('display', 'none');
            }
        });

        return false;
    });


