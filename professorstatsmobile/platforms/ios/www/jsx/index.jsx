var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var $ = require('jquery');
var playerRepository = require('./playerRepository');
import createHashHistory from 'history/lib/createHashHistory'
import { Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem, CollapsibleNav, Button, Glyphicon } from 'react-bootstrap'


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

    var Player = React.createClass({
        render: function(){
            return  <tr>
                        <td>
                            <Link to={`/player/${this.props.player.id}`}>{this.props.player.name}<span className="glyphicon glyphicon-chevron-right pull-right"></span></Link>
                        </td> 
                    </tr>;
        }
    });

    var PlayerPage = React.createClass({
        getInitialState: function(){
            return {player: playerRepository.getPlayerById(this.props.params.id)};
        },
        render: function(){
            return <div>
                        <NavBar />
                        <div className="container-fluid">
                            <div className="row">
                                <h1>{this.state.player.name}</h1>
                                <h3>{this.state.player.position}</h3>
                            </div>
                            <div className="row form-group">
                                <label>Rush Attempts</label>
                                <input type="text" className="form-control" value={this.state.player.rushattempts} />
                                <label>Rush Yards</label>
                                <input type="text" className="form-control" value={this.state.player.rushyards} />
                                <label>Rush Touchdowns</label>
                                <input type="text" className="form-control" value={this.state.player.rushtd} />
                                <label>Receptions</label>
                                <input type="text" className="form-control" value={this.state.player.receptions} />
                                <label>Receiving Yards</label>
                                <input type="text" className="form-control" value={this.state.player.receptionyards} />
                                <label>Receiving Touchdowns</label>
                                <input type="text" className="form-control" value={this.state.player.receptiontds} />
                            </div>
                        </div>
                        <Navbar fixedBottm inverse toggleNavKey={0}>
                        <NavBrand><Glyphicon glyph="chevron-left" onClick={this.goBack}/>
                        </NavBrand>
                        <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
                          <Nav navbar right>
                            <NavItem eventKey={1} href="#">Link Right</NavItem>
                            <NavItem eventKey={2} href="#">Link Right</NavItem>
                          </Nav>
                        </CollapsibleNav>
                    </Navbar>
                    </div>;
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
            var players = this.props.players.map(function(player){return <Player key={player.id} player={player} />;});
            return  <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <input type="text" className="form-control" placeholder="Search by name" ref="filterSearch" onChange={this.searchTextUpdated} />
                            </div>
                            <div className="col-sm-6">
                                <select className="form-control"  ref="filterPosition" onChange={this.filterPositionUpdated}>
                                    <option value="">All</option>
                                    <option value="QB">Quarterback</option>
                                    <option value="RB">Runningback</option>
                                    <option value="WR">Wide Reciever</option>
                                    <option value="TE">Tight End</option>
                                    <option value="K">Kicker</option>
                                    <option value="DST">Defense/Special Teams</option>
                                </select>
                            </div>
                            <div className="col-sm-12">
                                <table className="table table-striped table-condensed" >
                                    <tbody>
                                    {players}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>;
        }
    });

    var NavBar = React.createClass({
        goBack: function(e){
            history.back();
        },
        render: function(){
            return (
                    <Navbar fixedTop inverse toggleNavKey={0}>
                        <NavBrand><Glyphicon glyph="chevron-left" onClick={this.goBack}/>
                        </NavBrand>
                        <CollapsibleNav eventKey={0}>
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
        componentDidMount: function(){
            var component = this;
            playerRepository.getPlayers().then(function(players){
                if(component.isMounted()){
                    component.setState({
                        originalPlayerList: players,
                        players: players,
                    });
                }
            });
        },
        getInitialState: function(){

            return{
                originalPlayerList: [],
                players: []
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
            return (<div>
                        <NavBar />
                        <PlayerList players={this.state.players} updateFilterFromSearch={this.updateFilterFromSearch} filterPositionUpdated={this.filterPositionUpdated} />
                    </div>);
        }
    });
     

    var SplashScreen = React.createClass({
        mixins: [Router.Navigation],
        getInitialState: function(){
            return {title: "<professor-Stats />"}
        },
        componentDidMount: function(){
            var component = this;
            setTimeout(function(){component.props.history.pushState(null, '/Main');},2000);

        },
        render: function(){
            return <div className="container-fluid">{this.state.title}</div>
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

    ReactDOM.render((<Router history={createHashHistory()}>
                        <Route path="/" component={SplashScreen} />
                        <Route path="/Main" component={Main} />
                        <Route path="/player/:id" component={PlayerPage}/>
                    </Router>)
        , document.getElementById('root'))
