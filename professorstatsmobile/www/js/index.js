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
}, {
    name: "John Brown",
    position: "WR",
    id: "JBROW"
}, {
    name: "Jim Brown",
    position: "RB",
    id: "BROW"
}, {
    name: "Phil Mickelson",
    position: "WR",
    id: "DFSA"
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
            Link,
            { to: '/player/' + this.props.player.id },
            React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(
                    'div',
                    { className: 'panel-heading', role: 'tab', id: 'headingOne' },
                    React.createElement(
                        'h4',
                        { className: 'panel-title' },
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
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'panel-group col-sm-12', id: 'accordion', role: 'tablist', 'aria-multiselectable': 'true' },
                players
            )
        );
    }
});

var NavBar = React.createClass({
    displayName: 'NavBar',

    mixins: [BrowserHistory],
    goBack: function goBack(e) {
        if (Router.History.length > 1) {
            // this will take you back if there is history
            Router.History.back();
        } else {
            // this will take you to the parent route if there is no history,
            // but unfortunately also add it as a new route
            var currentRoutes = this.context.router.getCurrentRoutes();
            var routeName = currentRoutes[currentRoutes.length - 2].name;
            this.context.router.transitionTo(routeName);
        }
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
        );
    }
});

var Main = React.createClass({
    displayName: 'Main',

    getInitialState: function getInitialState() {
        return {
            originalPlayerList: playerList,
            players: playerList
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