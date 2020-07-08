const products = [
  { id: 1, title: '🩱 Bañador una sola pieza', price: 15 },
  { id: 2, title: '👔 Camisa y corbata', price: 45 },
  { id: 3, title: '👙 Bikini', price: 25 },
  { id: 4, title: '🩳 Pantalones cortos', price: 10 },
]

function orderASC(a, b) {
  return a.price - b.price
}

function orderDESC(a, b) {
  return b.price - a.price
}

export function fetchProducts(order) {
  console.count('Fetch Products Request')

  // const shouldThrow = Math.random() * 11 < 2
  const shouldThrow = false

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldThrow) {
        reject(new Error('error fetching the products !!'))
      } else {
        const orderFn = order === 'ASC' ? orderASC : orderDESC
        resolve(products.sort(orderFn))
      }
    }, 300)
  })
}
