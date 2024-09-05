class Stock {
    "id": string
    "prices": Record<string,number>

    public price = (date: Date): number => {
        const dateFormatted = date.toISOString().split('T')[0]
        return this.prices[dateFormatted]
    }
}

class Portfolio {
    stocks: Stock[] = []

    public addStock = (stock: Stock) => {
        this.stocks.push(stock)
    }

    public annualizedReturn = ({initialDate, dueDate }: {initialDate: Date, dueDate: Date}): number => {
        var initialPrices = 0
        var finalPrices = 0

        this.stocks.forEach((stock) => {
            initialPrices += stock.price(initialDate)
            finalPrices += stock.price(dueDate)
        })

        // do not comment next line to return the profit
        // return initialPrices ? finalPrices - initialPrices : 0
       
        const differenceInDays = (dueDate.getTime() - initialDate.getTime())/ (1000 * 60 * 60 * 24)
        const annualizedReturn = (finalPrices/initialPrices) ** (365/differenceInDays) - 1

        return initialPrices ? annualizedReturn : 0
    }
}

const portfolio = new Portfolio()

const stockA = new Stock()
stockA.id = "idA"
stockA.prices = {
    "2024-04-01": 150,
    "2024-05-01": 200,
    "2024-06-01": 300,
    "2024-07-01": 400
}
portfolio.addStock(stockA)

const stockB = new Stock()
stockB.id = "idB"
stockB.prices = {
    "2024-04-01": 10,
    "2024-05-01": 15,
    "2024-06-01": 200,
    "2024-07-01": 150
}
portfolio.addStock(stockB)

const initialDate = new Date("2024-05-01")
const dueDate = new Date("2024-07-01")
const annualizedReturn = portfolio.annualizedReturn({
    initialDate,
    dueDate
})

console.log(annualizedReturn)