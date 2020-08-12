// eslint-disable-next-line node/no-unsupported-features/es-syntax
export async function refreshShopList () {
  const res = await window.fetch('/api/shop')
  const { data: shopList } = await res.json()
  const htmlItems = shopList.map(({
    id, name
  }) =>
  `<li data-shop-id="${id}">
      <div data-type="text">${name}</div>
      <input type="text" placeholder="输入新的店铺名称" />
      <a href="#" data-type="modify">确认修改</a>
      <a href="#" data-type="remove">删除店铺</a>
    </li>`
  )
  document.querySelector('#root').innerHTML = `
    <h1>店铺列表</h1>
    <ul class="shop-list">${htmlItems.join('')}</ul>
  `
}
// eslint-disable-next-line node/no-unsupported-features/es-syntax
export async function bindShopInfoEvents () {
  document.querySelector('#root').addEventListener('click', async (e) => {
    e.preventDefault()
    switch (e.target.dataset.type) {
      case 'modify':
        await modifyShopInfo(e)
        break
      case 'remove':
        await removeShopInfo(e)
        break
    }
  })
}

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export async function modifyShopInfo (e) {
  const shopId = e.target.parentElement.dataset.shopId
  const name = e.target.parentElement.querySelector('input').value
  await window.fetch(`/api/shop/${shopId}?name=${encodeURIComponent(name)}`, {
    method: 'PUT'
  })
  await refreshShopList()
}

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export async function removeShopInfo (e) {
  const shopId = e.target.parentElement.dataset.shopId
  await window.fetch(`/api/shop/${shopId}`, { method: 'DELETE' })
  await refreshShopList()
}
