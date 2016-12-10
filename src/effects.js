const api = require('./github-api')
const utils = require('./utils')

const fetchPullRequests = (data, state, send, done) => {
  const { owner, repo } = data
  api.fetchPullRequests(owner, repo)
    .then(pullRequests => send('updatePullRequests', { owner, repo, pullRequests }, () => {
      send('getCombinedStatuses', data, done)
    }))
    .catch(error => {
      const errorObj = {}
      errorObj[`${owner}/${repo}`] = error
      send('updateErrors', errorObj, done)
    })
}

const getCombinedStatuses = (data, state, send, done) => {
  const { owner, repo } = data
  const pullRequests = state.pullRequestsCollection.get(`${owner}/${repo}`)

  Promise.all(pullRequests.map(pr => {
      return api.getCombinedStatus(owner, repo, pr.head.sha)
    }))
    .then(statuses => {
      send('updateCombinedStatuses', { owner, repo, statuses }, () => {
        send('isLoadingRepoData', false, done)
      })
    })
    .catch(error => {
      const errorObj = {}
      errorObj[`${owner}/${repo}`] = error
      send('updateErrors', errorObj, done)
    })
}

const updatePullRequestsForCurrentPage = (data, state, send, done) => {
  const { isLoadingRepoData, location } = state
  const { owner, repo } = utils.getOwnerAndRepoFromLocation(location.pathname)

  console.log('polling for new prs')

  if (!isLoadingRepoData && owner && repo) {
    console.log('getting new prs')
    return send('fetchPullRequests', { owner, repo }, done)
  }
  console.log('no retrieval of prs')
  done()
}

const updateStatusesForCurrentPage = (data, state, send, done) => {
  const { isLoadingRepoData, location, pullRequestsCollection } = state
  const { owner, repo } = utils.getOwnerAndRepoFromLocation(location.pathname)
  const pullRequests = pullRequestsCollection.get(`${owner}/${repo}`)
  const hasPullRequests = pullRequests instanceof Array && pullRequests.length

  console.log('polling for new statuses')

  if (!isLoadingRepoData && hasPullRequests) {
    console.log('getting new Statuses')
    return send('getCombinedStatuses', { owner, repo }, done)
  }
  console.log('no retrieval of statuses')
  done()
}

const handleAddRepoForm = (data, state, send, done) => {
  if (!data.owner || !data.repo) {
    send('updateErrors', { addRepoFormError: true }, done)
    return
  }

  api.fetchPullRequests(data.owner, data.repo)
    .then(() => send('addRepo', data, () => {
      send('updateErrors', { addRepoFormError: false }, done)
    }))
    .catch(() => send('updateErrors', { addRepoFormError: true }, done))
}

const handleSetupForm = (config, state, send, done) => {
  const token = config.token
  api.configure({ token })
  send('updateConfig', config, done)
}

module.exports = {
  fetchPullRequests,
  getCombinedStatuses,
  handleAddRepoForm,
  handleSetupForm,
  updatePullRequestsForCurrentPage,
  updateStatusesForCurrentPage
}
