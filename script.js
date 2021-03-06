if (localStorage.getItem("gcData") == null) {
 localStorage.setItem("gcData", "null");
 localStorage.setItem("gcBuildings", "null");
}
var data = localStorage.gcData.split(",")
var gameStuff = [0, 0, 1, 0, false, false, 2, 0, 0]// miles, mps, cps, wads, MPSing, MPwadded, clickingAnim, mps(but with boosts), miles till wad
const startData = [gameStuff[0], gameStuff[1], gameStuff[2], gameStuff[3],[[0, 0.001, 0.1, 2, true],[0, 0.01, 1, 10, false]]]//amount, boost, displayBoost, baseCost, unlocked
var timeOuts = [false, [false, 300000], [1, 60000]]//bg, warehouses(300000), warehouse event ends
if (localStorage.gcData == "null") {
	data = startData
} else {
	data.push([])
	let temp = localStorage.gcBuildings.split(",")
	for (let i = 0; i < localStorage.gcBuildings.length / 5; i += 5) {
		 let unlocked = true
		 if (temp[i + 4] == "true") {
		   unlocked = true
		 } else {
		   unlocked = false	 
		 }
		 data[4].push([Number(temp[i]), Number(temp[i + 1]), Number(temp[i + 2]) , Number(temp[i + 3]), unlocked])
	}
}
if (data.length < startData.length) {//if data isn't current
	let temp = localStorage.gcData.split(",")
	data = []
	for (let i = 0; i < temp.length; i ++) {
	 data.push(temp[i])
	}
	for (let i = temp.length; i < startData.length; i ++) {
	  data.push(startData[i])
	}
} else if (data[4].length < startData[4].length)  {//if buildings arent current
	let temp = localStorage.gcBuildings.split(",")
	data[4] = []
	for (let i = 0; i < temp.length; i += 5) {
	 let unlocked = true
	 if (temp[i + 4] == "true") {
	   unlocked = true
	 } else {
	   unlocked = false	 
	 }
	 data[4].push([Number(temp[i]), Number(temp[i + 1]), Number(temp[i + 2]) , Number(temp[i + 3]), unlocked])
	}
	for (let i = temp.length / 5; i < startData[4].length; i ++)	{
	  data[4].push(startData[4][i])	
	}
}
localStorage.gcData = [data[0], data[1], data[2], data[3]]
localStorage.gcBuildings = [data[4]]
function onLaunch() {
	document.getElementById("sign").style.display = "none"
	document.getElementById("shed").style.display = "none"
	gameStuff[0] = Number(data[0])
	gameStuff[1] = Number(data[1])
	gameStuff[2] = Number(data[2])
	gameStuff[3] = Number(data[3])
	gameStuff[7] = Number(data[1])
	document.getElementById("miles").innerHTML = gameStuff[0]
	document.getElementById("wads").innerHTML = gameStuff[3]
	document.getElementById("mps").innerHTML = Number(gameStuff[7]).toFixed(2);
	for (var i = 0; i < data[4].length; i ++) {
	  document.getElementById(i + "cost").innerHTML = Math.round(data[4][i][3] + data[4][i][0] / 0.7)
	  document.getElementById(i + "amount").innerHTML = data[4][i][0]
	  document.getElementById(i + "base").innerHTML = data[4][i][2]
	  document.getElementById(i + "all").innerHTML = Number(data[4][i][2] * data[4][i][0]).toFixed(2);
	  if (data[4][i][4]) {
	     document.getElementById(i + "element").style.display = "block"
	  }
	}
	if (gameStuff[1] > 0) {
           moneyCalc()
	   gameStuff[4] = true
	}
	shed()
	console.log(data)
}

function shed() {
  if(!timeOuts[1][0]) {
    document.getElementById("shed").style.left = "1020px"
    timeOuts[1][0] = true
    setTimeout(() => {
	 document.getElementById("shed").style.display = "block"
    }, timeOuts[1][1])
  }
}

function shedGain(type) {
     let rand = Math.floor(Math.random() * 101)
     if (rand < 50) {
	     document.getElementById("shedText").innerHTML = "+" + Math.round(Math.floor(Math.random() * 200) + gameStuff[7]) + " wads"
	     gameStuff[3] += Math.round(Math.floor(Math.random() * 200) + gameStuff[7])
	     updateData()
     } else {
       document.getElementById("shedText").innerHTML = "Frenzy!"
       gameStuff[7] *= 7
       document.getElementById("mps").innerHTML = Number(gameStuff[7]).toFixed(2);
       document.getElementById("fred").style.display = "block"
	 if (timeOuts[2][0] == 7) {
	    timeOuts[2][1] += 60000	 
	 } else {
	   timeOuts[2][0] = 7
	 }
	     setTimeout(() => {
		  gameStuff[7] = gameStuff[1]
		  document.getElementById("mps").innerHTML = Number(gameStuff[7]).toFixed(2);
		  timeOuts[2][0] = 1
		  document.getElementById("fred").style.display = "none"
	     }, timeOuts[2][1])
     }
     document.getElementById("wads").innerHTML = gameStuff[3]
     document.getElementById(type).style.display = "none"
     timeOuts[1][0] = false
     shed()
     setTimeout(() => {
       document.getElementById("shedText").innerHTML = ""
     }, 2000)
}

