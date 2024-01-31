import PIGameBase from './base.js'

export default class PracticeMode extends PIGameBase {
    constructor(option) {
        super(option)
        this.correctHintTimerId = 0

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
        this.digit++
        this.initDigit()
    }
    initDigit(digit = this.digit) {
        this.UI.output.setOutput(this.numericalSequence.slice(0, digit))

        clearTimeout(this.correctHintTimerId)
        this.correctHintTimerId = setTimeout(() => this.showHint(), 5000)

        this.UI.keyboard.getKeyElements().forEach(node => {
            node.classList.remove('correct', 'correctHint', 'incorrect')
            node.classList.add((node.dataset.key === this.getDigitNumber(digit)) ? 'correct' : 'incorrect')

            this.UI.output.setComplement()
        })

        this.digit = digit
    }
    showHint() {
        this.UI.output.setComplement(this.getDigitNumber())
        this.UI.keyboard.getKeyElement(this.getDigitNumber()).classList.add('correctHint')
    }
}