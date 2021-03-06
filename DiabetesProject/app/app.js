﻿(function () {
    'use strict';

    var app = angular
        .module('app', ['ui.router','pascalprecht.translate'])
        .config(config)
        .run(run);


    function config($stateProvider, $urlRouterProvider, $translateProvider){
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('record', {
                url: '/record',
                templateUrl: 'record/record.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'record' }
            })
            .state('chart', {
                url: '/chart',
                templateUrl: 'record/chart.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'chart' }
            })
            .state('email', {
                url: '/email',
                templateUrl: 'email/email.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'email' }
            })
             .state('progressbar', {
                url: '/progressbar',
                templateUrl: 'email/progressbar.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'progressbar' }
            })
              .state('nutrientsprogress', {
                url: '/nutrientsprogress',
                templateUrl: 'email/nutrientsprogress.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'nutrientsprogress' }
            })
            .state('food', {
                url: '/food',
                templateUrl: 'food/food.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'food' }
            })
            .state('showFood', {
                url: '/showFood',
                templateUrl: 'food/showFood.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'showFood' }
            })
            .state('barcode', {
                url: '/barcode',
                templateUrl: 'food/barcode.html',
               // controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'barcode' }
            })
            .state('Nutrition', {
                url: '/Nutrition',
                templateUrl: 'Nutrition/Nutrition.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'Nutrition' }
            });
     
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });

  function Controller(UserService) {
        var vm = this;

        vm.user = null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
    }

    app.controller('langCtrl',['$scope', '$translate', function ($scope, $translate) {
    $scope.changeLanguage = function(key){
      $translate.use(key);
    };
  }]);


})();