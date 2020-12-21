import { performance } from 'perf_hooks'
import logger from '../core/log4js'

export function notNull (object: Object): boolean {
  return !(object === null || object === undefined)
}

export function time () {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const func = descriptor.value
    descriptor.value = function (...args) {
      const start = performance.now()
      const results = func.apply(this, args)
      const end = performance.now()
      if ((end - start) > 50.0) {
        const str = `warning! ${name} running time: ${end - start} ms`
        console.log(str)
        logger.warn(str)
      }
      return results
    }
  }
}

export function getRandomItemFromArray (array: any[], amount: number = array.length): any[] {
  const result = []
  let counter = 0
  for (let i = 0; i < array.length; i++) {
    if (counter === amount) {
      break
    }
    const index = Math.floor(Math.random() * (array.length - i))
    result.push(array[index])
    array[index] = array[array.length - i - 1]
    counter++
  }
  return result
}
