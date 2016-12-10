const save = state => {
  state = Object.assign({}, state)
  state.errors = {}
  state.lastUpdatedLog = []
  state.isLoadingRepoData = false,
  state.pullRequestsCollection = []
  state.combinedStatusesCollection = []
  state.reposCollection = Array.from(state.reposCollection.entries())
  localStorage.setItem('state', JSON.stringify(state))
}

const get = () => {
  let value = localStorage.getItem('state')
  if (value === null) return value
  value = JSON.parse(value)
  value.errors = {}
  value.lastUpdatedLog = new Map(),
  value.pullRequestsCollection = new Map(),
  value.combinedStatusesCollection = new Map(),
  value.reposCollection = value.reposCollection.length ? new Map(value.reposCollection) : new Map()
  return value
}

module.exports = { save, get }
