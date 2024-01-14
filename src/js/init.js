export const init = () => {
    const defaultConfig = {
        mathSequences: [
            {
                name: "円周率(π) 1万桁 小数点以下",
                tex: "π",
                sequence: "141592653589793238"
            }, {
                name: "円周率(π) 1万桁 2進数 小数点以下",
                tex: "π",
                sequence: ""
            }, {
                name: "円周率(π) 1万桁 16進数 小数点以下",
                tex: "π",
                sequence: ""
            }, {
                name: "円周率(τ) 1万桁 小数点以下",
                tex: "τ",
                sequence: ""
            }, {
                name: "ネイピア数 1万桁 小数点以下",
                tex: "e",
                sequence: "e"
            }, {
                name: "ルート2 小数点以下",
                tex: "\sqrt{2}",
                sequence: ""
            }, {
                name: "log10 2 1万桁 小数点以下",
                tex: "\log_10 2",
                sequence: ""
            }, {
                name: "光速 m/s",
                tex: "c",
                sequence: ""
            }, {
                name: "2の32乗",
                tex: "2^{32}",
                sequence: "4294967296"
            }, {
                name: "2の64乗",
                tex: "2^{64}",
                sequence: "18446744073709551616"
            }, {
                name: "JavaScript MAX_SAFE_INTEGER",
                tex: "MAXSAFEINTEGER",
                sequence: "9007199254740991"
            }, {
                name: "生命、宇宙、そして万物についての究極の疑問の答え",
                tex: "=",
                sequence: "42"
            },
        ]
    }

    localStorage.setItem('ramune.pigame.config', JSON.stringify(defaultConfig))
}

