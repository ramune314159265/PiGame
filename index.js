import EventRegister from './src/js/util/eventRegister.js'
import './src/js/elements/index.js'
import { MemorizeMode, PracticeMode, ChallengeMode } from './src/js/gamemodes/index.js'

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#memorizeMode').addEventListener('click', () => {
        new MemorizeMode('14159265358979323846264338327950288419716939937510582097494459230781640628620899862').show()
    })
    document.querySelector('#practiceMode').addEventListener('click', () => {
        new PracticeMode('14159265358979323846264338327950288419716939937510582097494459230781640628620899862').show()
    })
    document.querySelector('#challengeMode').addEventListener('click', () => {
        new ChallengeMode('14159265358979323846264338327950288419716939937510582097494459230781640628620899862').show()
    })
})
