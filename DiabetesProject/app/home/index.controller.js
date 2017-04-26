(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, $timeout) {

        var vm = this;

        vm.user = null;

        initController();

        function initController() {

            var dataList = [];
            // get current user


            UserService.GetCurrent().then(function (user) {

                vm.user = user;
                dataList = [];
                for (var i = 0; i < user.record.length; i++) {

//length -6   

                    var data = { day1: String = user.record[i].date, 
                        sugarblood: parseInt(user.record[i].sugarblood), 
                        cholesterol: parseInt(user.record[i].cholesterol), 
                        weight1: parseInt(user.record[i].weight1) }
                    dataList.push(data);
                    console.log(dataList)
                }
                var chart = {
                    element: "chart",
                    data: dataList,
                    xkey: "day1",
                    ykeys: ["sugarblood", "cholesterol", "weight1"],
                    lineColors: ['#FF0000', '#6A5ACD', '#2E8B57'],
                    pointFillColors: ['#8B0000', '#483D8B', '#228B22'],
                    labels: ["sugarblood", "cholesterol", "weight"]
                };
                new Morris.Line(chart);
            });
  
        }

    }

})();