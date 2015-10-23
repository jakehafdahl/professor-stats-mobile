'use strict';

var _reactBootstrap = require('react-bootstrap');

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var BrowserHistory = require('react-router').BrowserHistory;

var playerList = [{
    name: "Adrian Peterson",
    position: "RB",
    id: "ADRP"
}, {
    name: "Marshawn Lynch",
    position: "RB",
    id: "MRSH"
}, {
    name: "Jamaal Charles",
    position: "RB",
    id: "JMCH"
}, {
    name: "Aaron Rodgers",
    position: "QB",
    id: "AARN"
}, {
    name: "Andrew Luck",
    position: "QB",
    id: "ALUC"
}, {
    name: "Calvin Johnson",
    position: "WR",
    id: "CALJ"
}, {
    name: "Antonio Brown",
    position: "WR",
    id: "ANTO"
}];

function getPlayerById(id) {
    return playerList.filter(function (player) {
        return player.id === id;
    })[0];
};

var Player = React.createClass({
    displayName: 'Player',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'panel panel-default' },
            React.createElement(
                'div',
                { className: 'panel-heading', role: 'tab', id: 'headingOne' },
                React.createElement(
                    'h4',
                    { className: 'panel-title' },
                    React.createElement(
                        Link,
                        { to: '/player/' + this.props.player.id },
                        this.props.player.name
                    )
                )
            )
        );
    }
});

var PlayerPage = React.createClass({
    displayName: 'PlayerPage',

    getInitialState: function getInitialState() {
        return { player: getPlayerById(this.props.params.id) };
    },
    render: function render() {
        return React.createElement(
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
        );
    }
});

var PlayerList = React.createClass({
    displayName: 'PlayerList',

    getInitialState: function getInitialState() {
        return {
            players: playerList
        };
    },
    render: function render() {
        var players = this.state.players.map(function (player) {
            return React.createElement(Player, { player: player });
        });
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'h2',
                null,
                'Players'
            ),
            React.createElement(
                'div',
                { className: 'panel-group', id: 'accordion', role: 'tablist', 'aria-multiselectable': 'true' },
                players
            )
        );
    }
});

var NavBar = React.createClass({
    displayName: 'NavBar',

    render: function render() {
        return React.createElement(
            _reactBootstrap.Navbar,
            { toggleNavKey: 0 },
            React.createElement(
                _reactBootstrap.NavBrand,
                null,
                'professorStats'
            ),
            React.createElement(
                _reactBootstrap.CollapsibleNav,
                { eventKey: 0 },
                ' ',
                React.createElement(
                    _reactBootstrap.Nav,
                    { navbar: true },
                    React.createElement(
                        _reactBootstrap.NavItem,
                        { eventKey: 1, href: '#' },
                        'Link'
                    ),
                    React.createElement(
                        _reactBootstrap.NavItem,
                        { eventKey: 2, href: '#' },
                        'Link'
                    ),
                    React.createElement(
                        _reactBootstrap.NavDropdown,
                        { eventKey: 3, title: 'Dropdown', id: 'collapsible-nav-dropdown' },
                        React.createElement(
                            _reactBootstrap.MenuItem,
                            { eventKey: '1' },
                            'Action'
                        ),
                        React.createElement(
                            _reactBootstrap.MenuItem,
                            { eventKey: '2' },
                            'Another action'
                        ),
                        React.createElement(
                            _reactBootstrap.MenuItem,
                            { eventKey: '3' },
                            'Something else here'
                        ),
                        React.createElement(_reactBootstrap.MenuItem, { divider: true }),
                        React.createElement(
                            _reactBootstrap.MenuItem,
                            { eventKey: '4' },
                            'Separated link'
                        )
                    )
                ),
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

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(NavBar, null),
            React.createElement(PlayerList, null)
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
    { history: BrowserHistory },
    React.createElement(Route, { path: '/', component: Main }),
    React.createElement(Route, { path: '/player/:id', component: PlayerPage })
), document.getElementById('root'));
/* This is the eventKey referenced */