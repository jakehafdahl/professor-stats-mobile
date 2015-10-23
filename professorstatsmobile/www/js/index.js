'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

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
                        { to: '/player/' + this.props.player.name },
                        this.props.player.name
                    )
                )
            )
        );
    }
});

var PlayerPage = React.createClass({
    displayName: 'PlayerPage',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'h1',
                null,
                this.props.params.name
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
            { className: 'panel-group', id: 'accordion', role: 'tablist', 'aria-multiselectable': 'true' },
            players
        );
    }
});

var Header = React.createClass({
    displayName: 'Header',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'row' },
            'Players'
        );
    }
});

var Main = React.createClass({
    displayName: 'Main',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Header, null),
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
    null,
    React.createElement(Route, { path: '/', component: Main }),
    React.createElement(Route, { path: '/player/:name', component: PlayerPage })
), document.getElementById('root'));