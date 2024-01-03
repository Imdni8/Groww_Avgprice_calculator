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


//this needs to account for sells as well
let totalPrice = 0
let totalShares = 0

for (let i = 0; i < price.length; i++) {
    totalPrice += price[i] * qty[i]
}

for (let el of qty) {
    totalShares += el
}

console.log(`total price of all shares: ${totalPrice} | total shares: ${totalShares} | Avg price of all shares: ${(totalPrice/totalShares)}`)