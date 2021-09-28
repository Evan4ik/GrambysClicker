var data = localStorage.gcData.split(",")
var gameStuff = [0, 0, 1, 0]// miles, mps, cps, wads
const startData = [gameStuff[0], gameStuff[1], gameStuff[2], gameStuff[3], [[0, 0.01]]]//amount, boost
if (data == null) {
	localStorage.gcData = startData
	localStorage.gcData = gcData
	data = localStorage.gcData.split(",")
	console.log(data)
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
	let temp = localStorage.gcData.split(",")
	data[4] = []
	for (let i = 0; i < temp[4].length; i ++) {
	 data[4].push(temp[4][i])
	}
	for (let i = temp[4].length; i < startData[4].length; i ++)	{
	  data[4].push(startData[4][i])	
	}
	console.log(data)
}
localStorage.gcData = data
function onLaunch() {
	gameStuff[0] = Number(data[0])
	gameStuff[1] = Number(data[1])
	gameStuff[2] = Number(data[2])
	startData[3] = Number(data[3])
	document.getElementById("miles").innerHTML = gameStuff[0]
	document.getElementById("wads").innerHTML = startData[3]
	document.getElementById("mps").innerHTML = gameStuff[1]
}


function moneyCalc() {
  gameStuff[0] += gameStuff[1]
  setTimeout (() => {
    moneyCalc()
  }, 1)
}
function clicked() {
 gameStuff[0] += gameStuff[2]
 document.getElementById("miles").innerHTML = Math.round(gameStuff[0])
 data[0] = gameStuff[0]
 if (gameStuff[0] % 10 == 0) {
    startData[3] += 1
 }
 document.getElementById("wads").innerHTML = startData[3]
 updateData()
}
function buy(cost, id) {
	//loloololol	
}

function wipeSave() {
	console.log("Yo")
	localStorage.gcData = null
	gcData = localStorage.gcData
	window.location.reload();
}

function updateData() {
 data[0] = gameStuff[0]
 data[1] = gameStuff[1]
 data[2] = gameStuff[2]
 data[3] = startData[3]
 localStorage.gcData = data
}
