var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();

var Ivory = function (_React$Component) {
	_inherits(Ivory, _React$Component);

	function Ivory(props) {
		_classCallCheck(this, Ivory);

		var _this = _possibleConstructorReturn(this, (Ivory.__proto__ || Object.getPrototypeOf(Ivory)).call(this, props));

		_this.myRef = React.createRef();

		_this.handleStroke = _this.handleStroke.bind(_this);
		return _this;
	}

	_createClass(Ivory, [{
		key: "handleStroke",
		value: function handleStroke(e) {
			synth.triggerAttackRelease(this.props.key_label, '8n');
			// const node = this.myRef.current;
			var bub = document.createElement("div");
			bub.classList.add("bubble");
			bub.classList.add("x1");
			this.myRef.current.appendChild(bub);
		}
	}, {
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				{ ref: this.myRef, className: "key-set-relative" },
				React.createElement(
					"div",
					{ id: this.props.key_label,
						onClick: this.handleStroke, className: "ivory-key" },
					React.createElement(
						"div",
						{ className: "key-label" },
						this.props.key_label
					)
				),
				this.props.ebony_key && React.createElement(Ebony, { key_label: this.props.ebony_key })
			);
		}
	}]);

	return Ivory;
}(React.Component);

var Ebony = function (_React$Component2) {
	_inherits(Ebony, _React$Component2);

	function Ebony(props) {
		_classCallCheck(this, Ebony);

		var _this2 = _possibleConstructorReturn(this, (Ebony.__proto__ || Object.getPrototypeOf(Ebony)).call(this, props));

		_this2.handleStroke = _this2.handleStroke.bind(_this2);
		return _this2;
	}

	_createClass(Ebony, [{
		key: "handleStroke",
		value: function handleStroke(e) {
			e.stopPropagation();
			synth.triggerAttackRelease(this.props.key_label, '8n');
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: this.props.key_label, onClick: this.handleStroke, className: "ebony-key" },
				React.createElement(
					"div",
					{ className: "key-label" },
					this.props.key_label
				)
			);
		}
	}]);

	return Ebony;
}(React.Component);

export { Ivory, Ebony };