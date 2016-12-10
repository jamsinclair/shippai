const html = require('choo/html')
const errorMsg = 'The repo could not be found or you don\'t have access.'

const addRepoAction = (e, send) => {
  e.preventDefault()
  const form = e.target.form
  send('handleAddRepoForm', { owner: form[0].value, repo: form[1].value })
}

const AddRepoBox = (state, send) => {
  const formMessage = state.errors.addRepoFormError ? errorMsg : ''
  return html`<li class="repo-box">
  <div class="repo-box-form">
    <form>
      <div class="repo-box-form-error">
        ${formMessage}
      </div>
      <input placeholder="Repo owner" type="text" />
      <input placeholder="Repo name" type="text" />
      <button
        onclick=${(e) => addRepoAction(e, send)}>
        Add Repository
        </button>
    </form>
  </div>
</li>`
}

module.exports = AddRepoBox
