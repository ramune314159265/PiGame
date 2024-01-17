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
        this.UI.output.addToOutput(key)
        this.digit++
        this.initDigit()
    }
    initDigit() {
        this.UI.keyboard.getKeyElements().forEach(node => {
            node.classList.remove('correct', 'correctHint', 'incorrect')
            node.classList.add((node.dataset.key === this.getDigitNumber()) ? 'correct' : 'incorrect')

            this.UI.output.setComplement()
        })

        clearTimeout(this.correctHintTimerId)
        this.correctHintTimerId = setTimeout(() => {
            this.UI.output.setComplement(this.getDigitNumber())
            this.UI.keyboard.getKeyElement(this.getDigitNumber()).classList.add('correctHint')
        }, 5000)
    }
}