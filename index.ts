class Stock {
    id: string
    prices: Record<string, number>

    public price = (date: Date): number => {
        const formattedDate = date.toISOString().split('T')[0]
        return this.prices[formattedDate]
    }
}

class Portfolio {
    stocks: Stock[] = []

    public addStock = (stock: Stock) => {
        this.stocks.push(stock)
    }

    public profit = ({startDate, endDate }: {startDate: Date, endDate: Date}): number => {
        let initialTotalValue = 0
        let finalTotalValue = 0

        this.stocks.forEach((stock) => {
            initialTotalValue += stock.price(startDate)
            finalTotalValue += stock.price(endDate)
        })

        // Uncomment next line to return the profit
        // return initialTotalValue ? finalTotalValue - initialTotalValue : 0

        const daysBetweenDates = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        const annualizedReturn = initialTotalValue ? (finalTotalValue / initialTotalValue) ** (365 / daysBetweenDates) - 1 : 0

        return annualizedReturn
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

const startDate = new Date("2024-05-01")
const endDate = new Date("2024-07-01")
const annualizedReturn = portfolio.profit({
    startDate,
    endDate
})

console.log(annualizedReturn)
