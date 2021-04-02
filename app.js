var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            theme: 'light-theme',
            themeChecked: false,
            weatherData: '',
            tempToday: '',
            tempTomorrow: '',
            tempDayAfter: ''
        };
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.3913&lon=5.3221').then(function (res) {
                return res.json();
            }).then(function (json) {
                return _this2.setState({
                    tempToday: [getTemp('min', 0, json.properties.timeseries), getTemp('max', 0, json.properties.timeseries)],
                    tempTomorrow: [getTemp('min', 1, json.properties.timeseries), getTemp('max', 1, json.properties.timeseries)],
                    tempDayAfter: [getTemp('min', 2, json.properties.timeseries), getTemp('max', 2, json.properties.timeseries)],
                    weatherData: json.properties.timeseries
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                { id: this.state.theme },
                React.createElement(
                    'div',
                    { id: 'theme-switch', className: 'switch', onClick: function onClick() {
                            _this3.state.theme === 'light-theme' ? _this3.setState({ theme: 'dark-theme', themeChecked: true }) : _this3.setState({ theme: 'light-theme', themeChecked: false });
                        } },
                    React.createElement('input', { type: 'checkbox', id: 'slider', checked: this.state.themeChecked, readOnly: true }),
                    React.createElement('span', { className: 'slider round' })
                ),
                React.createElement(NavBar, null),
                React.createElement(
                    'table',
                    { id: 'weather-table', className: 'table' },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                React.createElement('i', { className: 'fas fa-calendar-day' })
                            ),
                            React.createElement(
                                'th',
                                null,
                                React.createElement('i', { className: 'fas fa-thermometer-half' })
                            ),
                            React.createElement(
                                'th',
                                null,
                                React.createElement('i', { className: 'fas fa-wind' })
                            ),
                            React.createElement(
                                'th',
                                null,
                                React.createElement('i', { className: 'fas fa-umbrella' })
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Today'
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.tempToday[0],
                                ' \u2103 til ',
                                this.state.tempToday[1],
                                ' \u2103'
                            ),
                            React.createElement('td', null),
                            React.createElement('td', null)
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Tomorrow'
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.tempTomorrow[0],
                                ' \u2103 til ',
                                this.state.tempTomorrow[1],
                                ' \u2103'
                            ),
                            React.createElement('td', null),
                            React.createElement('td', null)
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                'Day After'
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.tempDayAfter[0],
                                ' \u2103 til ',
                                this.state.tempDayAfter[1],
                                ' \u2103'
                            ),
                            React.createElement('td', null),
                            React.createElement('td', null)
                        )
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

function NavBar() {
    return React.createElement(
        'ul',
        { className: 'nav justify-content-center' },
        React.createElement(
            'li',
            { className: 'nav-item' },
            React.createElement(
                'h2',
                null,
                'Bergenseren'
            )
        ),
        React.createElement(
            'li',
            { className: 'nav-item' },
            React.createElement(
                'a',
                { className: 'nav-link active', href: '#' },
                'V\xE6rvarsel'
            )
        )
    );
}

var getTemp = function getTemp(val, dayIdx, dataArr) {
    return val === 'min' ? Math.min.apply(Math, dataArr.map(function (data) {
        var currentDate = new Date(data.time).getDate();
        var queriedDate = new Date(dataArr[0].time);
        if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
            return data.data.instant.details.air_temperature;
        }
    }).filter(Number)) : Math.max.apply(Math, dataArr.map(function (data) {
        var currentDate = new Date(data.time).getDate();
        var queriedDate = new Date(dataArr[0].time);
        if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
            return data.data.instant.details.air_temperature;
        }
    }).filter(Number));
};

var element = React.createElement(App, { city: 'Bergen' });

var domContainer = document.getElementById('container');
ReactDOM.render(element, domContainer);