var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Ivory, Ebony } from './keys.js';

var Board = function (_React$Component) {
	_inherits(Board, _React$Component);

	function Board(props) {
		_classCallCheck(this, Board);

		var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

		_this.keys = ['iC', 'eC#', 'iD', 'eD#', 'iE', 'iF', 'eF#', 'iG', 'eG#', 'iA', 'eB#', 'iB'];
		return _this;
	}

	_createClass(Board, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var full_keyboard = [];
			var octave_sets = [3, 4, 5];

			octave_sets.map(function (set_num) {

				var key_list = _this2.keys.map(function (key, index) {

					if (key[0] == 'i') {

						if (index + 1 < _this2.keys.length && _this2.keys[index + 1][0] == 'e') {
							return React.createElement(Ivory, { ebony_key: key.slice(1) + "#" + String(set_num),
								key_label: key.slice(1) + String(set_num) });
						} else {
							return React.createElement(Ivory, {
								key_label: key.slice(1) + String(set_num) });
						}
					}
				});

				full_keyboard = [].concat(_toConsumableArray(full_keyboard), _toConsumableArray(key_list));
			});

			return React.createElement(
				'div',
				{ className: 'keyboard' },
				full_keyboard
			);
		}
	}]);

	return Board;
}(React.Component);

export { Board };