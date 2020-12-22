import connect from '../../core/db'

test('connect database', async () => {
  await connect
}, 10000)
