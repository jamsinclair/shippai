const html = require('choo/html')
const Icon = require('../icon')

const StatusBox = (status) => html`
  <a href=${status.target_url} title=${status.context} class="box-status ${status.state}">
    ${Icon(status.state)}
  </a>
`
const StatusBoxOverall = (pr, combinedStatus) => {
  const hasStatuses = combinedStatus.statuses.length > 0

  return html`
    <a href="${pr.html_url}?#partial-pull-merging"
      title="Go to PR #${pr.number} Status Checks on GitHub"
      class="box-status box-status--overall ${ hasStatuses ? combinedStatus.state : 'neutral' }">
      ${ hasStatuses ? Icon(combinedStatus.state) : '' }
    </a>
  `
}

const StatusesList = (statuses) => {
  const NoStatusesBox = html`<div class="box-status box-status--none">No Statuses</div>`
  return statuses.length > 0 ? statuses.map(StatusBox) : NoStatusesBox
}

const BuildBox = (pr, combinedStatus) => html`<li class="box">
  <div class="box-header">
    ${StatusBoxOverall(pr, combinedStatus)}
    <div class="box-content">
      <a class="box-title" title="Go to PR #${pr.number} on GitHub" href=${pr.html_url}>
        #${pr.number} ${pr.title}
      </a>
      <div>
        ${pr.user.login}
      </div>
      <div>
        Commit: ${pr.head.sha.substring(0, 7)}
      </div>
    </div>
  </div>
  <div class="box-status-grid">
    <div class="box-status-grid-header">Statuses</div>
    ${StatusesList(combinedStatus.statuses)}
  </div>
</li>`

module.exports = BuildBox
