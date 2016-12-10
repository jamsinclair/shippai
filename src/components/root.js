const html = require('choo/html')
const css = require('sheetify')
const Icons = require('./icon-definitions')

const prefix = css('./root.scss')
const IconsWrapper = html`<div class="svg-wrapper"></div>`
IconsWrapper.innerHTML = Icons

const Root = (send, content) => {
  return html`<main>
    ${IconsWrapper}
    <nav class=${prefix}>
      <a href="/" class="nav-item">
        <h1 class="title">
          Shippai
        </h1>
        <div class="logo">
          失敗
        </div>
      </a>
      <a href="/" onclick=${(e) => send('resetState')} class="nav-item nav-item--right">Reset Data</a>
    </nav>
    <section class="section">
      <div class="container">
        ${content}
      </div>
    </section>
  </main>`
}

module.exports = Root
