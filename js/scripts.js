//business logic

function User(userName, userScore) {
  this.userName = userName;
  this.userScore = userScore;
}

// ****** trying to DRY out the code

// function changePlayer(activeUser, users) {
//   activeUser ++;
//   alert("next player");
//   if(activeUser > users.length -1 ){
//     activeUser = 0;
//   };
//   console.log(activeUser);
//   console.log(users);
//   console.log("sup");
// }
//
// function highlightPlayer(players, activeUser) { // or is it (players[activeUser]) ???
//   var players = $("div#players").children();
//   players.each(function() {
//     $(this).removeClass("current-player");
//   });
//   $(players[activeUser]).addClass("current-player");
// }

function rollDice(turnTotal, activeUser, users) {
  //to start each roll, it IS the players turn
  var turn = true;
  //receive random number between 1 - 6
  var dieNumber = Math.floor((Math.random() * 6) + 1);
  //add dieNumber to turnTotal (everytime the function is called)
  turnTotal += dieNumber;
  //IF dieNumber is 1, turnTotal becomes 0, activeUser increments by 1 and turn becomes false
  if (dieNumber === 1) {
    turnTotal = 0;
    activeUser ++;
    //IF activeUser is greater than the amount of users less one (users.length -1), activeUser becomes 0
    if(activeUser > users.length -1 ){ //-1 because index starts at 0; if you reach the end, restart.
      activeUser = 0; //starts array at beginning (index of 0)
    };
    turn = false;
  }
  //addClass to indexed child of players - highlights current player
  var players = $("div#players").children();
  players.each(function() {
    $(this).removeClass("current-player");
  });
  $(players[activeUser]).addClass("current-player");

  console.log(turn);
  console.log(dieNumber);
  $("div#die-number h2 span").text(dieNumber);
  return [turnTotal, activeUser];
}

//user logic
$(document).ready(function() {
  //keeping variable scope in mind, everytime we click "roll" or "hold"
  //we don't want turnTotal or userScore to start at 0
  var turnTotal = 0;
  var userScore = 0;
  var activeUser = 0; //activeUser is just the index position of "users"
  var users = [];
  var user1 = new User("Player 1", 0);
  var user2 = new User("Player 2", 0);

  users.push(user1, user2);
  console.log(users);

  //when "roll" button is clicked
  $("button#roll-button").click(function() {

    [turnTotal, activeUser] = rollDice(turnTotal, activeUser, users);

    console.log([turnTotal, activeUser]);

    $("div#roll-number h2 span").text(turnTotal);

  });

  //when "hold" button is clicked:
  $("button#hold-button").click(function() {
    users[activeUser].userScore += turnTotal; //userScore of the current user: users[index#] adds turnTotal to the stored sum of userScore (of current user)
    turnTotal = 0;    //zeros out turnTotal
    activeUser ++;  //increments activeUser by 1
    if(activeUser > users.length -1 ){
      activeUser = 0;
    };
    turn = false; //turn becomes false

    console.log(users[activeUser].userScore); //activeUser is just the index position of "users"
    console.log(turn);
    console.log(user1);
    console.log(user2);

    //display players scores
    $("div#player1 h2 span").text(user1.userScore);
    $("div#player2 h2 span").text(user2.userScore);

    //addClass to indexed child of players - highlights current player
    var players = $("div#players").children();
    players.each(function() {
      $(this).removeClass("current-player");
    });
    $(players[activeUser]).addClass("current-player");

    //when first player reaches 100
    if (user1.userScore >= 100 || user2.userScore >= 100) {
      $("div#game").fadeOut();
      $("div#winner").fadeIn();
    }

  });

});
