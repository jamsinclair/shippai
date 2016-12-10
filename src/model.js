const storage = require('./storage')
const effects = require('./effects')
const reducers = require('./reducers')
const subscriptions = require('./subscriptions')

const initialState = () => {
  return {
    config: { completedSetup: false },
    errors: {},
    isLoadingRepoData: false,
    lastUpdatedLog: new Map(),
    pullRequestsCollection: new Map(),
    combinedStatusesCollection: new Map(),
    reposCollection: new Map()
  }
}

module.exports = {
  model: {
    state: storage.get() || initialState(),
    effects,
    reducers,
    subscriptions
  },
  initialState: initialState
}
