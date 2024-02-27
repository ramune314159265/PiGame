import PIGameBase from './base.js'
import PracticeResultUI from '../UI/practiceResult.js'

export default class PracticeMode extends PIGameBase {
	constructor(option, digit = 0) {
		super(option)
		this.digit = digit
		this.correctHintTimerId = 0

		this.UI.on('showed', () => {
			this.UI.keyboard.hideKeys(['Backspace'])
			this.UI.status.addEventListener('digitChanged', e => {
				this.initDigit(e.detail.digit)
			})
			this.UI.status.addEventListener('hintClicked', () => {
				this.showHint()
			})
		})
	}
	enterPressed() {
		this.UI.hide()

		const resultOutputElement = document.createElement('numeric-output')

		const resultUI = new PracticeResultUI()
		resultUI.on('showed', () => {
			resultOutputElement.setPrefix(this.sequenceData.prefix)
			resultOutputElement.setOutput(this.sequenceData.numericalSequence.slice(0, this.digit))
			resultOutputElement.setComplement(this.sequenceData.numericalSequence.slice(this.digit, this.digit + 100))
		})
		resultUI.show({
			inputResultElement: resultOutputElement,
			digit: this.digit,
			sequenceData: this.sequenceData
		})
	}
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
		this.UI.status.enableHintButton()
		this.UI.status.setNowDigitLength(this.digit)

		this.UI.output.setOutput(this.sequenceData.numericalSequence.slice(0, digit))

		clearTimeout(this.correctHintTimerId)
		this.correctHintTimerId = setTimeout(() => this.showHint(), 5000)

		this.UI.keyboard.getKeyElements().forEach(node => {
			node.classList.remove('correct', 'correctHint', 'incorrect')
			node.classList.add((node.dataset.key === this.getDigitNumber(digit)) ? 'correct' : 'incorrect')

			this.UI.output.setComplement()
		})
	}
	showHint() {
		clearTimeout(this.correctHintTimerId)

		this.UI.status.disableHintButton()
		this.UI.output.setComplement(this.getDigitNumber())
		this.UI.keyboard.getKeyElement(this.getDigitNumber()).classList.add('correctHint')
	}
}
