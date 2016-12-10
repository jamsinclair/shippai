const getOwnerAndRepoFromLocation = (locationPath) => {
  const locationMap = locationPath.split('/')
  const params = {}

  if (locationMap[3] === 'builds') {
    params.owner = locationMap[4]
    params.repo = locationMap[5]
  }

  return params
}

module.exports = {
  getOwnerAndRepoFromLocation
}
