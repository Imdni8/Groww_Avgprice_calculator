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
const transactionAmtArr = [] //
for (let i = 0; i < price.length; i++) {
    transactionAmtArr.push(price[i] * qty[i])
}

console.log("Transactions: " + transactionAmtArr)

//finding net buy amount
let netBuyPrice = 0
for (let i = 0; i < transactionAmtArr.length && buyOrSellTags.length; i++) {
    if (buyOrSellTags[i] === 'Buy') {
        netBuyPrice += price[i] * qty[i]
    } else {
        netBuyPrice -= price[i] * qty[i]
    }
}

console.log("Net buy price: " + netBuyPrice)

//finding total number of shares currently in the demat account
let totalShares = 0
for (let i = 0; i < qty.length && buyOrSellTags.length; i++) {
    if (buyOrSellTags[i] === 'Buy') {
        totalShares += qty[i]
    } else {
        totalShares -= qty[i]
    }
}

console.log("Total shares: " + totalShares)

//conclusion
console.log(`Net Avg buy price of all shares: ${(netBuyPrice/totalShares)}`)