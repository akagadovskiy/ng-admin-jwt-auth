var loginController = function($scope, $rootScope, ngAdminJWTAuthService, ngAdminJWTAuthConfigurator, notification, $location) {
	this.$scope = $scope;
	this.$rootScope = $rootScope;
	this.ngAdminJWTAuthService = ngAdminJWTAuthService;
	this.ngAdminJWTAuthConfigurator = ngAdminJWTAuthConfigurator;
	this.notification = notification;
	this.$location = $location;
};

loginController.prototype.login = function() {
	var that = this;
	
	var success = this.ngAdminJWTAuthConfigurator.getLoginSuccessCallback() || function(response) {
		that.notification.log(response.data.message, { addnCls: 'humane-flatty-success' });
		that.$location.path('/dashboard');
	};		
	var error = this.ngAdminJWTAuthConfigurator.getLoginErrorCallback() || function(response) {
		that.notification.log(response.data.message, { addnCls: 'humane-flatty-error' });
	};
	
	
	
	this.ngAdminJWTAuthService.authenticate(this.data, success, error);
	 
};

loginController.$inject = ['$rootScope', '$scope', 'ngAdminJWTAuthService', 'ngAdminJWTAuthConfigurator', 'notification', '$location'];

module.exports = loginController;