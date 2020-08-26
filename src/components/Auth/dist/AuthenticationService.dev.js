"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.USER_NAME_SESSION_ATTRIBUTE_NAME = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _Constants = require("../../Constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
exports.USER_NAME_SESSION_ATTRIBUTE_NAME = USER_NAME_SESSION_ATTRIBUTE_NAME;

var AuthenticationService =
/*#__PURE__*/
function () {
  function AuthenticationService() {
    _classCallCheck(this, AuthenticationService);
  }

  _createClass(AuthenticationService, [{
    key: "executeJwtAuthenticationService",
    value: function executeJwtAuthenticationService(username, password) {
      return _axios["default"].post("".concat(_Constants.API_URL, "/authenticate"), {
        username: username,
        password: password
      });
    }
  }, {
    key: "registerSuccessfulJwtLogin",
    value: function registerSuccessfulJwtLogin(username, token) {
      sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
      this.setupAxiosInterceptors(this.createJwtToken(token));
    }
  }, {
    key: "createJwtToken",
    value: function createJwtToken(token) {
      return 'Bearer ' + token;
    }
  }, {
    key: "executeBasicAuthenticationService",
    value: function executeBasicAuthenticationService(username, password) {
      return _axios["default"].get("".concat(_Constants.API_URL, "/basicauth"), {
        headers: {
          authorization: this.createBasicAuthToken(username, password)
        }
      });
    }
  }, {
    key: "registerSuccessfulLogin",
    value: function registerSuccessfulLogin(username, password) {
      sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
      this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }
  }, {
    key: "createBasicAuthToken",
    value: function createBasicAuthToken(username, password) {
      return 'Basic ' + window.btoa(username + ":" + password);
    }
  }, {
    key: "logout",
    value: function logout() {
      sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }
  }, {
    key: "isUserLoggedIn",
    value: function isUserLoggedIn() {
      var user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

      if (user === null) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "getLoggedInUserName",
    value: function getLoggedInUserName() {
      var user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

      if (user === null) {
        return '';
      }

      return user;
    }
  }, {
    key: "setupAxiosInterceptors",
    value: function setupAxiosInterceptors(token) {
      var _this = this;

      _axios["default"].interceptors.request.use(function (config) {
        if (_this.isUserLoggedIn()) {
          config.headers.authorization = token;
        }

        return config;
      });
    }
  }]);

  return AuthenticationService;
}();

var _default = new AuthenticationService();

exports["default"] = _default;