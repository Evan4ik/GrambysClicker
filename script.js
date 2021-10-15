if (localStorage.getItem("gcData") == null) {
 localStorage.setItem("gcData", "null");
 localStorage.setItem("gcBuildings", "null");
}
var data = localStorage.gcData.split(",")
var gameStuff = [0, 0, 1, 0, false, false, 2, 0]// miles, mps, cps, wads, MPSing, MPwadded, clickingAnim, mps(but with boosts)
const startData = [gameStuff[0], gameStuff[1], gameStuff[2], gameStuff[3],[[0, 0.001, 0.1, 2]]]//amount, boost, displayBoost, baseCost
var timeOuts = [false, [false, 5000], [1, 60000]]//bg, warehouses(300000), warehouse event ends
if (localStorage.gcData == "null") {
	data = startData
} else {
	data.push([])
	let temp = localStorage.gcBuildings.split(",")
	for (let i = 0; i < localStorage.gcBuildings.length / 4; i += 4) {
		 data[4].push([Number(temp[i]), Number(temp[i + 1]), Number(temp[i + 2]) , Number(temp[i + 3])])
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
	console.log(data)
} else if (data[4].length < startData[4].length)  {
	let temp = localStorage.gcBuildings.split(",")
	data[4] = []
	for (let i = 0; i < temp.length; i += 4) {
	 data[4].push([Number(temp[i]), Number(temp[i + 1]), Number(temp[i + 2]) , Number(temp[i + 3])])
	}
	for (let i = temp.length / 4; i < startData[4].length; i ++)	{
	  data[4].push(startData[4][i])	
	}
	console.log(data)
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
	  document.getElementById(i + "cost").innerHTML = Math.round(data[4][i][3] + data[4][i][0] / 1.5)
	  document.getElementById(i + "amount").innerHTML = data[4][i][0]
	}
	if (gameStuff[1] > 0) {
           moneyCalc()
	   gameStuff[4] = true
	}
	shed()
}

function shed() {
  if(!timeOuts[1][0]) {
    document.getElementById("shed").style.left = "1200px"
    timeOuts[1][0] = true
    setTimeout(() => {
	 document.getElementById("shed").style.display = "block"
    }, timeOuts[1][1])
  }
}

function shedGain(type) {
     let rand = Math.floor(Math.random() * 101)
     if (rand < 50) {
	     gameStuff[3] += Math.round(Math.floor(Math.random() * 200) + gameStuff[7])
	     updateData()
     } else {
       gameStuff[7] *= 7
       document.getElementById("mps").innerHTML = Number(gameStuff[7]).toFixed(2);
	 if (timeOuts[2][0] == 7) {
	    timeOuts[2][1] += 60000	 
	 } else {
	   timeOuts[2][0] = 7
	 }
	     setTimeout(() => {
		  gameStuff[7] = gameStuff[1]
		  document.getElementById("mps").innerHTML = Number(gameStuff[7]).toFixed(2);
		  timeOuts[2][0] = 1
	     }, timeOuts[2][1])
     }
     document.getElementById("wads").innerHTML = gameStuff[3]
     document.getElementById(type).style.display = "none"
     timeOuts[1][0] = false
     shed()
}

function moneyCalc() {
  for (var i = 0; i < data[4].length; i ++) {
	gameStuff[0] += data[4][i][1] * data[4][i][0] * timeOuts[2][0]	  
  }
  document.getElementById("miles").innerHTML = Math.round(gameStuff[0])
  if (Math.round(gameStuff[0]) % 10 == 0 && !gameStuff[5]) {
    gameStuff[5] = true
    gameStuff[3] += 1
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
  var movingStuff = [["sign", "1280px"], ["shed", "1080px"]]
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
 if (gameStuff[0] % 10 == 0) {
    document.getElementById("sign").style.display = "block"
    gameStuff[3] += 1
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
	  gameStuff[7] = gameStuff[1]
	  document.getElementById("mps").innerHTML = Number(gameStuff[7]).toFixed(2);
	  document.getElementById(id + "cost").innerHTML = Math.round(data[4][id][3] + data[4][id][0] / 1.5)
	  document.getElementById(id + "amount").innerHTML = data[4][id][0]
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
}
