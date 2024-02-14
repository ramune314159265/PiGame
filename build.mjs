import fs from 'fs-extra'
import esbuild from 'esbuild'

const copyTargets = ['index.html', 'style.css', 'svg/']

console.time('build')

await esbuild.build({
	entryPoints: ['src/index.js'],
	minify: true,
	bundle: true,
	outfile: 'build/index.js',
})

copyTargets.forEach(name => {
	fs.copySync(`./src/${name}`, `./build/${name}`)
})

console.timeEnd('build')