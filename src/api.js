const products = [
  { id: 1, title: '🩱 Bañador una sola pieza', price: 15 },
  { id: 2, title: '👔 Camisa y corbata', price: 45 },
  { id: 3, title: '👙 Bikini', price: 25 },
  { id: 4, title: '🩳 Pantalones cortos', price: 10 },
]

function orderByASC(a, b) {
  return a.price - b.price
}

function orderByDESC(a, b) {
  return b.price - a.price
}

export function fetchProducts(order = 'ASC') {
  const shouldThrow = Math.random() * 11 < 3
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldThrow) {
        reject(new Error('ERROR !!'))
      } else {
        const orderByFn = order === 'ASC' ? orderByASC : orderByDESC
        resolve(products.sort(orderByFn))
      }
    }, 300)
  })
}
