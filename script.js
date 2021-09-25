//THE SMOOTH TASTE OF NEO!!
console.log("NEO")
var data = localStorage.gcData
var miles = 0
var mps = 0.01
var i = false
if (data == null) {
	localStorage.gcData = [miles, mps]
	localStorage.gcData = CompressBin(localStorage.gcData)
	data = localStorage.gcData.split(",")
	console.log(data)
}
data = [0, 0.1]
localStorage.gcData = CompressBin(data)
data = localStorage.gcData
console.log(data)
localStorage.gcData = UncompressBin(data)
data = localStorage.gcData
console.log(data)
moneyCalc() 

function moneyCalc() {
  miles += mps
  setTimeout (() => {
    moneyCalc()
  }, 1)
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

function UncompressBin(num)//uncompress a number like 54 to a sequence like [0,1,1,0,1,0].
{
	var arr=num.toString(2);
	console.log(arr)
	console.log(num)
	arr=arr.split('');
	arr.reverse();
	console.log(arr)
	arr.shift();
	console.log(arr)
	arr.pop();
	console.log(arr)
	return arr;
}
