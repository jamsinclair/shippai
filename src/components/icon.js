const html = require('choo/html')

const Icon = (type) => {
  const classes = ['icon']
  const iconIds = {
    error: '#icon-close',
    failure: '#icon-close',
    success: '#icon-check',
    pending: '#icon-circle-o-notch'
  }

  if (type === 'pending') {
    classes.push('icon-spin')
  }

  return html`<svg class=${classes.join(' ')}><use xlink:href=${iconIds[type]}></svg>`
}

module.exports = Icon
