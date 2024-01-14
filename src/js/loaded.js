import { MemorizeMode, PracticeMode, ChallengeMode } from './gamemodes/index.js'
import { getConfig } from './util/config.js'

export const loaded = () => {
    const selector = document.querySelector('#sequenceSelector')
    getConfig().mathSequences.forEach?.((sequence, i) => {
        const optionElement = document.createElement('option')
        optionElement.value = i
        optionElement.textContent = sequence.name

        selector.appendChild(optionElement)
    });

    const sequenceSelected = () => {
        const index = selector.value
        const sequence = getConfig().mathSequences[index]

        const symbolElement = document.querySelector('.symbol')
        MathJax.typesetPromise().then(() => {
            symbolElement.textContent = `$$${sequence.tex}$$`
            MathJax.typesetPromise()
        })
    }
    selector.addEventListener('change', sequenceSelected)
    sequenceSelected()

    const gameStart = (GameMode, sequence = getConfig().mathSequences[selector.value].sequence) => {
        console.log(sequence)
        new GameMode(sequence).show()
    }
    document.querySelector('#memorizeMode').addEventListener('click', () => {
        gameStart(MemorizeMode)
    })
    document.querySelector('#practiceMode').addEventListener('click', () => {
        gameStart(PracticeMode)
    })
    document.querySelector('#challengeMode').addEventListener('click', () => {
        gameStart(ChallengeMode)
    })
}

