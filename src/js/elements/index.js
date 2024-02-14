import KeyboardElement from './keyboard.js'
import OutputElement from './output.js'
import MathTexElement from './mathtex.js'
import StatusElement from './status.js'

customElements.define("numeric-keyboard", KeyboardElement)
customElements.define("numeric-output", OutputElement)
customElements.define("math-tex", MathTexElement)
customElements.define("game-status", StatusElement)