var ngAdminJWTAuthService = function($http, jwtHelper, ngAdminJWTAuthConfigurator) { 
	
	return {
		authenticate: function(data, successCallback, errorCallback) {
			var url = ngAdminJWTAuthConfigurator.getAuthURL();

			return $http({
				url: url,
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				data: data
			}).then(function(response) {
				var payload = jwtHelper.decodeToken(response.data.token);
				
				localStorage.userToken = response.data.token;
				localStorage.userRole = payload.role;
				
				successCallback(response); 
				
				var customAuthHeader = ngAdminJWTAuthConfigurator.getCustomAuthHeader();
				if (customAuthHeader) {
					$http.defaults.headers.common[customAuthHeader.name] = customAuthHeader.template.replace('{{token}}', response.data.token);
				} else {
					$http.defaults.headers.common.Authorization = 'Basic ' + response.data.token;
				}
			} , errorCallback);
		},
		
		isAuthenticated: function() {
			var token = localStorage.userToken;
			if (!token) {
				return false;
			}
			return jwtHelper.isTokenExpired(token) ? false : true;
		},
		
		logout: function() {
			localStorage.removeItem('userRole');
			localStorage.removeItem('userToken');
			return true;
		}
	}
	
};

ngAdminJWTAuthService.$inject = ['$http', 'jwtHelper', 'ngAdminJWTAuthConfigurator'];

module.exports = ngAdminJWTAuthService;