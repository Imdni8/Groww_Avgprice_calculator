//rules
//one transaction per date
//one stock split only
//ie, it'll produce wrong results if you use it when there have been more than one transactions in a day

//produces array of prices and quantities
let allData = document.querySelectorAll(".ord131DescLine1")
allData = Array.from(allData)
let pricesAndQty = allData.filter((x) => x.className === "ord131DescLine1")
let pricesAndQtyinStr = pricesAndQty.map((x) => x.innerText)

let qty = []
let price = []

for (let n = 0; n<pricesAndQtyinStr.length; n++) {
    if (n%2 === 0) {
        qty.push(parseInt(pricesAndQtyinStr[n]))
    }
    else {
        let priceStr = [...pricesAndQtyinStr[n]]
        priceStr.shift()
        let joinedPrice = priceStr.join('')
        price.push(parseInt(joinedPrice))
    }
}

console.log("Price array: " + price)
console.log("Quantity array: " + qty)

//produces an array of buy/sell tags in the same order
const buyOrSellData = document.querySelectorAll(".ord131DescLine2")
const buyOrSellArr = Array.from(buyOrSellData)
const buyOrSellFiltered = buyOrSellArr.filter((x) => x.className === "ord131DescLine2 valign-wrapper")
const buyOrSellTags = []
for (let n = 0; n<buyOrSellFiltered.length; n++) {
    let tempVar = buyOrSellFiltered[n].children[0].innerHTML
    buyOrSellTags.push(tempVar)
}

console.log("Buy/sell array: " + buyOrSellTags)

//calculating prices for both buy and sell orders
const buyAmtArr = [] //
for (let i = 0; i < price.length && qty.length; i++) {
    if (buyOrSellTags[i] === 'Buy') {
        buyAmtArr.push(price[i] * qty[i])
    }
}

console.log("Transactions: " + buyAmtArr)

//finding net buy amount
let netBuyPrice = 0
for (let i = 0; i < buyAmtArr.length; i++) {
    netBuyPrice += buyAmtArr[i]
}

console.log("Net buy price: " + netBuyPrice)

//account for stock split becaue it affects share quantity
const dates = document.querySelectorAll(".ord131DateStyle")
const datesArr = Array.from(dates)
const dateStrings = datesArr.map((x) => x.innerText)
const datesinJS = dateStrings.map((x) => new Date(x))

const stockSplitDate = new Date(prompt("Date of stock split in the format of - 'DD Mon YYYY'. Example, '21 Feb 1995'. Press OK if no split event.", new Date().toDateString()))
let stockSplitMultiple = 1
if (stockSplitDate !== new Date()) {
    stockSplitMultiple = parseInt(prompt("Enter split ratio as an integer", 1))
}
console.log(stockSplitDate, stockSplitMultiple)

const splitAdjustedQty = []
for (let n = 0; n < datesinJS.length && qty.length; n++) {
    if (stockSplitDate > datesinJS[n]) {
        splitAdjustedQty.push(qty[n]*stockSplitMultiple)
    } else {
        splitAdjustedQty.push(qty[n])
    }
}

//finding total number of shares currently in the demat account
let totalShares = 0
for (let i = 0; i < splitAdjustedQty.length && buyOrSellTags.length; i++) {
    if (buyOrSellTags[i] === 'Buy') {
        totalShares += splitAdjustedQty[i]
    } else {
        totalShares -= splitAdjustedQty[i]
    }
}

console.log("Total shares: " + totalShares)

//conclusion
console.log(`Net Avg buy price of all shares: ${(netBuyPrice/totalShares)}`)