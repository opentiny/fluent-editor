const path = require('path')
const shelljs = require('shelljs')
const program = require('commander')

shelljs.cp('-rf', 'package.json', 'dist')
const targetFile = path.resolve(__dirname, '../dist/package.json')
const packagejson = require(targetFile)
const currentVersion = packagejson.version
const versionArr = currentVersion.split('.')
const [mainVersion, subVersion, phaseVersion] = versionArr

// 默认版本号
const defaultVersion = `${mainVersion}.${subVersion}.${+phaseVersion + 1}`

let newVersion = defaultVersion

// 从命令行参数中取版本号
program
  .option('-v, --versions <type>', 'Add release version number', defaultVersion)

program.parse(process.argv)

if (program.versions) {
  newVersion = program.versions
}

console.log('newVersion:', newVersion)

function preRelease() {
  shelljs.sed('-i', `"version": "${currentVersion}"`, `"version": "${newVersion}"`, targetFile)
  shelljs.sed('-i', `"main": "src/index.ts"`, `"main": "lib/index.cjs.js"`, targetFile)
  shelljs.sed('-i', `"module": "src/index.ts"`, `"module": "es/index.es.js"`, targetFile)
  shelljs.sed('-i', `"import": "./src/index.ts"`, `"import": "./es/index.es.js"`, targetFile)
  shelljs.sed('-i', `"require": "./src/index.ts"`, `"require": "./lib/index.cjs.js"`, targetFile)
  shelljs.sed('-i', `"./index.scss": "./src/assets/index.scss"`, `"./index.css": "./theme/index.css"`, targetFile)
  shelljs.cp('-rf', '../../README.md', 'dist')
}

preRelease()
