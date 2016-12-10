const html = require('choo/html')
const BuildBox = require('./box')
const css = require('sheetify')

const prefix = css('./list.scss')

const BuildBoxList = (pullRequests, statuses) => {
  const list = pullRequests.map(pr => {
    const status = statuses.size && statuses.get(pr.head.sha)
    return BuildBox(pr, status)
  })

  return html`<ul class=${prefix}>
    ${list}
  </ul>`
}

module.exports = BuildBoxList
