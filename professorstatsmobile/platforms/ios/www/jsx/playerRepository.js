var $ = require('jquery'),
		model = module.exports;

var localStorage = window.localStorage;
// setItem(key,val)
// getItem(key)

var localPlayers = JSON.parse(localStorage.getItem('ps-players'));

var localCopy = localPlayers && localPlayers.length > 0;

model.getPlayerById = function(id){
	var player = localPlayers.filter(x=>x.id === id);
	if(player && player.length === 1){
		return player[0];
	}
};

model.getPlayers = function(){
	var promise = new Promise(function(resolve, reject) {
		if(!localCopy){
		    $.get('http://ruthless-ff.herokuapp.com/projections/default', function(result){
		    	localPlayers = result.players.map(function(current,index){
		    		current.id = "" + index;
		    		return current;
		    	});
		    	localStorage.setItem('ps-players', JSON.stringify(localPlayers));
		    	resolve(localPlayers);
		    })
		    .fail(function(error){
		    		reject(error);
		    	});
		}else{
			resolve(localPlayers)
		}
	});

	return promise;
};
