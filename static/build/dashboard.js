var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function auto_play(key_given) {
	var i = 0;
	var keyPlayer = setInterval(keyStroke, 500);

	var prev_key = [];
	function keyStroke() {

		i = i + 1;
		if (key_given.length > i) {

			// Remove all previous active
			if (prev_key.length != 0) {
				for (var j = 0; j < prev_key.length; j++) {
					prev_key[j].classList.remove('piano-key-active');
				}
			}

			prev_key = [];
			console.log(key_given[i]);

			// Play all keys in chord or notes
			for (var j = 0; j < key_given[i].length; j++) {

				var key_div = document.getElementById(String(key_given[i][j]));
				key_div.classList.add('piano-key-active');
				key_div.click();
				prev_key.push(key_div);
			}
		} else {

			// At end remove all previous pressed keys
			for (var j = 0; j < prev_key.length; j++) {
				prev_key[j].classList.remove('piano-key-active');
			}
			clearInterval(keyPlayer);
		}
	}
};

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
				React.createElement(UtilButtons, null),
				React.createElement(
					'div',
					{ className: 'maker-tag' },
					'Made with \u2665 By ',
					React.createElement(
						'a',
						{ target: '_blank', href: 'https://github.com/amifunny/'
						},
						'Amifunny'
					)
				)
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
		_this2.startRecording = _this2.startRecording.bind(_this2);
		_this2.stopRecording = _this2.stopRecording.bind(_this2);
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
			record_obj = [];
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
							{ className: 'btn-label' },
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
				React.createElement(GenerateButton, { is_recording: this.state.is_recording })
			);
		}
	}]);

	return UtilButtons;
}(React.Component);

var GenerateButton = function (_React$Component3) {
	_inherits(GenerateButton, _React$Component3);

	function GenerateButton(props) {
		_classCallCheck(this, GenerateButton);

		var _this3 = _possibleConstructorReturn(this, (GenerateButton.__proto__ || Object.getPrototypeOf(GenerateButton)).call(this, props));

		_this3.state = {
			sending: false,
			gen_state: 0,
			time_steps: 30
		};
		_this3.download_address = "";
		_this3.generate = _this3.generate.bind(_this3);
		_this3.sendRecording = _this3.sendRecording.bind(_this3);
		_this3.setTimeSteps = _this3.setTimeSteps.bind(_this3);
		return _this3;
	}

	_createClass(GenerateButton, [{
		key: 'generate',
		value: function generate() {

			if (!this.props.is_recording && record_obj.length != 0) {
				this.setState({
					sending: true
				});
				this.sendRecording();
			}
		}
	}, {
		key: 'sendRecording',
		value: function sendRecording() {
			var _this4 = this;

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
					recording: record_obj,
					time_steps: this.state.time_steps
				})
			}).then(function (result) {
				return result.json();
			}).then(function (resp) {

				console.log(resp['pred_notes']);
				auto_play(resp['pred_notes']);
				_this4.download_address = resp['filename'];

				_this4.setState({
					sending: false,
					gen_state: 1
				});
			}, function (error) {

				_this4.setState({
					sending: false,
					gen_state: -1
				});
			});
		}
	}, {
		key: 'setTimeSteps',
		value: function setTimeSteps(e) {
			var min_val = 30;
			var max_val = 500;

			this.setState({
				time_steps: Math.max(Math.min(e.target.value, max_val), min_val)
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'flex-center' },
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
							{ className: 'btn-label' },
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
							{ className: 'btn-label' },
							'Time Steps'
						)
					),
					React.createElement(
						'div',
						null,
						React.createElement('input', { value: this.state.time_steps,
							onChange: this.setTimeSteps, min: '32', max: '500',
							className: 'time-steps-input',
							type: 'number' })
					)
				),
				React.createElement(GenStateComponent, { sending: this.state.sending,
					gen_state: this.state.gen_state,
					download_address: this.download_address })
			);
		}
	}]);

	return GenerateButton;
}(React.Component);

var GenStateComponent = function (_React$Component4) {
	_inherits(GenStateComponent, _React$Component4);

	function GenStateComponent(props) {
		_classCallCheck(this, GenStateComponent);

		return _possibleConstructorReturn(this, (GenStateComponent.__proto__ || Object.getPrototypeOf(GenStateComponent)).call(this, props));
	}

	_createClass(GenStateComponent, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				this.props.sending && React.createElement(
					'div',
					{ className: 'spinner' },
					React.createElement('div', null),
					React.createElement('div', null),
					React.createElement('div', null)
				),
				this.props.gen_state == -1 ? React.createElement(
					'div',
					{ className: 'flex-center time-steps-div' },
					React.createElement(
						'div',
						{ className: 'time-steps-label flex-center' },
						React.createElement(
							'span',
							{ className: 'material-icons' },
							'error_outline'
						),
						React.createElement(
							'span',
							{ className: 'btn-label' },
							'Something went Wrong'
						)
					)
				) : this.props.gen_state == 1 && React.createElement(
					'a',
					{ href: '/download/' + this.props.download_address },
					React.createElement(
						'button',
						{
							className: 'cd-btn-darken dash-btn' },
						React.createElement(
							'div',
							{ className: 'btn-inner-div' },
							React.createElement(
								'span',
								{ className: 'material-icons' },
								'get_app'
							),
							React.createElement(
								'span',
								{ className: 'btn-label' },
								'Download MIDI'
							)
						)
					)
				)
			);
		}
	}]);

	return GenStateComponent;
}(React.Component);

export { Dashboard };