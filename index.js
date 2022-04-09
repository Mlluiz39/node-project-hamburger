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

const checksForId = (req, res, next) => {
  const { id } = req.params
  const findIndex = orders.findIndex(order => order.id === id)
  const findOrder = orders.find(order => order.id === id)

  if (findIndex < 0 || findOrder < 0) {
    res.status(404).json({ error: 'User not found!' })
  } else {
    req.index = findIndex
    req.order = findOrder
  }

  next()
}

const requestMethodsWithUrl = (req, res, next) => {
  console.log(`[${req.method}]-${req.url}`)
  next()
}

app.post('/order', requestMethodsWithUrl, (req, res) => {
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

app.get('/orders', requestMethodsWithUrl, (req, res) => {
  res.status(200).json(orders)
})

app.get('/order/:id', checksForId, requestMethodsWithUrl, (req, res) => {
  const order = req.order

  res.status(201).json(order)
})

app.put('/order/:id', checksForId, requestMethodsWithUrl, (req, res) => {
  const index = req.index
  const { clientName, order, price } = req.body

  orders[index] = {
    ...orders[index],
    clientName,
    order,
    price,
  }

  orderFile()

  res.status(201).json('Pedido atualizado com sucesso em preparação!')
})

app.patch('/order/:id', checksForId, requestMethodsWithUrl, (req, res) => {
  const { status } = req.body

  const index = req.index

  orders[index] = {
    ...orders[index],
    status,
  }

  orderFile()

  res.status(201).json('Pedido pronto!')
})

app.delete('/order/:id', checksForId, requestMethodsWithUrl, (req, res) => {
  const index = req.index

  orders.splice(index, 1)

  res.json('Pedido excluído!')
})

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})
