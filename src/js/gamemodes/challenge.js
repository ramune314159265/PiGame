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

            return
        }

        switch (key) {
            case 'Backspace':
                this.UI.output.backspaceOutput()
                this.digit--
                break

            case 'Enter':
                break

            default:
                this.UI.output.addToOutput(key)
                this.digit++
                break
        }
    }
}