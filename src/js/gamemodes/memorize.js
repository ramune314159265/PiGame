import PIGameBase from './base.js'

export default class MemorizeMode extends PIGameBase {
    constructor(numericalSequence) {
        super(numericalSequence)

        this.UI.on('showed', () => {
            this.UI.keyboard.hideKeys(['Backspace', 'Enter'])

            this.UI.keyboard.addEventListener('keyboardPressed', e => {
                this.keyPressed(e.detail.key)
            })

            this.initDigit()
        })
    }
    keyPressed(key) {
        if (this.getDigitNumber() !== key) {
            return
        }
        this.UI.output.addToOutput(key)
        this.digit++
        this.initDigit()
    }
    initDigit() {
        this.UI.keyboard.getKeyElements().forEach(node => {
            node.classList.remove('correctHint', 'incorrect')

            node.classList.add((node.dataset.key === this.getDigitNumber()) ? 'correctHint' : 'incorrect')
        })

        this.UI.output.setComplement(this.numericalSequence.slice(this.digit, this.digit + 100))
    }
}