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

                Morris.Line({
                    element: 'graph_line',
                    xkey: 'year',
                    ykeys: ['value'],
                    labels: ['Value'],
                    hideHover: 'auto',
                    lineColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
                        data: [
                            {year: '2012', value: 20},
                            {year: '2013', value: 10},
                            {year: '2014', value: 5},
                            {year: '2015', value: 5},
                            {year: '2016', value: 20}
                        ],
                            resize: true
                    });

                $MENU_TOGGLE.on('click', function() {
                $(window).resize();
            });
        });
  
        }

       }
})();