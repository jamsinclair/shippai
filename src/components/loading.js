const html = require('choo/html')
const css = require('sheetify')

css('./loading.scss')

const Loading = () => html`<div>
  <div class="sk-wave">
    <div class="sk-rect sk-rect1"></div>
    <div class="sk-rect sk-rect2"></div>
    <div class="sk-rect sk-rect3"></div>
    <div class="sk-rect sk-rect4"></div>
    <div class="sk-rect sk-rect5"></div>
  </div>
  <div class="loading-text">
    Loading...
  </div>
</div>`

module.exports = Loading
