'use strict';

var ngAdminJWTAuth = angular.module('ng-admin.jwt-auth', ['angular-jwt']);

ngAdminJWTAuth.config(['$stateProvider', '$httpProvider', function ($stateProvider, $httpProvider) {

	$stateProvider.state('login', {
		parent: '',
		url: '/login',
		controller: 'loginController', 
		controllerAs: 'loginController',
		templateProvider: ['ngAdminJWTAuthConfigurator', '$http', 'notification', function(configurator, $http, notification) {
			var template = configurator.getCustomLoginTemplate();
			
			if (!template) {
				return require('./loginTemplate');
			}
			
			return $http.get(template).then(function(response){
				return response.data;
			}, function(response){
				notification.log('Error in template loading', { addnCls: 'humane-flatty-error' });
			});
		}],
	});
	
	$stateProvider.state('logout', {
		parent: '',
		url: '/logout',
		controller: 'logoutController', 
		controllerAs: 'logoutController',	
	});	
	
}]);

ngAdminJWTAuth.run(['$q', 'Restangular', 'ngAdminJWTAuthService', '$http', '$location', '$state', '$rootScope', 'ngAdminJWTAuthConfigurator', function($q, Restangular, ngAdminJWTAuthService, $http, $location, $state, $rootScope ,ngAdminJWTAuthConfigurator){

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		if (!ngAdminJWTAuthService.isAuthenticated()) {
			var nonProtectedStates = ngAdminJWTAuthConfigurator.getNonProtectedStates();
			if (nonProtectedStates.indexOf(toState.name) == -1) {
				event.preventDefault();
				var changeState = $state.go('login');
				changeState.then(function(){
					$rootScope.$broadcast('$stateChangeSuccess', toState.self, toParams, fromState.self, fromParams);
				});
			}
			return true;
		}
		return true;
	});
	
	Restangular.addFullRequestInterceptor(function(response, deferred, responseHandler) {
		if (ngAdminJWTAuthService.isAuthenticated()) {
				var customAuthHeader = ngAdminJWTAuthConfigurator.getCustomAuthHeader();
				if (customAuthHeader) {
					$http.defaults.headers.common[customAuthHeader.name] = customAuthHeader.template.replace('{{token}}', localStorage.userToken);
				} else {
					$http.defaults.headers.common.Authorization = 'Basic ' + localStorage.userToken;
				}
		}
	});
	
}]);


ngAdminJWTAuth.controller('loginController', require('./loginController'));
ngAdminJWTAuth.controller('logoutController', require('./logoutController'));

ngAdminJWTAuth.provider('ngAdminJWTAuthConfigurator', require('./configuratorProvider'));

ngAdminJWTAuth.service('ngAdminJWTAuthService', require('./authService'));