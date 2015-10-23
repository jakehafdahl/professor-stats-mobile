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
        filterPositionUpdated: function(e){
            this.props.filterPositionUpdated(this.refs.filterPosition.value);
        },
        searchTextUpdated: function(e){
            this.props.updateFilterFromSearch(this.refs.filterSearch.value);
        },
        render: function(){
            var players = this.props.players.map(function(player){return <Player player={player} />;});
            return <div className="row">
                    <div className="col-sm-3">
                        <h2>Players</h2>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" placeholder="Search by name" ref="filterSearch" onChange={this.searchTextUpdated} />
                    </div>
                    <div className="col-sm-4">
                        <select className="form-control"  ref="filterPosition" onChange={this.filterPositionUpdated}>
                            <option value="">All</option>
                            <option value="QB">Quarterback</option>
                            <option value="RB">Runningback</option>
                            <option value="WR">Wide Reciever</option>
                            <option value="TE">Tight End</option>
                        </select>
                    </div>
                    <div className="panel-group col-sm-12" id="accordion" role="tablist" aria-multiselectable="true">
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
        getInitialState: function(){
            return{
                originalPlayerList: playerList,
                players: playerList
            };
        },
        updateFilterFromSearch: function(value){
            var players = value == "" ? this.state.originalPlayerList : this.state.originalPlayerList.filter(function(player){return player.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;});
            this.setState(
                {
                    originalPlayerList: this.state.originalPlayerList,
                    players: players
                }
            );
        },
        filterPositionUpdated: function(value){
            var players = value == "" ? this.state.originalPlayerList : this.state.originalPlayerList.filter(function(player){return player.position.indexOf(value) >= 0 ;});
            this.setState(
                {
                    originalPlayerList: this.state.originalPlayerList,
                    players: players
                }
            );
        },
        render: function() {
            return (<div className="container-fluid">
                        <NavBar />
                        <PlayerList players={this.state.players} updateFilterFromSearch={this.updateFilterFromSearch} filterPositionUpdated={this.filterPositionUpdated} />
                    </div>);
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
