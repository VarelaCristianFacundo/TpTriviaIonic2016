angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, $state) {

  $('#deslogin').on('click', function(){

    alert ("¡Hasta luego!");
    $state.go('login');

  })
})

.controller('ChatsCtrl', function($scope, Chats, $timeout) {
 
$scope.preguntas= [];
$scope.respuestas={};
$scope.question;
$scope.opcSelected={};
$scope.option = [];

var id=1;

  var pregRef = new Firebase('https://tp1trivia.firebaseio.com/preguntas');

    pregRef.on('child_added', function (snapshot) {
    
    $timeout(function(){

    var preg = snapshot.val();
    $scope.preguntas.push(preg);
    $scope.respuestas[preg.id] = preg.respuesta;
    if (preg.id == id)
    {
      $scope.question = $scope.preguntas[id];
      alert($scope.preguntas[1]);
      $scope.option = preg.opciones;
      //console.log (preg.opciones);
    }    
    
    });
   });

    


  $("#enviar").on('click', function(){
    id++;
    $scope.question = $scope.preguntas[id];
    $scope.option = $scope.preguntas[id].opciones;
    $scope.respOK = 0; //contador de respuestas OK
    $scope.respFail = 0;

    console.log($scope.preguntas[id].respuesta);
    console.log($scope.opcSelected);
    if ($scope.preguntas[id].respuesta === $scope.opcSelected)
    {
      alert ("Bien pelotudo");
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


 
