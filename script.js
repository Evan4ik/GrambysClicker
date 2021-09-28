var data = localStorage.gcData
var miles = 0
var wads = 0
var mps = 0
var cps = 1
if (data == null) {
	localStorage.gcData = [miles, mps, cps, wads, []]
	localStorage.gcData = gcData
	data = localStorage.gcData.split(",")
	console.log(data)
}
if (data.length < 5) {
	let temp = localStorage.gcData.split(",")
	data = []
	for (let i = 0; i < temp.length; i ++) {
	 data.push(temp[i])
	}
	console.log(data)
	
}

localStorage.gcData = data


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
