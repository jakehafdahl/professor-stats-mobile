/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
requirejs.config({
    paths:{
        'react': 'lib/react/react.min',
        'react-dom': 'lib/react/react-dom.min',
        'rsvp': 'lib/rsvp.js/rsvp',
        'route-recognizer': 'lib/route-recognizer/dist/route-recognizer',
        'bootstrap': 'lib/bootstrap/dist/js/bootstrap.min',
        'jquery': 'lib/jquery/dist/jquery.min'
    }
});

 requirejs(['react', 'react-dom', 'rsvp', 'route-recognizer','router', 'jquery', 'bootstrap'], function(React, ReactDOM, rsvp, routerecognizer, router, jquery, bootstrap){
    var Player = React.createClass({
        render: function(){
            return <div className="row">{this.props.name}</div>
        }
    });

    var PlayerList = React.createClass({
        getInitialState: function(){
            return{
                players: ["Adrian Peterson", "Marshawn Lynch", "Jamaal Charles"]
            };
        },
        render: function(){
            var players = this.state.players.map(function(name){return <Player name={name} />;});
            return <div>
                    {players}
                    </div>;
        }
    });

    var Main = React.createClass({
        getInitialState: function(){
            return {name: "World"};
        },
        render: function() {
            return (<div className="panel panel-default">
                    Hello {this.state.name}
                    <PlayerList />
                </div>);
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

});