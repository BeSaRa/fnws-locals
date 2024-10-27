import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import * as fs from 'node:fs'

const LOCALS_PATH = '../fnws/src/resources/locals.json'

router.get('/', async () => {
  return fs.readFileSync(LOCALS_PATH, 'utf8')
})

router.get('/key/:key', async (ctx) => {
  const locals = getLocals()
  return locals[ctx.params.key]
})

router.post('/', async (ctx: HttpContext) => {
  const value = ctx.request.body() as unknown as { key: string; ar: string; en: string }
  const content = getLocals()
  content[value.key] = {
    ar: value.ar,
    en: value.en,
  }
  saveLocals(content)
  return content[value.key]
})

function getLocals() {
  return JSON.parse(fs.readFileSync(LOCALS_PATH, 'utf8'))
}

function saveLocals(content: any) {
  return fs.writeFileSync(LOCALS_PATH, JSON.stringify(content, null, ' '), 'utf8')
}
