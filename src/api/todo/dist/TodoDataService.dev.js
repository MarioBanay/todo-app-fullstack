"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _Constants = require("../../Constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TodoDataService =
/*#__PURE__*/
function () {
  function TodoDataService() {
    _classCallCheck(this, TodoDataService);
  }

  _createClass(TodoDataService, [{
    key: "retrieveAllTodos",
    value: function retrieveAllTodos(name) {
      //console.log('executed service');
      return _axios["default"].get("".concat(_Constants.JPA_API_URL, "/users/").concat(name, "/todos"));
    }
  }, {
    key: "retrieveTodo",
    value: function retrieveTodo(name, id) {
      //console.log('executed service');
      return _axios["default"].get("".concat(_Constants.JPA_API_URL, "/users/").concat(name, "/todos/").concat(id));
    }
  }, {
    key: "deleteTodo",
    value: function deleteTodo(name, id) {
      return _axios["default"]["delete"]("".concat(_Constants.JPA_API_URL, "/users/").concat(name, "/todos/").concat(id));
    }
  }, {
    key: "updateTodo",
    value: function updateTodo(name, id, todo) {
      return _axios["default"].put("".concat(_Constants.JPA_API_URL, "/users/").concat(name, "/todos/").concat(id), todo);
    }
  }, {
    key: "createTodo",
    value: function createTodo(name, todo) {
      return _axios["default"].post("".concat(_Constants.JPA_API_URL, "/users/").concat(name, "/todos"), todo);
    }
  }]);

  return TodoDataService;
}();

var _default = new TodoDataService();

exports["default"] = _default;