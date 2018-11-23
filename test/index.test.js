import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

// Nuxt への参照を保持します
// そうすればテスト終了時にサーバーをクローズできます
let nuxt = null

// Nuxt.js を初期化し localhost:4000 のリスニングを開始します
test.before('Init Nuxt.js', async () => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (e) {
    console.log(e)
  }
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  config.mode = 'universal' // Isomorphic application
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// 生成された HTML のみをテストする例
test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="title">nuxt-circle-ci-demo</h1>'))
})

// DOM チェックを経由してテストする例
test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('h1')
  t.not(element, null)
  t.is(element.textContent, 'nuxt-circle-ci-demo')
  t.is(element.className, 'title')
  t.is(window.getComputedStyle(element).fontSize, '100px')
})

// Nuxt サーバーをクローズする
test.after('Closing server', () => {
  nuxt.close()
})
