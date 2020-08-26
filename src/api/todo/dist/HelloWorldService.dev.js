"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HelloWorldService =
/*#__PURE__*/
function () {
  function HelloWorldService() {
    _classCallCheck(this, HelloWorldService);
  }

  _createClass(HelloWorldService, [{
    key: "executeHelloWorldService",
    value: function executeHelloWorldService() {
      //console.log('executed service');
      return _axios["default"].get('http://localhost:8080/hello-world');
    }
  }, {
    key: "executeHelloWorldBeanService",
    value: function executeHelloWorldBeanService() {
      //console.log('executed service');
      return _axios["default"].get('http://localhost:8080/hello-world-bean');
    }
  }, {
    key: "executeHelloWorldPathVariableService",
    value: function executeHelloWorldPathVariableService(name) {
      //console.log('executed service');
      // let username = 'mario';
      // let password = 'password';
      // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
      return _axios["default"].get("http://localhost:8080/hello-world/path-variable/".concat(name)
      /* , {
      headers: {
      authorization: basicAuthHeader
      }
      } */
      );
    }
  }]);

  return HelloWorldService;
}();

var _default = new HelloWorldService();

exports["default"] = _default;