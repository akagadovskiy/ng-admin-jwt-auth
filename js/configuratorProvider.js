var ngAdminJWTAuthConfiguratorProvider = function() {
	var authConfigs = {
		_nonProtectedStates: ['login']
	};


	this.setJWTAuthURL = function(url){
		authConfigs._authUrl = url;
	};
	
	this.setCustomLoginTemplate = function(url) {
		authConfigs._customLoginTemplate = url;
	}
	
	this.setLoginSuccessCallback = function(callback) {
		authConfigs._loginSuccessCallback = callback;
	}		

	this.setLoginErrorCallback = function(callback) {
		authConfigs._loginErrorCallback = callback;
	}
	
	this.setCustomAuthHeader = function(obj) {
		return authConfigs._customAuthHeader = obj;
	}

	this.setNonProtectedStates = function(states) {
		authConfigs._nonProtectedStates = authConfigs._nonProtectedStates.contat(states);
	}
	
	this.$get = function() {
		return {
			getAuthURL: function(){
				return authConfigs._authUrl;
			},
			getCustomLoginTemplate: function() {
				return authConfigs._customLoginTemplate;
			},
			getLoginSuccessCallback: function() {
				return authConfigs._loginSuccessCallback;
			},
			getLoginErrorCallback: function() {
				return authConfigs._loginErrorCallback;
			},
			getCustomAuthHeader: function() {
				return authConfigs._customAuthHeader;
			},
			getNonProtectedStates: function() {
				return authConfigs._nonProtectedStates;
			}
		};
	}
	
};

module.exports = ngAdminJWTAuthConfiguratorProvider;