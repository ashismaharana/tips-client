'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')

  .controller('SessionCtrl', function ($scope, $http, $modal, $log, $location, $cookieStore, $rootScope, Signup, Login, IsLoggedIn, Category, Tip, Signout, Update, TipsUser) {

    //get tips and categories data to show
    $scope.tips = Tip.getTips();  
    $scope.categories = Category.query();


    $scope.signupView = false;
    $scope.signin = false;
    // console.log($modal);

    //the user is loggedin user
    $scope.user = $cookieStore.get('current_user');
    // console.log("INFO: user.id is",$cookieStore.get('current_user').id);

    if($scope.user && $scope.user.id){
      TipsUser.getUserTips($scope.user.id, function(err, data){
        if(err){
          console.log("Error getting the tips for the user");
          $scope.tipsOfUser = [];
        } else {
          $scope.tipsOfUser = data;
        }
      });
    };
    
    // $scope.login = Login.login($scope.user);
        $scope.login = function (user){
          console.log('user', user);
          // $http.post('http://localhost:1337/login', function())
            Login.postLogin(user, function(err, userRecord){
              	if(err){
              		console.log(err);
                  // alert(err);
              	} else {
                	console.log('user is ', userRecord);
                	// alert('user is ', userRecord);
            		$scope.user = userRecord;
                    // alert('welcome ',userRecord.firstName);

                    if(userRecord.id){
                      // Store the current user in a cookie
                      $cookieStore.put('current_user', userRecord);
                      // Set the root scope isLoggedIn to true
                      $rootScope.isLoggedIn = true;
                      // Redirect the user to a location
                      $location.path('/user');
                        // $scope.signin = !$scope.signin ;
                        // $scope.signInBtn = !$scope.signInBtn;
                        // console.log('user id is : ', userRecord.id);
                    } else {
                      // Delete the current user in a cookie
                      $cookieStore.put('current_user', null);
                      // Set the root scope isLoggedIn to false
                      $rootScope.isLoggedIn = false;
                    } 
              	}
            });
        };


    $scope.signup = function(user){
    	console.log('user', user);
      	Signup.postSignup(user, function(err, userRecord){
    		if(err){
    			console.log(err);
    		} else {
    			console.log('user is ', userRecord);
    			// alert('welcome ', userRecord);
    		}
   		});
 	  };
    
    // profile.html 
    $scope.update = function(user){
        console.log('user', user);
        Update.postUpdate(user, function(err, userUpdate){
            if(err){
                console.log(err);
            } else {
              console.log('cookie user',$cookieStore.get('current_user'));
              $cookieStore.put('current_user', userUpdate);
              console.log('INFO: user update :', userUpdate);
              $location.path('/profile');
            }
        });
    };



    // used for Signout service
    $scope.signOut = function(){
      // check if the current user is existing 
      if($cookieStore.get('current_user')){
          console.log('is signOut? :');

      // if exists, send a request to server and destroy the current session
        var isSignedOut = Signout.destroySession(function(err, data){
          console.log('is session destroyed? :', data);
          // on successful removal of session, delete the cookie ( make current user null )
          $cookieStore.remove('current_user');
          $rootScope.isLoggedIn = false;
          $location.path('/');
        });
      }
    };

  })//end

//directive used here
  .directive('login',function(){
    return{
      templateUrl: 'views/signin.html'
    };
  })

  .directive('signup',function(){
    return{
      templateUrl: 'views/signup.html'
    };
  });