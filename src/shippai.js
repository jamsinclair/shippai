const choo = require('choo')
const css = require('sheetify')
const storage = require('./storage')
const model = require('./model').model
const homeView = require('./pages/home')
const buildsView = require('./pages/builds')
const api = require('./github-api')

const onStateChange = (action, state) => { storage.save(state) }
const app = choo({ href: true, history: true, onStateChange })

api.configure({ token: model.state.config.token })

app.model(model)

css('normalize.css')
css('./index.scss')

app.router(route => [
  route('/', homeView),
  route('/builds/:owner/:repo', buildsView)
])

const tree = app.start()
document.body.appendChild(tree)
