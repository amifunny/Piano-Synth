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
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'dashboard' },
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
			is_recording: false,
			sending: false
		};
		_this2.startRecording = _this2.startRecording.bind(_this2);
		_this2.stopRecording = _this2.stopRecording.bind(_this2);
		_this2.generate = _this2.generate.bind(_this2);
		_this2.sendRecording = _this2.sendRecording.bind(_this2);
		return _this2;
	}

	_createClass(UtilButtons, [{
		key: 'startRecording',
		value: function startRecording() {
			if (!this.state.sending) {
				this.setState({
					is_recording: true
				});
			}
			is_recording = true;
		}
	}, {
		key: 'stopRecording',
		value: function stopRecording() {
			this.setState({
				is_recording: false
			});
			is_recording = true;
		}
	}, {
		key: 'generate',
		value: function generate() {
			this.setState({
				sending: true
			});
			this.sendRecording();
		}
	}, {
		key: 'sendRecording',
		value: function sendRecording() {
			var _this3 = this;

			console.log(record_obj);

			fetch('http://127.0.0.1:5000/generate', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					recording: record_obj
				})
			}).then(function (resp) {

				_this3.setState({
					sending: false
				});
			}, function (error) {

				_this3.setState({
					sending: false
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'cd-h-div buttons-util flex-center' },
				this.state.is_recording ? React.createElement(
					'button',
					{ onClick: this.stopRecording,
						className: 'cd-btn-darken dash-btn' },
					React.createElement(
						'div',
						{ className: 'btn-inner-div' },
						React.createElement(
							'span',
							{ className: 'material-icons' },
							'stop'
						),
						React.createElement(
							'span',
							null,
							'Stop'
						)
					)
				) : React.createElement(
					'button',
					{ onClick: this.startRecording,
						className: 'cd-btn-darken dash-btn' },
					React.createElement(
						'div',
						{ className: 'btn-inner-div' },
						React.createElement(
							'span',
							{ className: 'material-icons' },
							'album'
						),
						React.createElement(
							'span',
							{ className: 'btn-label' },
							'Record'
						)
					)
				),
				React.createElement(
					'button',
					{ onClick: this.generate,
						className: 'cd-btn-darken dash-btn' },
					React.createElement(
						'div',
						{ className: 'btn-inner-div' },
						React.createElement(
							'span',
							{ className: 'material-icons' },
							'audiotrack'
						),
						React.createElement(
							'span',
							null,
							'Generate'
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'flex-center time-steps-div' },
					React.createElement(
						'div',
						{ className: 'time-steps-label flex-center' },
						React.createElement(
							'span',
							{ className: 'material-icons' },
							'graphic_eq'
						),
						React.createElement(
							'span',
							null,
							'Time Steps'
						)
					),
					React.createElement(
						'div',
						null,
						React.createElement('input', { value: '140', className: 'time-steps-input',
							type: 'number' })
					)
				)
			);
		}
	}]);

	return UtilButtons;
}(React.Component);

export { Dashboard };