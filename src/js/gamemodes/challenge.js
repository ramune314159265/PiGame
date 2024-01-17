import PIGameBase from './base.js'

export default class ChallengeMode extends PIGameBase {
    constructor(option) {
        super(option)

        this.UI.on('showed', () => {
            this.UI.keyboard.addEventListener('keyboardPressed', e => {
                this.keyPressed(e.detail.key)
            })
        })
    }
    keyPressed(key) {
        switch (key) {
            case 'Backspace':
                this.UI.output.backspace()
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