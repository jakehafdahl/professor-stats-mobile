var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var BrowserHistory = require('react-router').BrowserHistory;
import { Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem, CollapsibleNav } from 'react-bootstrap'

var playerList = [
    {
        name: "Adrian Peterson",
        position: "RB",
        id: "ADRP"
    },
    {
        name: "Marshawn Lynch",
        position: "RB",
        id: "MRSH"
    },
    {
        name: "Jamaal Charles",
        position: "RB",
        id: "JMCH"
    },
    {
        name: "Aaron Rodgers",
        position: "QB",
        id: "AARN"
    },
    {
        name: "Andrew Luck",
        position: "QB",
        id: "ALUC"
    },
    {
        name: "Calvin Johnson",
        position: "WR",
        id: "CALJ"
    },
    {
        name: "Antonio Brown",
        position: "WR",
        id: "ANTO"
    }];

    function getPlayerById(id){
        return playerList.filter(function(player){return player.id === id})[0];
    };

    var Player = React.createClass({
        render: function(){
            return <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <h4 className="panel-title">
                          <Link to={`/player/${this.props.player.id}`}>{this.props.player.name}</Link>
                      </h4>
                    </div>
                    </div>;
        }
    });

    var PlayerPage = React.createClass({
        getInitialState: function(){
            return {player: getPlayerById(this.props.params.id)};
        },
        render: function(){
            return <div className="row">
                <h1>{this.state.player.name}</h1>
                <h3>{this.state.player.position}</h3>
            </div>
        }
    });

    var PlayerList = React.createClass({
        getInitialState: function(){
            return{
                players: playerList
            };
        },
        render: function(){
            var players = this.state.players.map(function(player){return <Player player={player} />;});
            return <div className="row">
                    <h2>Players</h2>
                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    {players}
                    </div>
                    </div>;
        }
    });

    var NavBar = React.createClass({
        render: function(){
            return (
                    <Navbar toggleNavKey={0}>
                        <NavBrand>professorStats</NavBrand>
                        <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
                          <Nav navbar>
                            <NavItem eventKey={1} href="#">Link</NavItem>
                            <NavItem eventKey={2} href="#">Link</NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="collapsible-nav-dropdown">
                              <MenuItem eventKey="1">Action</MenuItem>
                              <MenuItem eventKey="2">Another action</MenuItem>
                              <MenuItem eventKey="3">Something else here</MenuItem>
                              <MenuItem divider />
                              <MenuItem eventKey="4">Separated link</MenuItem>
                            </NavDropdown>
                          </Nav>
                          <Nav navbar right>
                            <NavItem eventKey={1} href="#">Link Right</NavItem>
                            <NavItem eventKey={2} href="#">Link Right</NavItem>
                          </Nav>
                        </CollapsibleNav>
                    </Navbar>
                );
        }
    });

    var Main = React.createClass({
        render: function() {
            return (<div><NavBar /><PlayerList /></div>);
        }
    });
     

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

    ReactDOM.render((<Router history={BrowserHistory}>
                        <Route path="/" component={Main} />
                        <Route path="/player/:id" component={PlayerPage}/>
                    </Router>)
        , document.getElementById('root'))
