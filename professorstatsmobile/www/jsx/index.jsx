var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var $ = require('jquery');
var playerRepository = require('./playerRepository');
import createHashHistory from 'history/lib/createHashHistory'
import { Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem, CollapsibleNav, Button, Glyphicon } from 'react-bootstrap'

    var Player = React.createClass({
        render: function(){
            return  <tr>
                        <td>
                            <Link to={`/player/${this.props.player.id}`}>{this.props.player.name}<span className="glyphicon glyphicon-chevron-right pull-right"></span></Link>
                        </td> 
                    </tr>;
        }
    });

    var StatEntry = React.createClass({
        updateField: function(){
            var value = this.refs[this.props.field].value;
            value = isNaN(value) ? 0 : parseInt(value);
            this.props.handleChange(this.props.field, value);
        },
        render: function(){
            return <div className="form-group">
                     <label>{this.props.field}</label>
                    <input type="text" className="form-control" ref={this.props.field} value={this.props.player[this.props.field]} onChange={this.updateField} /></div>;
        }
    });

    var PlayerPage = React.createClass({
        getInitialState: function(){
            return {player: playerRepository.getPlayerById(this.props.params.id)};
        },
        handleChange: function(field, value){
            this.state.player[field] = value;

            this.setState({player: this.state.player});
        },
        handleSave: function(){
            var component = this;
            // call to playerRepo to save updates and transition to PlayerList
            playerRepository.updatePlayer(this.state.player).then(function(){
                component.props.history.pushState(null, '/Players');
            })
        },
        render: function(){
            var fields = [];
            for(var field in this.state.player){
                if(["name", "position", "team", "id"].indexOf(field) === -1){
                    fields.push(<StatEntry field={field} player={this.state.player} handleChange={this.handleChange} />);
                }
            }
            return <div>
                        <NavBar />
                        <div className="container-fluid">
                            <div className="row">
                                <h1>{this.state.player.name}</h1>
                                <h3>{this.state.player.position}</h3>
                            </div>
                            <div className="row">
                                {fields}
                            </div>
                            <footer>
                                <div className="container">
                                    <Button onClick={this.handleSave} >Save</Button>
                                </div>
                            </footer>
                        </div>
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

    var HomeScreen = React.createClass({
        render: function(){
            return <div className="container-fluid">
                        <h1>Home screen</h1>
                        <Link className="btn btn-primary" to='/Players'>Edit Players<span className="glyphicon glyphicon-chevron-right pull-right"></span></Link>
                    </div>;
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
                        <Route path="/Main" component={HomeScreen} />
                        <Route path="/Players" component={Main} />
                        <Route path="/player/:id" component={PlayerPage}/>
                    </Router>)
        , document.getElementById('root'))
