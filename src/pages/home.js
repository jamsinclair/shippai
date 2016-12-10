const root = require('../components/root')
const repoBoxList = require('../components/repo-box/list')
const setupForm = require('../components/setup-form')

const Home = (state, prev, send) => {
  const HomeView = state.config.completedSetup ? repoBoxList(state, send) : setupForm(state, send)

  return root(send, HomeView)
}

module.exports = Home
