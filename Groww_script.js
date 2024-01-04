//Rules for using
//no stock split

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
        let comma = priceStr.indexOf(",")
        if (comma === 1) {
            priceStr.splice(comma, 1)
        }
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

//calculating prices for buy orders
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