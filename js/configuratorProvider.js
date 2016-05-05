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
		states.push('login');
		authConfigs._nonProtectedStates = states;
	}
	
  this.setCheckEveryResponseForAuthHeader = function() {
    authConfigs._checkEveryResponseForAuthHeader = true;
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
			},
      getCheckEveryResponseForAuthHeader: function() {
				return !!authConfigs._checkEveryResponseForAuthHeader;
			},
		};
	}

};

module.exports = ngAdminJWTAuthConfiguratorProvider;
