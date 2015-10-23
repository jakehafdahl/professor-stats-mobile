 var React = require('react');
 var ReactDOM = require('react-dom');
 var Router = require('react-router');

    var Player = React.createClass({
        render: function(){
            return <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <h4 className="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#{this.props.name}" aria-expanded="true" aria-controls={this.props.name}>
                          {this.props.name}
                        </a>
                      </h4>
                    </div>
                    </div>;
        }
    });

    var PlayerList = React.createClass({
        getInitialState: function(){
            return{
                players: ["Adrian Peterson", "Marshawn Lynch", "Jamaal Charles", "Aaron Rodgers", "Andrew Luck", "Calvin Johnson", "Antonio Brown"]
            };
        },
        render: function(){
            var players = this.state.players.map(function(name){return <Player name={name} />;});
            return <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    {players}
                    </div>;
        }
    });

    var Header = React.createClass({
        render: function(){
            return <div className="row">Players</div>;
        }
    });

    var Main = React.createClass({
        render: function() {
            return (<div><Header /><PlayerList /></div>);
        }
    });
     
    ReactDOM.render(<Main />, document.getElementById('root'));

    var app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function(id) {

            console.log('Received Event: ' + id);
        }
    };

    app.initialize();
