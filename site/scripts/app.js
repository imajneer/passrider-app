var app = angular.module('passrider', ['btford.socket-io','ngSanitize'])

.factory('mySocket', function (socketFactory) {
  return socketFactory();
})
 
.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
})
.controller('MainCtrl', ['$scope','$rootScope', '$sce','socket', function($scope, $rootScope, $sce,socket) {
    socket.on('connection',function() {
        console.log('connected to socket!');
    });
    
    console.log('should connect to socket');
    $scope.flight = {};
    $rootScope.flights = {};
    $scope.lookForFlight = function() {
        socket.emit('lookForFlight',$scope.flight,function(html) {
            console.log('found flights!');
            $rootScope.flights.result = $sce.trustAsHtml(html);
        });
    }
}]);
