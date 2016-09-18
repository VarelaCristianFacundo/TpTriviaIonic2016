angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout) {
   $scope.usuario =[];
   $scope.usuarios={};

    var userRef = new Firebase('https://tp1trivia.firebaseio.com/usuarios');

    userRef.on('child_added', function (snapshot) {
    $timeout(function(){

    var user = snapshot.val();
    $scope.usuario.push(user);
//    console.log($scope.usuario);

    });
   });


  $('#login').on('click', function(){

    var username = $("#nombre").val();
    var flag = 0;
  //alert ("Bienvenido "+username);

        for(var ref in $scope.usuario)
        {           
            if ($scope.usuario[ref] === username)
            {
                flag = 1;
                break;
            }
        }
        if (flag == 1)
        {
            alert ("Bienvenido " + username);
        }
        else
        {
            alert ("Usted no es usuario");
        }

  })
})

.controller('ChatsCtrl', function($scope, Chats, $timeout) {
 
$scope.preguntas= [];
$scope.respuestas={};

  var pregRef = new Firebase('https://tp1trivia.firebaseio.com/preguntas');

    pregRef.on('child_added', function (snapshot) {
    $timeout(function(){

    var preg = snapshot.val();
   // console.log(preg);
    $scope.preguntas.push(preg);
    $scope.respuestas[preg.id] = preg.respuesta;

    });
   });

$scope.opcSelected = {};

  $("#enviar").on('click', function(){
    
    $scope.respOK = 0; //contador de respuestas OK
    $scope.respFail = 0;

        for(var respuesta in $scope.respuestas)
        {           
            if ($scope.respuestas[respuesta] === $scope.opcSelected[respuesta]){
       //         alert("Respuesta BIEN");
                $scope.respOK ++;
            }
            else{
                $scope.respFail++;
         //       alert("Respuesta MAL");   
            }
        }
  });

})

.controller('login', function($scope, $timeout, $state) {
   $scope.usuario =[];
   $scope.usuarios={};

    var userRef = new Firebase('https://tp1trivia.firebaseio.com/usuarios');

    userRef.on('child_added', function (snapshot) {
    $timeout(function(){

    var user = snapshot.val();
    $scope.usuario.push(user);
//    console.log($scope.usuario);

    });
   });


  $('#login').on('click', function(){

    var username = $("#nombre").val();
    var flag = 0;
  //alert ("Bienvenido "+username);

        for(var ref in $scope.usuario)
        {           
            if ($scope.usuario[ref] === username)
            {
                flag = 1;
                break;
            }
        }
        if (flag == 1)
        {
            alert ("Bienvenido " + username);
            $state.go('tab.chats');
        }
        else
        {
            alert ("Usted no es usuario");
        }

  })
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


 
