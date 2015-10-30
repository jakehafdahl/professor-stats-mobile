'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _historyLibCreateHashHistory = require('history/lib/createHashHistory');

var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);

var _reactBootstrap = require('react-bootstrap');

// var playerList = [
//     {
//         name: "Adrian Peterson",
//         position: "RB",
//         id: "ADRP",
//         rushattempts: 234,
//         rushyards: 1234,
//         rushtd: 10,
//         receptions: 24,
//         receptionyards: 234,
//         receptiontds: 12
//     },
//     {
//         name: "Marshawn Lynch",
//         position: "RB",
//         id: "MRSH",
//         rushattempts: 234,
//         rushyards: 1234,
//         rushtd: 10,
//         receptions: 24,
//         receptionyards: 234,
//         receptiontds: 12
//     },
//     {
//         name: "Jamaal Charles",
//         position: "RB",
//         id: "JMCH",
//         rushattempts: 234,
//         rushyards: 1234,
//         rushtd: 10,
//         receptions: 24,
//         receptiontds: 12
//     },
//     {
//         name: "Aaron Rodgers",
//         position: "QB",
//         id: "AARN",
//         rushattempts: 234,
//         rushyards: 1234,
//         rushtd: 10,
//         passattempts: 224,
//         passyards: 5234,
//         passtd: 43,
//         passinterceptions: 12
//     },
//     {
//         name: "Andrew Luck",
//         position: "QB",
//         id: "ALUC",
//         rushattempts: 234,
//         rushyards: 1234,
//         rushtd: 10,
//         passattempts: 224,
//         passyards: 5234,
//         passtd: 43,
//         passinterceptions: 12
//     },
//     {
//         name: "Calvin Johnson",
//         position: "WR",
//         id: "CALJ",
//         rushattempts: 3,
//         rushyards: 34,
//         rushtd: 10,
//         receptions: 124,
//         receptionyards: 1234,
//         receptiontds: 12
//     },
//     {
//         name: "Antonio Brown",
//         position: "WR",
//         id: "ANTO",
//         rushattempts: 3,
//         rushyards: 34,
//         rushtd: 10,
//         receptions: 124,
//         receptionyards: 1234,
//         receptiontds: 12
//     },
//     {
//         name: "John Brown",
//         position: "WR",
//         id: "JBROW",
//         rushattempts: 4,
//         rushyards: 14,
//         rushtd: 10,
//         receptions: 124,
//         receptionyards: 1234,
//         receptiontds: 12
//     },
//     {
//         name: "Jim Brown",
//         position: "RB",
//         id: "BROW",
//         rushattempts: 234,
//         rushyards: 1234,
//         rushtd: 10,
//         receptions: 24,
//         receptionyards: 234,
//         receptiontds: 12
//     },
//     {
//         name: "Phil Mickelson",
//         position: "WR",
//         id: "DFSA",
//         rushattempts: 4,
//         rushyards: 14,
//         rushtd: 10,
//         receptions: 124,
//         receptionyards: 1234,
//         receptiontds: 12
//     }];

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var $ = require('jquery');
var playerRepository = require('./playerRepository');
var Player = React.createClass({
    displayName: 'Player',

    render: function render() {
        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                null,
                React.createElement(
                    Link,
                    { to: '/player/' + this.props.player.id },
                    this.props.player.name,
                    React.createElement('span', { className: 'glyphicon glyphicon-chevron-right pull-right' })
                )
            )
        );
    }
});

var PlayerPage = React.createClass({
    displayName: 'PlayerPage',

    getInitialState: function getInitialState() {
        return { player: playerRepository.getPlayerById(this.props.params.id) };
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(NavBar, null),
            React.createElement(
                'div',
                { className: 'container-fluid' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'h1',
                        null,
                        this.state.player.name
                    ),
                    React.createElement(
                        'h3',
                        null,
                        this.state.player.position
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row form-group' },
                    React.createElement(
                        'label',
                        null,
                        'Rush Attempts'
                    ),
                    React.createElement('input', { type: 'text', className: 'form-control', value: this.state.player.rushattempts }),
                    React.createElement(
                        'label',
                        null,
                        'Rush Yards'
                    ),
                    React.createElement('input', { type: 'text', className: 'form-control', value: this.state.player.rushyards }),
                    React.createElement(
                        'label',
                        null,
                        'Rush Touchdowns'
                    ),
                    React.createElement('input', { type: 'text', className: 'form-control', value: this.state.player.rushtd }),
                    React.createElement(
                        'label',
                        null,
                        'Receptions'
                    ),
                    React.createElement('input', { type: 'text', className: 'form-control', value: this.state.player.receptions }),
                    React.createElement(
                        'label',
                        null,
                        'Receiving Yards'
                    ),
                    React.createElement('input', { type: 'text', className: 'form-control', value: this.state.player.receptionyards }),
                    React.createElement(
                        'label',
                        null,
                        'Receiving Touchdowns'
                    ),
                    React.createElement('input', { type: 'text', className: 'form-control', value: this.state.player.receptiontds })
                )
            ),
            React.createElement(
                _reactBootstrap.Navbar,
                { fixedBottm: true, inverse: true, toggleNavKey: 0 },
                React.createElement(
                    _reactBootstrap.NavBrand,
                    null,
                    React.createElement(_reactBootstrap.Glyphicon, { glyph: 'chevron-left', onClick: this.goBack })
                ),
                React.createElement(
                    _reactBootstrap.CollapsibleNav,
                    { eventKey: 0 },
                    ' ',
                    React.createElement(
                        _reactBootstrap.Nav,
                        { navbar: true, right: true },
                        React.createElement(
                            _reactBootstrap.NavItem,
                            { eventKey: 1, href: '#' },
                            'Link Right'
                        ),
                        React.createElement(
                            _reactBootstrap.NavItem,
                            { eventKey: 2, href: '#' },
                            'Link Right'
                        )
                    )
                )
            )
        );
    }
});

