var Card = function(suite, rank) {
  // mapping for Ace, king, queen and jack
  var orders = {
    '1': 'A',
    '11': 'J',
    '12': 'Q',
    '13': 'K'
  };

  this.suite = suite;
  this.rank = orders[rank.toString()] || rank;
}

var Deck = function() {
  this.deck = [];

  // generate the deck in the required format 
  this.generateDeck = function() {
    var suites = ['H', 'C', 'D', 'S'];
    for (i = 0; i < suites.length; i++) {
      for (j = 0; j < 13; j++) {
        this.deck.push(new Card(suites[i], j + 1));
      }
    }
  };

  // Shuffle the deck. Used knuth method
  // Algorithm is to pick the last element of the deck and 
  // replace with a random card. Decrement the counter 
  // everytime with swap the cards.
  this.shuffleDeck = function() {
    for (var i = this.deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * i);
      var tmp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = tmp;
    }

    return this.deck;
  };

  // generate the deck everytime Deck is instantated 
  this.generateDeck();
}

// Desired deck 
var myDeck = new Deck();

// Not asked but I have given a click buttom on input page.
// Event listener for them.
document.getElementById('info').addEventListener("click", function(e) {
  var results = document.getElementById('results');
  results.innerHTML = "";

  if (e.target.id == "generate") {
    myDeck = new Deck();
    results.innerHTML = JSON.stringify(myDeck);
    console.log(JSON.stringify(myDeck));
  } else if (e.target.id == "shuffle") {
    myDeck.shuffleDeck();
    results.innerHTML = JSON.stringify(myDeck.deck);
    console.log('Shuffled deck: ', JSON.stringify(myDeck.deck));
  }

});