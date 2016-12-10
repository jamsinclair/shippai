const html = require('choo/html')
const css = require('sheetify')

const prefix = css`
  @import "../styles/_colours";

  :host {
    max-width: 450px;
    padding: 20px;
    margin: 0 auto;
    text-align: center;

    input {
      text-align: center;
    }

    .warning-text {
      font-size: 0.8rem;
      color: $bad;
    }
  }
`

const setupFormAction = (e, send) => {
  e.preventDefault()
  const token = e.target.form[0].value
  send('handleSetupForm', { token, completedSetup: true })
}

const SetupForm = (state, send) => html`<div class=${prefix}>
  <h1>Let's get started.</h1>
  <p>
    Shippai allows you to visualise GitHub commit status checks for PRs.
  </p>
  <p>
    You can add the repositories you desire and keep up to date with your PR checks.
  </p>

  <h3>Want to view builds for your private repos?</h3>
  <p>Create a
    <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">
      GitHub Personal access token
    </a>
    and enter\u00A0below
  </p>
  <form>
    <label>
      <input placeholder="Your Personal Token" />
    </label>
    <p class="warning-text">Warning, your Personal Token will be persisted in Local Storage.</p>
    <p class="warning-text">Click Reset Data at the top right at any point to clear your token and all\u00A0data.</p>
    <button onclick=${(e) => setupFormAction(e, send)}>Proceed to Dashboard</button>
  </form>
</div>`

module.exports = SetupForm
