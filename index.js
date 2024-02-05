import './src/js/elements/index.js'
import { loaded } from './src/js/loaded.js'
import { init } from './src/js/init.js'

if (localStorage.getItem('ramune.pigame.config') === null) {
    init()
}

document.addEventListener('DOMContentLoaded', loaded)
