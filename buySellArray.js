const buyOrSell = document.querySelectorAll(".ord131DescLine2")
const buyOrSellArr = Array.from(buyOrSell)
const buyOrSellFiltered = buyOrSellArr.filter((x) => x.className === "ord131DescLine2 valign-wrapper")
const buyOrSellStr = []
for (let n = 0; n<buyOrSellFiltered.length; n++) {
    let tempVar = buyOrSellFiltered[n].children[0].innerHTML
    buyOrSellStr.push(tempVar)
}

//gives an array of buy/sell tags in the same order