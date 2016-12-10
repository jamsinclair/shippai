const html = require('choo/html')
const AddRepoBox = require('./add')
const RepoBox = require('./box')
const css = require('sheetify')

const prefix = css('./list.scss')

const RepoBoxList = (state, send) => {
  const list = []

  if (state.reposCollection.size > 0) {
    state.reposCollection.forEach(repo => list.push(RepoBox(repo)))
  }

  list.push(AddRepoBox(state, send))

  return html`<ul class=${prefix}>
    ${list}
  </ul>`
}

module.exports = RepoBoxList
