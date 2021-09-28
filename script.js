var data = localStorage.gcData
var miles = 0
var mps = 0
if (data == null) {
	localStorage.gcData = [miles, mps]
	localStorage.gcData = CompressBin(localStorage.gcData)
	data = localStorage.gcData.split(",")
	console.log(data)
}

data = [0, 0]
localStorage.gcData = data


function moneyCalc() {
  miles += mps
  setTimeout (() => {
    moneyCalc()
  }, 1)
}
function clicked() {
 miles += 1
 document.getElementById("miles").innerHTML = miles
}
function CompressBin(arr)//compress a sequence like [0,1,1,0,1,0]... into a number like 54.
{
	var str='';
	console.log(arr)
	var arr2=arr.slice(0);
	console.log(arr2)
	arr2.unshift(1);
	arr2.push(1);
	arr2.reverse();
	for (var i in arr2)
	{
		str+=arr2[i];
	}
	str=parseInt(str,2);
	return str;
}

function wipeSave() {
	console.log("Yo")
	localStorage.gcData = null
	gcData = localStorage.gcData
	window.location.reload();
}
