angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, $state) {

  $('#deslogin').on('click', function(){

    alert ("¡Hasta luego!");
    $state.go('login');

  })
})

.controller('ChatsCtrl', function($scope, Chats, $timeout, $state) {
 
$scope.preguntas= [];
$scope.respuestas={};
$scope.question;
$scope.opcSelected={};
$scope.option = {};
$scope.respOK = 0; //contador de respuestas OK
$scope.respFail = 0;

var bandera=true;
var id=0;

  var pregRef = new Firebase('https://tp1trivia.firebaseio.com/preguntas');

    pregRef.on('child_added', function (snapshot) {
    
    $timeout(function(){

    var preg = snapshot.val();
    $scope.preguntas.push(preg);
    $scope.respuestas[preg.id] = preg.respuesta;
    if (bandera)
    {
      bandera = false;
      $scope.question = preg;
   //   console.log(preg);
      $scope.option = preg.opciones;
      //console.log (preg.opciones);
    }    
    
    });
   });

    


  $("#enviar").on('click', function(){
    id++;
    console.log($scope.preguntas[id]);
    $scope.question = $scope.preguntas[id];
    $scope.option = $scope.preguntas[id].opciones;


 //   console.log($scope.preguntas[id].respuesta);
    
   // console.log($scope.opcSelected);
    for (ref in $scope.opcSelected)
    { 
      //console.log ($scope.preguntas[id-1].respuesta);
      //console.log ($scope.opcSelected[ref]);
      console.log ($scope.preguntas.length);
      console.log (id);
        if ($scope.preguntas[id-1].respuesta == $scope.opcSelected[ref])
        {
           $scope.respOK ++; //contador de respuestas OK
           //break;
        } 
        else
        {
           $scope.respFail ++;
           //break;
        }
      
        if(id == $scope.preguntas.length -1)
        {
         alert ("Respuestas correctas: " + $scope.respOK + "\n" + "Respuestas erróneas: " + $scope.respFail);
         $state.go('tab-account');
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


 
