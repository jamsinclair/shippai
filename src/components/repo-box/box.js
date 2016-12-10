const html = require('choo/html')

const RepoBox = (repo) => {
  const repoLocation = `${repo.owner}/${repo.repo}`
  const buildsUrl = `/builds/${repoLocation}`

  return html`<li class="repo-box">
    <a class="repo-box-action" href=${buildsUrl}>
      ${repoLocation}
    </a>
  </li>`
}

module.exports = RepoBox
