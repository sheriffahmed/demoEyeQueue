/* Created at The Knowledge House */

angular.module(
  'starter', 
  ['ionic','ionic.service.core', 'btford.socket-io', 'starter.controllers', 'starter.services', 'ionic.cloud']
)
.constant('apiUrl', 'http://eyequeue.herokuapp.com')
.factory('socket', function (socketFactory, apiUrl) {
  var socket = socketFactory({
    ioSocket: io.connect(apiUrl)
  });
  socket.on('orderReady', function(order){
    alert("order " + order.orderNumber + " is ready to pick up")
  })
  return socket;
}).factory('user', function($http, apiUrl){
  var user;

  $http.get(apiUrl + '/user')
    .then(function(response){
      user = response.data
    })

  return {
    getUser: function() {
      return user;
    }
  }
})
.run(function($ionicPlatform, $ionicPush) {
    $ionicPlatform.ready(function() {

    setTimeout(function () {
        //navigator.splashscreen.hide();
    }, 2000);

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
        //StatusBar.styleDefault();
        StatusBar.styleLightContent();
    }

  });
//     $ionicPush.register().then(function(t) {
//   return $ionicPush.saveToken(t);
// }).then(function(t) {
//   console.log('Token saved:', t.token);
// });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicCloudProvider) {

  // $ionicCloudProvider.init({
  //   "core": {
  //     "app_id": "AAA0070A"
  //   },
  //   "push": {
  //     "sender_id": "674006259291",
  //     "pluginConfig": {
  //       "ios": {
  //         "badge": true,
  //         "sound": true
  //       },
  //       "android": {
  //         "iconColor": "#343434"
  //       }
  //     }
  //   }
  // });
// })
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');

    // set tabs position on the top
    $ionicConfigProvider.tabs.position('top');

    $stateProvider
    .state('app', {
      url: '/app',
      abstract: true
    })
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeController'
      }
    }
  })

  // map view mode
  .state('tab.location', {
    url: '/location',
    views: {
      'tab-location': {
        templateUrl: 'templates/tab-location.html',
        controller: 'Location'
      }
    }
  })

   // map view mode
  .state('tab.restaurant', {
    url: '/restaurant',
    views: {
      'tab-restaurant': {
        templateUrl: 'templates/tab-restaurant.html',
        controller: 'Restaurant'
      }
    }
  })

  // search
  .state('tab.meals', {
    url: '/meals',
    views: {
      'tab-meals': {
        templateUrl: 'templates/tab-meals.html',
        controller: 'SearchController'
      }
    }
  })

  // search filter
  .state('tab.search_filter', {
    url: '/search-filters',
    views: {
      'tab-search': {
        templateUrl: 'templates/search-filters.html',
        controller: 'SearchFilterController'
      }
    }
  })

  // view restaurant detail
  .state('detail', {
    url: '/detail',
    templateUrl: 'templates/detail.html',
    controller: 'DetailController',
    params: {
      meal: null
    },
    cache: false
  })

  // view add restaurant meal item
  .state('menu_items', {
    url: '/menu-items',
    templateUrl: 'templates/menu-items.html',
    // abstract: true,
    controller: 'MenuItemsController'
  })

  // view user account
  .state('account', {
    url: '/account',
    templateUrl: 'templates/account.html',
    controller: 'AccountController'
  })

  // login screen
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthController'
  })

  // register screen
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'AuthController'
  });

  // default url state
  $urlRouterProvider.otherwise('/login');

});
