//business logic

function User(userName, userScore) {
  this.userName = userName;
  this.userScore = userScore;
}

//need to write method to switch players (using an array and when it finishes start at beginning)
//also need method to save and display players roll total and total score
//tie active user into the rollDice() method (make it a prototype beacuse it will be applied to the current user)

function rollDice(turnTotal, activeUser, users) {
  //to start each roll, it IS the players turn
  var turn = true;
  //receive random number between 1 - 6
  var dieNumber = Math.floor((Math.random() * 6) + 1);
  //add dieNumber to turnTotal (everytime the function is called)
  turnTotal += dieNumber;
  //if dieNumber is 1, turnTotal becomes 0 and turn becomes false
  if (dieNumber === 1) {
    turnTotal = 0;
    activeUser ++;
    alert('next player');
    if(activeUser > users.length -1 ){
      activeUser = 0;
    };
    turn = false;
  }

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

  var activeUser = 0;

  var users = [];
  var user1 = new User("Player 1", 0);
  var user2 = new User("Player 2", 0);
  var user3 = new User("Player 3", 0);
  users.push(user1, user2, user3);

  console.log(users);

  //when "roll" button is clicked
  $("button#roll-button").click(function() {

    [turnTotal, activeUser] = rollDice(turnTotal,activeUser, users);

    console.log([turnTotal, activeUser]);

    $("div#roll-number h2 span").text(turnTotal);

  });

  //when "hold" button is clicked:
  $("button#hold-button").click(function() {
    //userScore adds turnTotal to the stored sum of userScore and zeros out turnTotal
    //and the turn becomes false
    // userScore += turnTotal;
    users[activeUser].userScore += turnTotal;
    turnTotal = 0;
    activeUser ++;
    alert('next player');
    if(activeUser > users.length -1 ){
      activeUser = 0;
    };
    turn = false;

    console.log(users[activeUser].userScore);
    console.log(turn);
    console.log(user1);
    console.log(user2);
    console.log(user3);

    $("div#total-score h2 span").text(userScore);

    if (userScore >= 100) {
      $("div#game").fadeOut();
      $("div#winner").fadeIn();
    }

  });

});
