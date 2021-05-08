import Koa from 'koa'
import InitManager from './core/init'

const app = new Koa()
InitManager.initCore(app)

console.log('  __  __            _        _____                    _ _          \n' +
  ' |  \\/  |          (_)      |  __ \\                  | (_)         \n' +
  ' | \\  / | _____   ___  ___  | |__) |_ _ _ __ __ _  __| |_ ___  ___ \n' +
  ' | |\\/| |/ _ \\ \\ / / |/ _ \\ |  ___/ _` | \'__/ _` |/ _` | / __|/ _ \\\n' +
  ' | |  | | (_) \\ V /| |  __/ | |  | (_| | | | (_| | (_| | \\__ \\  __/\n' +
  ' |_|  |_|\\___/ \\_/ |_|\\___| |_|   \\__,_|_|  \\__,_|\\__,_|_|___/\\___|\n')
console.log('https://github.com/wwwenjie/Movie-Paradise')