var PlayerList = React.createClass({
    displayName: 'PlayerList',

    filterPositionUpdated: function filterPositionUpdated(e) {
        this.props.filterPositionUpdated(this.refs.filterPosition.value);
    },
    searchTextUpdated: function searchTextUpdated(e) {
        this.props.updateFilterFromSearch(this.refs.filterSearch.value);
    },
    render: function render() {
        var players = this.props.players.map(function (player) {
            return React.createElement(Player, { key: player.id, player: player });
        });
        return React.createElement(
            'div',
            { className: 'container-fluid' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Search by name', ref: 'filterSearch', onChange: this.searchTextUpdated })
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    React.createElement(
                        'select',
                        { className: 'form-control', ref: 'filterPosition', onChange: this.filterPositionUpdated },
                        React.createElement(
                            'option',
                            { value: '' },
                            'All'
                        ),
                        React.createElement(
                            'option',
                            { value: 'QB' },
                            'Quarterback'
                        ),
                        React.createElement(
                            'option',
                            { value: 'RB' },
                            'Runningback'
                        ),
                        React.createElement(
                            'option',
                            { value: 'WR' },
                            'Wide Reciever'
                        ),
                        React.createElement(
                            'option',
                            { value: 'TE' },
                            'Tight End'
                        ),
                        React.createElement(
                            'option',
                            { value: 'K' },
                            'Kicker'
                        ),
                        React.createElement(
                            'option',
                            { value: 'DST' },
                            'Defense/Special Teams'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    React.createElement(
                        'table',
                        { className: 'table table-striped table-condensed' },
                        React.createElement(
                            'tbody',
                            null,
                            players
                        )
                    )
                )
            )
        );
    }
});

var NavBar = React.createClass({
    displayName: 'NavBar',

    goBack: function goBack(e) {
        history.back();
    },
    render: function render() {
        return React.createElement(
            _reactBootstrap.Navbar,
            { fixedTop: true, inverse: true, toggleNavKey: 0 },
            React.createElement(
                _reactBootstrap.NavBrand,
                null,
                React.createElement(_reactBootstrap.Glyphicon, { glyph: 'chevron-left', onClick: this.goBack })
            ),
            React.createElement(
                _reactBootstrap.CollapsibleNav,
                { eventKey: 0 },
                React.createElement(
                    _reactBootstrap.Nav,
                    { navbar: true, right: true },
                    React.createElement(
                        _reactBootstrap.NavItem,
                        { eventKey: 1, href: '#' },
                        'Link Right'
                    ),
                    React.createElement(
                        _reactBootstrap.NavItem,
                        { eventKey: 2, href: '#' },
                        'Link Right'
                    )
                )
            )
        );
    }
});

var Main = React.createClass({
    displayName: 'Main',

    componentDidMount: function componentDidMount() {
        var component = this;
        playerRepository.getPlayers().then(function (players) {
            if (component.isMounted()) {
                component.setState({
                    originalPlayerList: players,
                    players: players
                });
            }
        });
    },
    getInitialState: function getInitialState() {

        return {
            originalPlayerList: [],
            players: []
        };
    },
    updateFilterFromSearch: function updateFilterFromSearch(value) {
        var players = value == "" ? this.state.originalPlayerList : this.state.originalPlayerList.filter(function (player) {
            return player.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        });
        this.setState({
            originalPlayerList: this.state.originalPlayerList,
            players: players
        });
    },
    filterPositionUpdated: function filterPositionUpdated(value) {
        var players = value == "" ? this.state.originalPlayerList : this.state.originalPlayerList.filter(function (player) {
            return player.position.indexOf(value) >= 0;
        });
        this.setState({
            originalPlayerList: this.state.originalPlayerList,
            players: players
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(NavBar, null),
            React.createElement(PlayerList, { players: this.state.players, updateFilterFromSearch: this.updateFilterFromSearch, filterPositionUpdated: this.filterPositionUpdated })
        );
    }
});

var SplashScreen = React.createClass({
    displayName: 'SplashScreen',

    mixins: [Router.Navigation],
    getInitialState: function getInitialState() {
        return { title: "<professor-Stats />" };
    },
    componentDidMount: function componentDidMount() {
        var component = this;
        setTimeout(function () {
            component.props.history.pushState(null, '/Main');
        }, 2000);
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'container-fluid' },
            this.state.title
        );
    }
});

var app = {
    // Application Constructor
    initialize: function initialize() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function onDeviceReady() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function receivedEvent(id) {

        console.log('Received Event: ' + id);
    }
};

app.initialize();

ReactDOM.render(React.createElement(
    Router,
    { history: (0, _historyLibCreateHashHistory2['default'])() },
    React.createElement(Route, { path: '/', component: SplashScreen }),
    React.createElement(Route, { path: '/Main', component: Main }),
    React.createElement(Route, { path: '/player/:id', component: PlayerPage })
), document.getElementById('root'));
/* This is the eventKey referenced */