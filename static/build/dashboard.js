var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dashboard = function (_React$Component) {
	_inherits(Dashboard, _React$Component);

	function Dashboard(props) {
		_classCallCheck(this, Dashboard);

		return _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));
	}

	_createClass(Dashboard, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "dashboard" },
				React.createElement(UtilButtons, null)
			);
		}
	}]);

	return Dashboard;
}(React.Component);

var UtilButtons = function (_React$Component2) {
	_inherits(UtilButtons, _React$Component2);

	function UtilButtons(props) {
		_classCallCheck(this, UtilButtons);

		var _this2 = _possibleConstructorReturn(this, (UtilButtons.__proto__ || Object.getPrototypeOf(UtilButtons)).call(this, props));

		_this2.state = {
			is_recording: false
		};
		return _this2;
	}

	_createClass(UtilButtons, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "cd-h-div buttons-util" },
				React.createElement(
					"button",
					{ className: "cd-btn-darken " },
					"Record"
				),
				React.createElement(
					"button",
					{ className: "cd-btn-darken" },
					"Generate"
				)
			);
		}
	}]);

	return UtilButtons;
}(React.Component);

export { Dashboard };