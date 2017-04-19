(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService) {

        var vm = this;

        vm.user = null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                console.log(user);
            });


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
  
        }

       }
})();