const pollStatusesForCurrentPage = (send, done) => {
  const offsetTiming = 1000 * 60 * 1.5
  const pollFrequency = 1000 * 60 * 3

  setTimeout(() => {
    send('updateStatusesForCurrentPage', null, done)

    setInterval(() => {
      send('updateStatusesForCurrentPage', null, done)
    }, pollFrequency)
  }, offsetTiming)
}

const pollPullRequestsForCurrentPage = (send, done) => {
  const frequency = 1000 * 60 * 3

  setInterval(() => {
    send('updatePullRequestsForCurrentPage', null, done)
  }, frequency)
}

module.exports = [
  pollStatusesForCurrentPage,
  pollPullRequestsForCurrentPage
]
