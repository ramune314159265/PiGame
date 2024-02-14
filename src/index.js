import './js/elements/index.js'
import { loaded } from './js/loaded.js'
import { init } from './js/init.js'

if (localStorage.getItem('ramune.pigame.config') === null) {
	init()
}

document.addEventListener('DOMContentLoaded', loaded)
