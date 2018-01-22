import fs from 'fs'
import test from 'ava'
import duck from '../index'

const auth = { user: 'bob', password: 'test' }

test('upload, download, list', async t => {
  const file = 'LICENSE'
  const initialText = fs.readFileSync(file, 'utf8')

  await duck.upload('ftp://localhost:21/', file, auth)
  await duck.download('ftp://localhost:21/' + file, '.', auth)

  const finalText = fs.readFileSync(file, 'utf8')

  t.is(initialText, finalText)

  const files = await duck.list('ftp://localhost:21/', auth)

  t.deepEqual(files, [file])
})
