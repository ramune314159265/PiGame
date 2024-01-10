import PIGameBase from './base.js'

export default class ChallengeMode extends PIGameBase {
    constructor(numericalSequence) {
        super(numericalSequence)

        this.UI.on('showed', () => {
            this.UI.keyboard.addEventListener('keyboardPressed', e => {
                this.keyPressed(e.detail.key)
            })
        })
    }
    keyPressed(key) {
        if (key === 'Backspace') {
            this.UI.output.backspaceOutput()
            this.digit--
            return
        }
        this.UI.output.addToOutput(key)
        this.digit++
    }
}