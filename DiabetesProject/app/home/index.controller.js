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


<<<<<<< HEAD
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
=======
      $(document).ready(function() {
        //random data
        var d1 = [
          [0, 143],
          [1, 146],
          [2, 144],
          [3, 140],
          [4, 141],
          [5, 143],
          [6, 142],
          [7, 145],
          [8, 147],
          [9, 149],
          [10, 147],
          [11, 143],
          [12, 146],
          [13, 145],
          [14, 140],
          [15, 139],
          [16, 140]
        ];

        //flot options
        var options = {
          series: {
            curvedLines: {
              apply: true,
              active: true,
              monotonicFit: true
            }
          },
          colors: ["#26B99A"],
          grid: {
            borderWidth: {
              top: 0,
              right: 0,
              bottom: 1,
              left: 1
            },
            borderColor: {
              bottom: "#7F8790",
              left: "#7F8790"
            }
          }
        };
        var plot = $.plot($("#placeholder3xx3"), [{
          label: "Sugar Blood",
          data: d1,
          lines: {
            fillColor: "rgba(150, 202, 89, 0.12)"
          }, //#96CA59 rgba(150, 202, 89, 0.42)
          points: {
            fillColor: "#fff"
          }
        }], options);
      });
  
>>>>>>> 5fa0d712058cf21b07e02b2ce235b95c9ab63e05
        }

    }

})();