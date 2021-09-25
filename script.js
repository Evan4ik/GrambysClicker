//THE SMOOTH TASTE OF NEO!!
console.log("NEO")
var money = 0
var mps = 5
var i = false
var moneyCalc = 0
function moneyCalc() {
  money += mps
  setTimeout(() => {
    moneyCalc()
  }, 1)
  if (!i) {
    i = true
    setTimeout(() => {
       moneyCalc = money
       i = false
       console.log(moneyCalc)
    }, 1000)
  }
}
