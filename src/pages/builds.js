const html = require('choo/html')
const fecha = require('fecha')
const Root = require('../components/root')
const Loading = require('../components/loading')
const BuildBoxList = require('../components/build-box/list')
const css = require('sheetify')

css`
  .builds-header {
    margin-top: 0;
    margin-bottom: 15px;
  }
`

const BuildsView = (state, repoKey, pullRequests, statuses) => {
  const noPullRequests = html`<h3>No pull requests found.</h3>`

  return html`<div>
    <div>
      <h1 class="builds-header">
        <a href="https://github.com/${repoKey}">${repoKey}</a>
      </h1>
      <a href="/">\u2190 Back to dashboard</a>
      <p>List last updated: ${ fecha.format(new Date(state.lastUpdatedLog.get(repoKey)), 'HH:mma D MMM YYYY') }</p>
    </div>
    ${pullRequests.length ? BuildBoxList(pullRequests, statuses) : noPullRequests}
  </div>`
}

const Builds = (state, prev, send) => {
  const {
    pullRequestsCollection,
    combinedStatusesCollection,
    isLoadingRepoData,
    lastUpdatedLog,
    errors,
    params
  } = state

  const repoKey = `${params.owner}/${params.repo}`
  const pullRequests = pullRequestsCollection.get(repoKey)
  const statuses = combinedStatusesCollection.get(repoKey)

  if (errors[repoKey]) {
    return ErrorView(errors[repoKey])
  }

  const shouldFetchPullRequests = () => {
    const timeFiveMinutesAgo = Date.now() - (60 * 5 * 1000)
    const updatedInLastFiveMinutes = lastUpdatedLog.get(repoKey) && lastUpdatedLog.get(repoKey) > timeFiveMinutesAgo

    return (!pullRequests || !updatedInLastFiveMinutes) && !isLoadingRepoData
  }

  if (shouldFetchPullRequests()) {
    send('isLoadingRepoData', true)
    send('fetchPullRequests', params)
    return LoadingView(send)
  }

  if (isLoadingRepoData) {
    return LoadingView(send)
  }

  return Root(send, BuildsView(state, repoKey, pullRequests, statuses))
}

const LoadingView = (send) => {
  return Root(send, Loading())
}

const ErrorView = (error) => {
  return Root(send, error.toString())
}

module.exports = Builds
