angular.module('website', ['ngAnimate', 'firebase'])
    .constant('FURL', 'https://popping-heat-7267.firebaseio.com/')
    .controller('MainCtrl', function ($scope, InstanceService, $interval, FURL, $firebaseArray) {
        var fb = new Firebase(FURL);
        var fbData = $firebaseArray(fb.child('data'));

        $scope.categories = InstanceService.getCategories();
        //$scope.instances = InstanceService.getInstances();
        
        // Snippet to periodically query data
        // $scope.intervalFxn = function() {
        //     $interval(function() { 
        //         $scope.which *= -1
        //         $scope.instances = InstanceService.getInstances($scope.which)
        //     }, 1000)
        // };

        // $scope.which = 1;
        // $scope.intervalFxn();

        $scope.currentInstance = null;
        $scope.currentInstanceFeature = null;

        $scope.setCurrentInstance = function (instance) {
            $scope.currentInstance = instance;
        };

        $scope.isCurrentInstance = function (instance) {
            return $scope.currentInstance === instance;
        };

        $scope.setCurrentInstanceFeature = function (feature) {
            $scope.currentInstanceFeature = feature;
        };

        $scope.isMuted = function (feature) {
            return $scope.currentInstanceFeature !== null && $scope.currentInstanceFeature !== feature;
        };

        $scope.queryData = function(arg) {
            $scope.instances = $firebaseArray(fb.child('data'));
        }

        $scope.queryData();
    })
    .factory('InstanceService', function () {
        var categories = [
            {name: 'standard', display: 'Standard'},
            {name: 'highmemory', display: 'High Memory'},
            {name: 'highcpu', display: 'High CPU'},
            {name: 'highio', display: 'High I/O'}
        ];

        var getCategories = function () {
            return categories;
        };

        return {
            getCategories: getCategories
        }
    });
