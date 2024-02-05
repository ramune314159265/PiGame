import PIGameBase from './base.js'

export default class ChallengeMode extends PIGameBase {
    constructor(option) {
        super(option)
        this.inputtedContent = ''
        this.startTimeStamp = 0

        this.UI.on('showed', () => {
            this.UI.status.disableDigitInput()
            this.UI.status.disableHintButton()

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
                this.numKeyPressed(key)
                break
        }
    }
    numKeyPressed(key) {
        this.inputtedContent += key
        this.digit++
        this.initDigit()

        if (this.startTimeStamp === 0) {
            this.timerStart()
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
    timerStart() {
        this.startTimeStamp = Date.now()
        this.timerHandle()
        const interbalId = setInterval(() => this.timerHandle(), 1000)

        this.UI.on('closeClicked', () => {
            clearInterval(interbalId)
        })
    }
    timerHandle() {
        const diffSecond = Math.round((Date.now() - this.startTimeStamp) / 1000)
        this.UI.status.setTime(diffSecond)
    }
}