var logoutController = function($scope, ngAdminJWTAuthService, $location) {
	ngAdminJWTAuthService.logout();
	$location.path('/login');
};

logoutController.$inject = ['$scope', 'ngAdminJWTAuthService', '$location'];

module.exports = logoutController;