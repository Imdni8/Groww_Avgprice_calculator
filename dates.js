const dates = document.querySelectorAll(".ord131DateStyle")
const datesArr = Array.from(dates)
const dateStrings = datesArr.map((x) => x.innerText)

//input stock split details
const stockSplitDate = "03 Dec 2021"
const stockSplitMultiple = 3

//calculating split adjusted prices and 