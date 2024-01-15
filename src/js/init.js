import { defaultConfig } from './defaultConfig.js'

export const init = () => {
    localStorage.setItem('ramune.pigame.config', JSON.stringify(defaultConfig))
}

