import PIGameBase from './base.js'

export default class MemorizeMode extends PIGameBase {
    constructor(option) {
        super(option)

        this.UI.on('showed', () => {
            this.UI.keyboard.hideKeys(['Backspace', 'Enter'])
            this.UI.status.disableHintButton()

            this.UI.keyboard.addEventListener('keyboardPressed', e => {
                this.keyPressed(e.detail.key)
            })

            this.UI.status.addEventListener('digitChanged', e => {
                this.initDigit(parseInt(e.detail.digit))
            })

            this.initDigit()
        })
    }
    keyPressed(key) {
        if (this.getDigitNumber() !== key) {
            return
        }
        this.digit++
        this.initDigit()
    }
    initDigit(digit = this.digit) {
        this.digit = digit
        this.UI.status.setNowDigitLength(this.digit)

        this.UI.keyboard.getKeyElements().forEach(node => {
            node.classList.remove('correctHint', 'incorrect')

            node.classList.add((node.dataset.key === this.getDigitNumber(digit)) ? 'correctHint' : 'incorrect')
        })

        this.UI.output.setOutput(this.numericalSequence.slice(0, digit))
        this.UI.output.setComplement(this.numericalSequence.slice(digit, digit + 100))
    }
}