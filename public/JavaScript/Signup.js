
(function ($) {
    "use strict"
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        if (!check) {
            return check
        }
        check = CheckPassword($('#userPassword').val())
        //check = CheckPassword($('#userConfirm_Password').val())

        if (!check) {
            toastr.error('Incorrect Password, Try Again')
            return check
        }
        else if ($('#userPassword').val() === $('#userConfirm_Password').val()) {
            check = true
        }
        else {
            toastr.error('Password does not match, Try Again')
            check = false
            return check
        }
        if (check)
            toastr.success('Registering...... Please Wait')
        return check
    })
    // Saad@1111

    function validate(input) {
        console.log(input);
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        toastr.error('Valid email example is required: Smith@gmail.com')
    }


    /**
     * Validating Password
     */

    function CheckPassword(inputtxt) {
        var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (inputtxt.match(decimal)) {
            return true;
        }
        else {
            toastr.error('Password must have 8-15 digits and  One Capital letter, One Special Letter, One Number and One Small letter')
            toastr.error('e.g Smith@1234')
            return false;
        }
    }











})(jQuery);


