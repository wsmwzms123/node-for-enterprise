// eslint-disable-next-line node/no-unsupported-features/es-syntax
import './moulds/yup.js'
window.require = k => window[k]
window.exports = window.moulds = {}
