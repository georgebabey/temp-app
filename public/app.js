angular.module('codepot-todo', [])
  .controller('TodoCtrl', function TodoCtrl($scope, $http) {


    $scope.addTodo = function addTodo() {
      var newTodo = {
        title: $scope.newTodo,
        completed: false
      };

      if (!newTodo.title) {
        return;
      }

      $scope.saving = true;
      $http.post('/api/todos', newTodo).then(function(result) {
        $scope.todos.push(result.data);
        $scope.newTodo = '';
      })
      .finally(function () {
        $scope.saving = false;
      });
    };

    $scope.removeTodo = function removeTodo(todo) {
      $http.delete('/api/todos/' + todo._id).then(function() {
        $scope.todos.splice($scope.todos.indexOf(todo), 1)
      })
    }

    $http.get('api/todos').then(function(result) {
      $scope.todos = result.data;
    });
  });


//controller('SlottingCtrl', [
//  'testCycle', 'TestCycleSvc', 'SlottingSvc', 'ErrorSvc', 'toastr', 'ENVIRONMENTS',
//  '$state', '$modal', '$q', '$window', 'testCycleUrl', slottingCtrl
//]);