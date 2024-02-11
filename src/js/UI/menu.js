import { MemorizeMode, PracticeMode, ChallengeMode } from '../gamemodes/index.js'
import { getConfig } from '../util/config.js'

export default class MainMenu {
	constructor() {
		this.component = document.createElement('div')
		this.component.classList.add('main')
		this.component.appendChild(document.querySelector('#mainMenuUI').content.cloneNode(true))
	}
	async show() {
		document.body.appendChild(this.component)
		this.set()
	}
	set() {
		const selector = this.component.querySelector('#sequenceSelector')
		getConfig().mathSequences.forEach?.((sequence, i) => {
			const optionElement = document.createElement('option')
			optionElement.value = i
			optionElement.textContent = sequence.name

			selector.appendChild(optionElement)
		});

		const sequenceSelected = () => {
			const index = selector.value
			const sequence = getConfig().mathSequences[index]

			const symbolElement = this.component.querySelector('.symbol')
			symbolElement.setTex(sequence.tex)
		}
		selector.addEventListener('change', sequenceSelected)
		sequenceSelected()

		const gameStart = (GameMode, option = getConfig().mathSequences[selector.value]) => {
			new GameMode({
				numericalSequence: option.sequence,
				sequenceName: option.name,
				sequencePrefix: option.prefix,
				sequenceBase: option.base,
			}).show()
		}
		this.component.querySelector('#memorizeMode').addEventListener('click', () => {
			gameStart(MemorizeMode)
		})
		this.component.querySelector('#practiceMode').addEventListener('click', () => {
			gameStart(PracticeMode)
		})
		this.component.querySelector('#challengeMode').addEventListener('click', () => {
			gameStart(ChallengeMode)
		})
	}
}