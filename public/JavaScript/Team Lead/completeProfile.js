/**
 * Setting the User Profile Image Modal 
 */

const wrapper = document.querySelector(".wrapper");
const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const img = document.querySelector("#newImage");
const submitBTN = document.querySelector(".submitBTN");
img.hidden = true
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
function defaultBtnActive() {
    defaultBtn.click();
}
defaultBtn.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const result = reader.result;
            img.hidden = false
            submitBTN.hidden = false

            img.src = result;
            wrapper.classList.add("active");
            if (file.size > 3000000) {
                img.src = "";
                img.hidden = true
                submitBTN.hidden = true
                wrapper.classList.remove("active");
                displayToast('File Size Must be less than 3 MB', 'danger')
            }
        }
        cancelBtn.addEventListener("click", function () {
            img.src = "";
            img.hidden = true
            submitBTN.hidden = true
            wrapper.classList.remove("active");
        })
        reader.readAsDataURL(file);
    }
    if (this.value) {
        let valueStore = this.value.match(regExp);
        fileName.textContent = valueStore;
    }
});
/**
 * Upload the User profile Image
 */
$('.submitBTN').on('click', () => {
    $('#userProfileForm').submit((e) => {
        e.preventDefault()
        console.log("Submitting");
        var fd = new FormData(document.getElementById('userProfileForm'));
        var files = $('#default-btn')[0].files;

        // Check file selected or not
        if (files.length > 0) {
            fd.append('file', files[0]);
        }

        if (files[0].size < 3000000) {
            if (fd) {
                $.ajax({
                    type: "POST",
                    url: "/teamlead/uploadProfilePhoto",
                    data: fd,
                    cache: false,
                    contentType: false,
                    processData: false,
                    error: (error => {
                        displayToast(error.messages, error.type)
                    }),
                    success: (response) => {
                        displayToast(response.messages, response.type)
                        $('#uploadImageModal').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        if (response.ProfilePic) {
                            $('#profileImage').prop('src', response.ProfilePic)
                        }

                    }
                });
            }
        } else {
            displayToast('File Size Must be less than 3 MB', 'danger')
        }
    })
})



/**
 * Submitting the info to the database
 */

$('#submitInfo').on('click', (e) => {
    e.preventDefault();
    if (validateInput()) {
        $.ajax({
            type: "POST",
            url: "/teamlead/updateProfileInfo",
            data: {
                name: $('#name').val(),
                contact: $('#contact').val(),
                "username": $('#username').val()
            },
            dataType: "json",
            cache: false,
            error: (error) => {

            },
            success: (response) => {
                if (response) {
                    toastr.success('Successfully!!! Profile is Updated.')
                    toastr.success('Redirecting to Dashboard')

                    window.location = `${window.location.origin}/teamlead/Dashboard/${response.uuid}`


                }

            }
        });
    }
})



function validateInput() {
    if ($('#name').val().includes('update') || $('#name').val().includes('select') || $('#name').val().includes('delete')) {
        toastr.error('Invalid Name. Please Try to Enter Valid Name')
        return false
    }
    if ($('#username').val().includes('update') || $('#username').val().includes('select') || $('#username').val().includes('delete')) {
        toastr.error('Invalid username. Please Try to Enter Valid Name')
        return false
    }
    if ($('#contact').val().includes('update') || $('#contact').val().includes('select') || $('#contact').val().includes('delete')) {
        toastr.error('Invalid Contact Number. Please Try to Enter Valid Name')
        return false
    }
    else {
        return true
    }
}








/**
 * Function to display the message
 */



function displayToast(messages, type) {
    if (messages) {
        if (type === 'danger')
            toastr.error(messages)
        if (type === 'info')
            toastr.info(messages)
        if (type === 'success')
            toastr.success(messages)
        if (type === 'warning')
            toastr.warning(messages)

    }
}





// }


