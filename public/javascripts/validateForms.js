<<<<<<< HEAD
(function () {
    'use strict'
    const forms = document.querySelectorAll('.validated-form')

    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
=======
(function () {
    'use strict'
    const forms = document.querySelectorAll('.validated-form')

    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
>>>>>>> 3b96ba7 (add booking functionality)
})()