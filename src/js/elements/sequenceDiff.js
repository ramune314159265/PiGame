export default class SequenceDiffElement extends HTMLElement {
	constructor() {
		super()
	}
	#set() {
		this.appendChild(document.querySelector('#sequenceDiff').content.cloneNode(true))
		this.inputtedSequenceElement = this.querySelector('.userInputSequence .sequence')
		this.correctSequenceElement = this.querySelector('.correctSequence .sequence')
	}
	connectedCallback() {
		this.#set()
	}
	setOutput({
		inputtedContent,
		sequenceData
	}) {
		this.inputtedSequenceElement.textContent = sequenceData.prefix + inputtedContent
		const correctSequenceToShow = sequenceData.numericalSequence.slice(0, inputtedContent.length + 100)

		const digitStatuses = correctSequenceToShow.split('').map((digitContent, index) => {
			switch (true) {
				case digitContent === inputtedContent[index]:
					return 'correct'

				case inputtedContent[index] === undefined:
					return 'notInputted'

				case digitContent !== inputtedContent[index]:
					return 'incorrect'

				default:
					break
			}
			digitContent === correctSequenceToShow[index]
		})

		this.correctSequenceElement.textContent = sequenceData.prefix

		digitStatuses.forEach((digitStatus, index) => {
			const element = document.createElement('span')
			element.textContent = correctSequenceToShow[index]
			element.classList.add(digitStatus)
			this.correctSequenceElement.appendChild(element)
		})
	}
}
