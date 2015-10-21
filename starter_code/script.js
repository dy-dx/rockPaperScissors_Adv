var userTeam = [];
var aiTeam = [];

var currentUserPokemon = null;
var currentAiPokemon = null;


function Pokemon (owner, name, type, attackName) {
    this.owner = owner;
    this.name = name;
    this.type = type;
    this.attackName = attackName;

    this.hp = 100;
}

Pokemon.prototype.attack = function (enemy) {
    var counters = {
        fire: 'grass',
        water: 'fire',
        grass: 'water'
    };

    var damageTypes = {
        notEffective: 10,
        neutral: 20,
        superEffective: 30
    };


    var effectiveness = 'neutral';
    if (counters[this.type] === enemy.type) {
        effectiveness = 'superEffective';
    } else if (counters[enemy.type] === this.type) {
        effectiveness = 'notEffective';
    }

    var damage = damageTypes[effectiveness];

    var message = this.owner + '\'s ' + this.name + ' used ' + this.attackName + '!';
    if (effectiveness === 'superEffective') {
        message += ' It\'s super effective!';
    } else if (effectiveness === 'notEffective') {
        message += ' It\'s not very effective...';
    }
    log(message);

    enemy.hp -= damage;
};


function setupGame() {
    userTeam.push(new Pokemon('User', 'Squirtle', 'water', 'Water Gun'));
    userTeam.push(new Pokemon('User', 'Bulbasaur', 'grass', 'Vine Whip'));
    userTeam.push(new Pokemon('User', 'Charmander', 'fire', 'Ember'));

    aiTeam.push(new Pokemon('Ai', 'Squirtle', 'water', 'Water Gun'));
    aiTeam.push(new Pokemon('Ai', 'Bulbasaur', 'grass', 'Vine Whip'));
    aiTeam.push(new Pokemon('Ai', 'Charmander', 'fire', 'Ember'));

    tick();
}


function displayTeamStatus() {
    $('#userTeam').empty();
    $('#aiTeam').empty();

    for (var i = 0; i < userTeam.length; i++) {
        var pokemon = userTeam[i];
        var $pokemonElement = $('<div class="pokemon">' + pokemon.name + ' (' + pokemon.hp + 'hp)' + '</div>');
        $('#userTeam').append($pokemonElement);
    }

    for (var j = 0; j < userTeam.length; j++) {
        var pokemon = userTeam[j];
        var $pokemonElement = $('<div class="pokemon">' + pokemon.name + ' (' + pokemon.hp + 'hp)' + '</div>');
        $('#aiTeam').append($pokemonElement);
    }


    if (currentUserPokemon) {
        $('#currentUserPokemon').text(currentUserPokemon.name);
        $('#userPokemonHP').text(currentUserPokemon.hp);
    }

    if (currentAiPokemon) {
        $('#currentAiPokemon').text(currentAiPokemon.name);
        $('#aiPokemonHP').text(currentAiPokemon.hp);
    }
}

function tick() {

    if (!currentAiPokemon) {
        currentAiPokemon = getAISelection();
        if (!currentAiPokemon) {
            log('You Win!');
            return;
        } else {
            log('AI chooses ' + currentAiPokemon.name + '!');
        }
    } else if (currentAiPokemon.hp <= 0) {
        currentAiPokemon = null;
        return tick();
    }

    displayTeamStatus();

    if (!currentUserPokemon) {
        showUserPokemonSelection();
        return;
    } else if (currentUserPokemon.hp <= 0) {
        currentUserPokemon = null;
        return tick();
    }

    displayTeamStatus();

    if (currentUserPokemon && currentAiPokemon) {
        currentUserPokemon.attack(currentAiPokemon);
        currentAiPokemon.attack(currentUserPokemon);
        tick();
    }
}

function showUserPokemonSelection() {
    $('#pokemonSelection ul').empty();
    $('#pokemonSelection').show();
    for (var i = 0; i < userTeam.length; i++) {
        if (userTeam[i].hp > 0) {
            var pokemon = userTeam[i];
            var $pokemonElement = $('<li class="pokemon selectable">' + pokemon.name + '</li>');
            $pokemonElement.data('pokemonObject', pokemon);
            $('#pokemonSelection ul').append($pokemonElement);
            $pokemonElement.click(function (e) {
                currentUserPokemon = $(this).data('pokemonObject');
                $('#pokemonSelection').hide();
                tick();
            });
        }
    }
}

function log(message) {
    $('#battleLog').prepend('<div>' + message + '</div>');
}


function getAISelection() {
    var selectablePokemon = [];
    for (var i = 0; i < aiTeam.length; i++) {
        if (aiTeam[i].hp > 0) {
            selectablePokemon.push(aiTeam[i]);
        }
    }
    if (!selectablePokemon.length) { return false; }
    return selectablePokemon[Math.floor(Math.random()*selectablePokemon.length)];
}


// This function runs on page load
$(document).ready(function(){
    setupGame();
});
