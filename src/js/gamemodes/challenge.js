import PIGameBase from './base.js'

export default class ChallengeMode extends PIGameBase {
    constructor(option) {
        super(option)
        this.inputtedContent = ''

        this.UI.on('showed', () => {
            this.UI.status.disableDigitInput()

            this.UI.keyboard.addEventListener('keyboardPressed', e => {
                this.keyPressed(e.detail.key)
            })

            this.initDigit()
        })
    }
    keyPressed(key) {
        switch (key) {
            case 'Backspace':
                this.backSpace()
                break

            case 'Enter':
                break

            default:
                this.inputtedContent += key
                this.digit++
                this.initDigit()
                break
        }
    }
    backSpace() {
        if (this.digit <= 0) {
            return
        }
        this.inputtedContent = this.inputtedContent.slice(0, this.inputtedContent.length - 1)
        this.digit--
        this.initDigit()
    }
    initDigit(digit = this.digit) {
        this.digit = digit
        this.UI.status.setNowDigitLength(this.digit)

        this.UI.output.setOutput(this.inputtedContent)
    }
}