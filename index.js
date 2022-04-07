const express = require('express')
const { randomUUID } = require('crypto')
const fs = require('fs')

const port = 3000
const app = express()

app.use(express.json())

let orders = []

const orderFile = data => {
  fs.writeFile('orders.json', JSON.stringify(orders), err => {
    if (err) {
      return console.log(err)
    } else {
      console.log(data)
    }
  })
}

fs.readFile('orders.json', (error, data) => {
  if (error) {
    console.log(error)
  } else {
    orders = JSON.parse(data)
  }
})

app.post('/order', (req, res) => {
  const { clientName, order, price, status } = req.body
  let orderHamburger = {
    id: randomUUID(),
    clientName,
    order,
    price,
    status,
  }

  orders.push(orderHamburger)

  orderFile()

  res.status(201).json('Pedido realizado com sucesso!')
})

app.get('/orders', (req, res) => {
  res.status(200).json(orders)
})

app.get('/order/:id', (req, res) => {
  const { id } = req.params
  const order = orders.find(order => order.id === id)

  res.status(201).json(order)
})

app.put('/order/:id', (req, res) => {
  const { id } = req.params
  const { clientName, order, price } = req.body
  const orderIndex = orders.findIndex(order => order.id === id)

  orders[orderIndex] = {
    ...orders[orderIndex],
    clientName,
    order,
    price,
  }

  orderFile()

  res.status(201).json('Pedido atualizado com sucesso em preparação!')
})

app.patch('/order/:id', (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const orderIndex = orders.findIndex(order => order.id === id)

  orders[orderIndex] = {
    ...orders[orderIndex],
    status,
  }

  orderFile()

  res.status(201).json('Pedido pronto!')
})

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})
