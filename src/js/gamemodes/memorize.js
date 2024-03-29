import PIGameBase from './base.js'

export default class MemorizeMode extends PIGameBase {
	constructor(option, digit = 0) {
		super(option)
		this.digit = digit

		this.UI.on('showed', () => {
			this.UI.keyboard.hideKeys(['Backspace', 'Enter'])
			this.UI.status.disableHintButton()
			this.UI.status.addEventListener('digitChanged', e => {
				this.initDigit(parseInt(e.detail.digit))
			})
		})
	}
	enterPressed() { }
	backSpacePressed() { }
	numKeyPressed(key) {
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

		this.UI.output.setOutput(this.sequenceData.numericalSequence.slice(0, digit))
		this.UI.output.setComplement(this.sequenceData.numericalSequence.slice(digit, digit + 100))
	}
}
