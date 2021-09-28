var data = localStorage.gcData.split(",")
var miles = 0
var wads = 0
var mps = 0
var cps = 1
const startData = [miles, mps, cps, wads, []]
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
}
localStorage.gcData = data
miles = data[0]
mps = data[1]
cps = data[2]
wads = data[3]
document.getElementById("miles").innerHTML = miles
document.getElementById("wads").innerHTML = wads
document.getElementById("mps").innerHTML = mps


function moneyCalc() {
  miles += mps
  setTimeout (() => {
    moneyCalc()
  }, 1)
}
function clicked() {
 miles += cps
 document.getElementById("miles").innerHTML = miles
 data[0] = miles
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
