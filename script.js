if (localStorage.getItem("gcData") == null) {
 localStorage.setItem("gcData", "null");
 localStorage.setItem("gcBuildings", "null");
}
var data = localStorage.gcData.split(",")
var gameStuff = [0, 0, 1, 0, false, false]// miles, mps, cps, wads, MPSing, MPwadded
const startData = [gameStuff[0], gameStuff[1], gameStuff[2], gameStuff[3],[[0, 0.001, 0.1, 2]]]//amount, boost, displayBoost, baseCost
console.log(localStorage.gcData)
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
	gameStuff[0] = Number(data[0])
	gameStuff[1] = Number(data[1])
	gameStuff[2] = Number(data[2])
	startData[3] = Number(data[3])
	document.getElementById("miles").innerHTML = gameStuff[0]
	document.getElementById("wads").innerHTML = startData[3]
	document.getElementById("mps").innerHTML = gameStuff[1]
	for (var i = 0; i < data[4].length; i ++) {
	  document.getElementById(i + "cost").innerHTML = Math.round(data[4][i][3] + data[4][i][0] / 1.5)
	  document.getElementById(i + "amount").innerHTML = data[4][i][0]
	}
	if (gameStuff[1] > 0) {
           moneyCalc()
	   gameStuff[4] = true
	}
}


function moneyCalc() {
  for (var i = 0; i < data[4].length; i ++) {
	gameStuff[0] += data[4][i][1] * data[4][i][0]	  
  }
  document.getElementById("miles").innerHTML = Math.round(gameStuff[0])
  if (Math.round(gameStuff[0]) % 10 == 0 && !gameStuff[5]) {
    gameStuff[5] = true
    startData[3] += 1
 }
 if (Math.round(gameStuff[0]) % 10 != 0) {
    gameStuff[5] = false
 }
 document.getElementById("wads").innerHTML = startData[3]
 updateData()
  setTimeout (() => {
    moneyCalc()
  }, 1)
}
function clicked() {
 document.getElementById("hills").src ="./images/hill2"
 gameStuff[0] += gameStuff[2]
 document.getElementById("miles").innerHTML = Math.round(gameStuff[0])
 data[0] = gameStuff[0]
 if (gameStuff[0] % 10 == 0) {
    startData[3] += 1
 }
 document.getElementById("wads").innerHTML = startData[3]
 updateData()
 setTimeout(() => {
	 document.getElementById("hills").src ="./images/hill1" 
 }, 500)
}
function buyItem(id) {//thrusters, id 0
	var cost = Number(document.getElementById(id + "cost").innerHTML)
	if (startData[3] >= cost) {
	  data[4][id][0] += 1
	  startData[3] -= cost
	  document.getElementById("wads").innerHTML = startData[3]
	  gameStuff[1] += data[4][id][2]
	  document.getElementById("mps").innerHTML = gameStuff[1]
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
 data[3] = startData[3]
 localStorage.gcData = [data[0], data[1], data[2], data[3]]
 localStorage.gcBuildings = [data[4]]
}
