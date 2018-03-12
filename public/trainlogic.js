// Initialize Firebase
    var config = {
        apiKey: "AIzaSyDP5XRPt6CjMpDFNDEmvIhuElLq5lhQkgs",
        authDomain: "mwclass-seaman.firebaseapp.com",
        databaseURL: "https://mwclass-seaman.firebaseio.com",
        projectId: "mwclass-seaman",
        storageBucket: "",
        messagingSenderId: "78077600785"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
// NOTE

// saying undefined for #add-train-btn and not understanding why
$("#train").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  //not sure about the way this one is formatted with format'X' for military time
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  //logic commeneted out for a different logic scenario 

  // // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);

  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainStart + "</td><td>" + trainFrequency + "</td></tr>");
});




