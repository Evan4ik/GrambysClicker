//THE SMOOTH TASTE OF NEO!!
console.log("NEO")
var miles = 0
var mps = 0.01
var i = false
var milesCalc = 0
moneyCalc() 

function moneyCalc() {
  miles += mps
  setTimeout(() => {
    console.log(miles)
    moneyCalc()
  }, 1)
}
