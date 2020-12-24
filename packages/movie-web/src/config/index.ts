import fs from 'fs'
import path from 'path'

let env: string
if (process.env.NODE_ENV === undefined) {
  console.log('\x1B[33m[Warn]\x1B[0m no node env found, use default as env')
  env = 'default'
} else {
  env = process.env.NODE_ENV
}

let config
if (fs.existsSync(path.resolve(__dirname, `../../config/${env}.json`))) {
  config = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../config/${env}.json`)).toString())
} else {
  console.log(`\x1B[33m[Warn]\x1B[0m ${env}.json not found, use default.json`)
  config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../config/default.json')).toString())
}

export default config
