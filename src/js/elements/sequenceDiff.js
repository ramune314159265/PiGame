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
		const isCorrectDigitArray = inputtedContent
			.split('')
			.map((digitContent, index) => digitContent === sequenceData.numericalSequence[index])

		this.inputtedSequenceElement.textContent = sequenceData.prefix

		isCorrectDigitArray.forEach((isCorrect, index) => {
			const element = document.createElement('span')
			element.textContent = inputtedContent[index]
			element.classList.add(isCorrect ? 'correct' : 'incorrect')
			this.inputtedSequenceElement.appendChild(element)
		})

		const correctSequenceElement = document.createElement('span')
		correctSequenceElement.textContent = sequenceData.prefix + sequenceData.numericalSequence.slice(0, inputtedContent.length)

		const correctSequenceComplementElement = document.createElement('span')
		correctSequenceComplementElement.textContent = sequenceData.numericalSequence.slice(inputtedContent.length, inputtedContent.length + 100)
		correctSequenceComplementElement.classList.add('notInputted')

		this.correctSequenceElement.append(correctSequenceElement, correctSequenceComplementElement)
	}
}
