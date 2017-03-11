(function () {
    'use strict';

    angular
        .module('app')
        .controller('Account.IndexController', Controller);

    function Controller($window, UserService, FlashService, $scope) {  

        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;
        vm.deselect = deselect;
        vm.saveRecord = saveRecord;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                vm.user.sugarblood = localStorage.getItem('texts');
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

         function saveRecord() {
            UserService.Record(vm.user)
                .then(function () {
                    FlashService.Success('Add Record');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }  

        function deselect() {
            vm.user = "";
          }

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