(function () {
    'use strict';

    angular
        .module('app')
        .controller('Account.IndexController', Controller);

    function Controller($window, UserService, FlashService) {


/*        var GCVUrl = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBcP8YJ21S0E-lBWrP_LkSCu1yGBLNq_kg';
// Enable the Cloud Vision API and get a key - see
// https://cloud.google.com/vision/docs/quickstart
var input = document.querySelector('input[type=file]');
var fileReader = new FileReader();

input.onchange = function (event) {

  var file = event.target.files[0];

  fileReader.onload = function(fileLoadedEvent) {
    var GCVRequest = {
      requests: [{
        image: {
          content: fileLoadedEvent.target.result.split(',')[1]
          // must discard `data:image/png;base64,`
        },  
        features: [{type: 'TEXT_DETECTION'}]
      }]
    };

    $.ajax({
      type: 'POST',
      url: GCVUrl,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(GCVRequest),
      success: function (data) {
        var texts;
        if (texts = data.responses[0].textAnnotations) {
          alert(texts[0].description);
        } else {
          alert('No text was recognized');
        }
      },
      error: function(jqXhr, textStatus, error) {
        alert('XHR error: ' + jqXhr.responseJSON.error.message);
      }
    });

  };

  fileReader.readAsDataURL(file);

};  */





        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;
        //vm.saveRecord = saveRecord;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function saveUser() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

     /*    function saveRecord() {
            UserService.Record(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }  */

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }


})();