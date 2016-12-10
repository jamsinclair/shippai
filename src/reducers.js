const updatePullRequests = (data, state) => {
  const repoKey = `${data.owner}/${data.repo}`

  const newCollection = new Map().set(repoKey, data.pullRequests)
  const mergedCollection = new Map([...state.pullRequestsCollection, ...newCollection])

  const newLastUpdatedLog = new Map().set(repoKey, Date.now())
  const mergedUpdatedLog = new Map([...state.lastUpdatedLog, ...newLastUpdatedLog])

  return {
    pullRequestsCollection: mergedCollection,
    lastUpdatedLog: mergedUpdatedLog
  }
}

const updateCombinedStatuses = (data, state) => {
  const combinedStatuses = new Map()
  const repoKey = `${data.owner}/${data.repo}`

  data.statuses.forEach(combinedStatus => {
    combinedStatuses.set(combinedStatus.sha, combinedStatus)
  })

  const newCollection = new Map().set(repoKey, combinedStatuses)
  const mergedCollection = new Map([...state.combinedStatusesCollection, ...newCollection])

  const newLastUpdatedLog = new Map().set(repoKey, Date.now())
  const mergedUpdatedLog = new Map([...state.lastUpdatedLog, ...newLastUpdatedLog])

  return {
    combinedStatusesCollection: mergedCollection,
    lastUpdatedLog: mergedUpdatedLog
  }
}

const updateConfig = (config, state) => {
  return { config }
}

const addRepo = (data, state) => {
  const newCollection = new Map().set(`${data.owner}/${data.repo}`, data)
  const oldCollection = state.reposCollection
  const mergedCollection = new Map([...oldCollection, ...newCollection])
  return { reposCollection: mergedCollection }
}

const isLoadingRepoData = (boolean) => {
  return { isLoadingRepoData: boolean }
}

const updateErrors = (error, state) => {
  const errors = Object.assign({}, state.errors, error)
  return { errors }
}

const resetState = () => {
  const initialState = require('./model').initialState
  return initialState()
}

module.exports = {
  addRepo,
  isLoadingRepoData,
  updateErrors,
  updateCombinedStatuses,
  updateConfig,
  updatePullRequests,
  resetState
}
