

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAurwVi6rqfXxhDTHdVQ3zdCT8y8AJN6QI",
    authDomain: "no-escape-web.firebaseapp.com",
    databaseURL: "https://no-escape-web.firebaseio.com",
    projectId: "no-escape-web",
    storageBucket: "",
    messagingSenderId: "700410043465"
  };
  firebase.initializeApp(config);
  
  EnumEntityState = {
    WALKING : 0, 
    DYING : 2
  }
  EnumDirection = {
    UP : "UP", 
    RIGHT : "RIGHT",
    DOWN : "DOWN",
    LEFT : "LEFT"
  }
  
  	var w = window,
    	d = document,
    	e = d.documentElement,
    	g = d.getElementsByTagName('body')[0],
    	x = w.innerWidth || e.clientWidth || g.clientWidth,
    	y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  
	//board vars
  	var tileX, tileStartX, tileStartY, boardDimension, canvasX, canvasY;
  	var canvas = document.getElementById("canvas");
  	var fillPaint = canvas.getContext("2d");
  	var bluePaint = canvas.getContext("2d");
  	var playing, pressed, lastPressedKey;
    var spawnTimer, spawnTimerMax, spawnTimerMaxMax = 900;
    var totalSpawnTimer, isHost, spawnLevel;
    var spawnTimePerInterval = 15 * 1000;
  
    // library stuff
	var spriteImages = new Map();
	var spriteNamesList = ["spazz", "bauli", "carrion"];
	for( i = 0; i < spriteNamesList.length; i++){
		var imgd = new Image();
		imgd.src = "assets/characters/"+ spriteNamesList[i] + ".png"
		spriteImages.set(spriteNamesList[i], imgd);
	}
	
	var missleImages = new Map();
	var missleNamesList = ["burst", "spike", "lazzzer", "nuke_bomb", "vampurst"];
    var missleSpeed = [3,9,0,0,5];
    var missleWarningTime = [500,1000,800,800,800];
    var missleType = ["missle","missle","beam","bomb","return"];
	for( i = 0; i < missleNamesList.length; i++){
		var imgd = new Image();
		imgd.src = "assets/attacks/"+ missleNamesList[i] + ".png"
		missleImages.set(missleNamesList[i], imgd);
	}
    var imgWarning = new Image();
    imgWarning.src = "assets/ui/warning.png";


	if( x > 500 ){
  		canvasX = 500;
  		canvasY = 500;
  	} else {
  		canvasX = x;
  		canvasY = x;
  	}
  
  	boardDimension = 7;
  	tileX = canvasX / (boardDimension+2);
  	tileStartX = tileX;
  	tileStartY = tileX;
  
  