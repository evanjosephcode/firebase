  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDP5XRPt6CjMpDFNDEmvIhuElLq5lhQkgs",
    authDomain: "mwclass-seaman.firebaseapp.com",
    databaseURL: "https://mwclass-seaman.firebaseio.com",
    projectId: "mwclass-seaman",
    storageBucket: "mwclass-seaman.appspot.com",
    messagingSenderId: "78077600785"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding trains
  // NOTE

  // saying undefined for #add-train-btn and not understanding why
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    //not sure about the way this one is formatted with format'X' for military time
    var trainStart = $("#start-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
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
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrequency);

    var trainArrival;
    var trainMinutes;

    //Moment.JS logic
    var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var differenceTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var remainder = differenceTime % trainFrequency;


    // Minute Until Train
    trainMinutes = trainFrequency - remainder;

    // Next Train
    trainArrival = moment().add(trainMinutes, "minutes").format("HH:mm");



    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
      trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");
  });