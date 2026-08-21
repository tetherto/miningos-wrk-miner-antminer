'use strict'

const test = require('brittle')
const WrkMinerRack = require('../../workers/lib/worker-base')

function makeCtx (creds) {
  const ctx = {
    conf: { thing: { miner: {} } },
    getNominalEficiencyWThs: () => 0,
    debugThingError: () => {},
    _getThingCredentials: () => creds
  }
  ctx._connectThing = WrkMinerRack.prototype._connectThing.bind(ctx)
  return ctx
}

test('_connectThing returns 0 when no credentials resolve', async (t) => {
  const ctx = makeCtx({ username: undefined, password: undefined })
  const thg = { id: 't1', opts: { address: '10.0.0.1', port: 80, username: 'optsuser', password: 'optspass' } }
  t.is(await ctx._connectThing(thg, 'miner-am-s21'), 0)
  t.absent(thg.ctrl)
})

test('_connectThing builds the miner with the resolved credentials', async (t) => {
  const ctx = makeCtx({ username: 'ovruser', password: 'ovrpass' })
  const thg = { id: 't1', opts: { address: '10.0.0.1', port: 80, username: 'optsuser', password: 'optspass' } }
  t.is(await ctx._connectThing(thg, 'miner-am-s21'), 1)
  t.is(thg.ctrl.opts.username, 'ovruser')
  t.is(thg.ctrl.opts.password, 'ovrpass')
})