function moneyCalc() {
  for (var i = 0; i < data[4].length; i ++) {
	gameStuff[0] += data[4][i][1] * data[4][i][0] * timeOuts[2][0]	  
  }
  document.getElementById("miles").innerHTML = Math.round(gameStuff[0])
  gameStuff[8] += 1
  if (gameStuff[8] >= 10 && !gameStuff[5]) {
    gameStuff[3] += 1
    gameStuff[8] = 0
 }
 if (Math.round(gameStuff[0]) % 10 != 0) {
    gameStuff[5] = false
 }
 document.getElementById("wads").innerHTML = gameStuff[3]
 updateData()
  setTimeout (() => {
    moneyCalc()
  }, 1)
  if (!timeOuts[0]) {
     timeOuts[0] = true
	  setTimeout (() => {
	      background()
	      timeOuts[0] = false
	  }, 1000 - gameStuff[7] * 2)
  }
}

function background() {
 document.getElementById("hills").src ="./images/hills" + gameStuff[6] + ".png"
 gameStuff[0] += gameStuff[2]
 gameStuff[6] += 1
 if (gameStuff[6] > 6) {
   gameStuff[6] = 1	 
 }
 if (Math.round(gameStuff[0]) % 10 == 0 && !gameStuff[5]) {
    document.getElementById("sign").style.display = "block"
 }
  var movingStuff = [["sign", "1280px"], ["shed", "1020px"]]
       for (var i = 0; i < movingStuff.length;i ++) {
	  if (document.getElementById(movingStuff[i][0]).style.display == "block") {
		  let pos = document.getElementById(movingStuff[i][0]).style.left
		  pos = pos.split("px")
		  pos = parseInt(pos[0])
		  pos -= 60
		  document.getElementById(movingStuff[i][0]).style.left = pos + "px"
		  if (pos <= 500) {
		      document.getElementById(movingStuff[i][0]).style.left = movingStuff[i][1]
		      document.getElementById(movingStuff[i][0]).style.display = "none"
		      if (movingStuff[i][0] == "shed" && timeOuts[1][0] == true) {
			      timeOuts[1][0] = false
			      shed()
		      }
		  }
  	}
  }
}

function clicked() {
 document.getElementById("miles").innerHTML = Math.round(gameStuff[0])
 background()
 data[0] = gameStuff[0]
 gameStuff[8] += 1
 if (gameStuff[8] >= 10) {
    document.getElementById("sign").style.display = "block"
    gameStuff[3] += 1
    gameStuff[8] = 0
 }
 document.getElementById("wads").innerHTML = gameStuff[3]
 updateData()
}
function buyItem(id) {//thrusters, id 0
	var cost = Number(document.getElementById(id + "cost").innerHTML)
	if (gameStuff[3] >= cost) {
	  data[4][id][0] += 1
	  gameStuff[3] -= cost
	  document.getElementById("wads").innerHTML = gameStuff[3]
	  gameStuff[1] += data[4][id][2]
	  gameStuff[7] = gameStuff[1] * timeOuts[2][0]
	  document.getElementById("mps").innerHTML = Number(gameStuff[7]).toFixed(2);
	  document.getElementById(id + "cost").innerHTML = Math.round(data[4][id][3] + data[4][id][0] / 0.7)
	  document.getElementById(id + "amount").innerHTML = data[4][id][0]
	  document.getElementById(id + "all").innerHTML = Number(data[4][id][2] * data[4][id][0]).toFixed(2);
	  if (!gameStuff[4]) {
		  moneyCalc()
		  gameStuff[4] = true
	  }
	  updateData()
	}
}

function wipeSave() {
	console.log("Yo")
	localStorage.gcData = null
	data = localStorage.gcData
	window.location.reload();
}

function updateData() {
 data[0] = gameStuff[0]
 data[1] = gameStuff[1]
 data[2] = gameStuff[2]
 data[3] = gameStuff[3]
 localStorage.gcData = [data[0], data[1], data[2], data[3]]
 localStorage.gcBuildings = [data[4]]
 if (data[0] >= 100) {data[4][1][4] = true; document.getElementById("1element").style.display = "block"}
}
