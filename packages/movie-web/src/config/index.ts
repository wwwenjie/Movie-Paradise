import * as fs from 'fs'
import * as path from 'path'

let config
if (fs.existsSync(path.resolve(__dirname, './config.local.json'))) {
  config = JSON.parse(fs.readFileSync(path.resolve(__dirname, './config.local.json')).toString())
} else {
  config = JSON.parse(fs.readFileSync(path.resolve(__dirname, './config.json')).toString())
}

export default config
