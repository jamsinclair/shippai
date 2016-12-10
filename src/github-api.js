import GitHubLite from 'github-lite'

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    var error = new Error(res.statusText)
    error.response = res
    throw error
  }
}

let client = GitHubLite()

const configure = config => {
  client = GitHubLite(config)
}

const fetchPullRequests = (owner, repo) => {
  const query = {
    per_page: 15,
    sort: 'updated',
    direction: 'desc'
  }

  return client.PullRequests.list(owner, repo, query)
    .then(checkStatus)
    .then(res => res.json())
}

const getCombinedStatus = (owner, repo, ref) => {
  return client.Repositories.getCombinedStatus(owner, repo, ref)
    .then(checkStatus)
    .then(res => res.json())
}

module.exports = {
  configure,
  fetchPullRequests,
  getCombinedStatus
}
