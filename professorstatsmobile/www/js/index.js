'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');

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
                        'a',
                        { role: 'button', 'data-toggle': 'collapse', 'data-parent': '#accordion', href: '#{this.props.name}', 'aria-expanded': 'true', 'aria-controls': this.props.name },
                        this.props.name
                    )
                )
            )
        );
    }
});

var PlayerList = React.createClass({
    displayName: 'PlayerList',

    getInitialState: function getInitialState() {
        return {
            players: ["Adrian Peterson", "Marshawn Lynch", "Jamaal Charles", "Aaron Rodgers", "Andrew Luck", "Calvin Johnson", "Antonio Brown"]
        };
    },
    render: function render() {
        var players = this.state.players.map(function (name) {
            return React.createElement(Player, { name: name });
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

ReactDOM.render(React.createElement(Main, null), document.getElementById('root'));

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