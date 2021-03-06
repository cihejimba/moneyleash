
/* FIREBASE */
var fb = new Firebase("https://brilliant-inferno-1044.firebaseio.com");

// Ionic MoneyLeash App, v1.0
var moneyleashapp = angular.module('moneyleash', ['ionic', 'firebase', 'moneyleash.controllers', 'moneyleash.directives', 'moneyleash.factories', 'pascalprecht.translate'])

moneyleashapp.run(function ($ionicPlatform, $rootScope, $firebaseAuth, $ionicScrollDelegate, $state, Auth, fireBaseData, UserData) {

    $ionicPlatform.ready(function () {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        $rootScope.settings = {
            'languages': [{
                'prefix': 'en',
                'name': 'English'
            }, {
                'prefix': 'es',
                'name': 'Espa�ol'
            }]
        };

        $rootScope.isAdmin = false;
        $rootScope.authData = {};

        Auth.$onAuth(function (authData) {
            if (authData) {
                $rootScope.authData = authData;
            } else {
                $rootScope.hide();
                $state.go("intro");
            }
        });

        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $state.go("login");
            }
        });
    });
})

moneyleashapp.config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, $translateProvider) {

    $ionicConfigProvider.views.maxCache(0);

    /************************************/
    /* TRANSLATE                        */
    /************************************/
    $translateProvider.translations('en', {
        SIGNIN: "Login",
        REGISTER: "Register",
        LOGOUT: "Logout",
        REGISTER_DONTHAVEACCOUNT: "I dont have an account",
        REGISTER_ALREADYHAVEACCOUNT: "I already have an account",
        FORM_EMAIL: "Email",
        FORM_PASSWORD: "Password",
        FORM_FIRSTNAME: "First Name",
        FORM_LASTNAME: "Last Name",
        TABS_NAME_DASHBOARD: "Dashboard",
        TABS_NAME_EXPENSES: "Expenses",
        TABS_NAME_MEMBERS: "Members",
        TABS_NAME_SETTINGS: "Settings",
        SETTINGS_LANGUAGE: "Change language",
        SETTINGS_EDIT_PROFILE: "Edit Profile",
        SETTINGS_QUIT_HOUSE: "Quit House",
        REGISTER_FORGOTPASSWORD: "Forgot password"
    });
    $translateProvider.translations('es', {
        SIGNIN: "Ingresar",
        REGISTER: "Registrar",
        LOGOUT: "Desconectar",
        REGISTER_DONTHAVEACCOUNT: "No tengo cuenta",
        REGISTER_ALREADYHAVEACCOUNT: "Tengo cuenta",
        FORM_EMAIL: "Correo",
        FORM_PASSWORD: "Contrase�a",
        FORM_FIRSTNAME: "Nombre",
        FORM_LASTNAME: "Apellido",
        TABS_NAME_DASHBOARD: "Dashboard",
        TABS_NAME_EXPENSES: "Egresos",
        TABS_NAME_MEMBERS: "Miembros",
        TABS_NAME_SETTINGS: "Configuraci�n",
        SETTINGS_LANGUAGE: "Cambiar lenguaje",
        SETTINGS_EDIT_PROFILE: "Modificar perfil",
        SETTINGS_QUIT_HOUSE: "Abandonar Casa",
        REGISTER_FORGOTPASSWORD: "Perdi� contrase�a"

    });
    $translateProvider.preferredLanguage("en");
    $translateProvider.fallbackLanguage("en");

    $stateProvider

      // INTRO
      .state('intro', {
          url: "/",
          templateUrl: "templates/intro.html",
          controller: 'IntroController'
      })

      // LOGIN
      .state('login', {
          url: "/login",
          templateUrl: "templates/login.html",
          controller: 'LoginController',
          resolve: {
              "currentAuth": ["Auth",
                  function (Auth) {
                      return Auth.$waitForAuth();
                  }]
          }
      })
    
      // SIGN UP
      .state('register', {
          url: "/register",
          templateUrl: "templates/register.html",
          controller: 'RegisterController'
      })

      // FORGOT PASSWORD
      .state('forgot-password', {
          url: "/forgot-password",
          templateUrl: "templates/forgot-password.html",
          controller: 'ForgotPasswordCtrl'
      })

      // APP
      .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "templates/side-menu.html",
          controller: 'AppCtrl'
      })

      // DASHBOARD
      .state('app.dashboard', {
          url: "/dashboard",
          views: {
              'menuContent': {
                  templateUrl: "templates/dashboard.html",
                  controller: 'DashboardCtrl'
              }
          }
      })

      // ACCOUNTS
      .state('app.accounts', {
          url: "/accounts",
          views: {
              'menuContent': {
                  templateUrl: "templates/accounts.html",
                  controller: 'AccountsController'
              }
          }
      })
      .state('app.account', {
          url: "/accounts/:accountId",
          views: {
              'menuContent': {
                  templateUrl: "templates/account.html",
                  controller: 'AccountsController'
              }
          }
      })
      .state('app.accounttypes', {
          url: "/accounts",
          views: {
              'menuContent': {
                  templateUrl: "templates/accounttypes.html",
                  controller: 'AccountsController'
              }
          }
      })

      // RECURRING
      .state('app.recurringlist', {
          url: "/recurringlist",
          views: {
              'menuContent': {
                  templateUrl: "templates/recurringlist.html",
                  controller: 'RecurringListCtrl'
              }
          }
      })

      // CATEGORIES
      .state('app.categories', {
          url: "/categories",
          views: {
              'menuContent': {
                  templateUrl: "templates/categories.html"
              }
          }
      })

      // PAYEES
      .state('app.payees', {
          url: "/payees",
          views: {
              'menuContent': {
                  templateUrl: "templates/payees.html"
              }
          }
      })

      // BUDGETS
      .state('app.budgets', {
          url: "/budgets",
          views: {
              'menuContent': {
                  templateUrl: "templates/budgets.html"
              }
          }
      })

      // REPORTS
      .state('app.reports', {
          url: "/reports",
          views: {
              'menuContent': {
                  templateUrl: "templates/reports.html"
              }
          }
      })

      // SETTINGS
      .state('app.settings', {
          url: "/settings",
          views: {
              'menuContent': {
                  templateUrl: "templates/settings.html",
                  controller: 'SettingsController'
              }
          }
      })

      // ABOUT
      .state('app.about', {
          url: "/about",
          views: {
              'menuContent': {
                  templateUrl: "templates/about.html"
              }
          }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});
