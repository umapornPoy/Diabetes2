﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('Account.IndexController', Controller);

    function Controller($window, UserService, FlashService, $scope, $filter) {  

   


        var date = new Date();
        console.log(date);

        var day = date.getDate();
        console.log(day);

        var month = date.getMonth();
        console.log(month);

        var year = date.getFullYear();
        console.log(year);

        console.log(day+"/"+month+"/"+year);

        var vm = this;

        vm.user = null;
<<<<<<< HEAD
         

        };
=======
>>>>>>> 6d77f7bb812f780fece9e22425ad7591713e7eb3

        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;
        vm.deselect = deselect;
        vm.saveRecord = saveRecord;
        vm.saveFood = saveFood;
   

        initController();

        function initController() {
            // get current user
            var dataList = [];

            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                
                for (var i = 0; i < user.record.length; i++) {
                    var data = { sugarblood: user.record[i].sugarblood};
                    dataList.push(data);       
                }  
                 
             $scope.bloodInt = dataList[(dataList.length -1 )].sugarblood;
                $scope.sugarProgress =  parseFloat(($scope.bloodInt/140)*100).toFixed(2);

               
                  
            
                
                vm.user.item_name = localStorage.getItem('item_name');
                vm.user.serving_size_qty = localStorage.getItem('serving_size_qty');
                vm.user.calories = localStorage.getItem('calories');
                vm.user.sugars = localStorage.getItem('sugars');
                vm.user.total_fat = localStorage.getItem('total_fat');
                vm.user.cholesterol1 = localStorage.getItem('cholesterol1');
                vm.user.sodium = localStorage.getItem('sodium');
                vm.user.protein = localStorage.getItem('protein');

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
                refresh();

        }

         function saveRecord() {


            UserService.Record(vm.user)
                .then(function () {
                    FlashService.Success('Add Record');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
                refresh();

        }  

          function saveFood() {
            UserService.Food(vm.user)
                .then(function () {
                    FlashService.Success('Add Food');

                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
                refresh();
        }


        function deselect() {
            vm.user = "";
          }

          var refresh = function() {

         };

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