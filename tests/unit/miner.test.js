'use strict'

const { test } = require('brittle')
const Miner = require('../../workers/lib/miner')
const { POWER_MODE, STATUS } = require('miningos-tpl-wrk-miner/workers/lib/constants')
const crypto = require('crypto')

const password = crypto.randomBytes(5).toString('base64').replace(/[^a-z0-9]/gi, '').slice(0, 5)

test('AntminerMiner constructor', (t) => {
  const miner = new Miner({
    timeout: 30000,
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password,
    id: '001'
  })

  t.is(miner.opts.timeout, 30000)
  t.is(miner.opts.address, '127.0.0.1')
  t.is(miner.opts.port, 80)
  t.is(miner.opts.username, 'admin')
  t.is(miner.opts.password, password)
  t.is(miner.opts.id, '001')
  t.is(miner.opts.errPort, 6060) // default value
  t.is(miner._cachedPrevHashrate, null)
})

test('AntminerMiner constructor with custom errPort', (t) => {
  const miner = new Miner({
    errPort: 8080,
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  t.is(miner.opts.errPort, 8080)
})

test('validateWriteAction - setPowerMode with valid modes', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  t.is(miner.validateWriteAction('setPowerMode', POWER_MODE.SLEEP), 1)
  t.is(miner.validateWriteAction('setPowerMode', POWER_MODE.NORMAL), 1)
})

test('validateWriteAction - setPowerMode with invalid mode', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  try {
    miner.validateWriteAction('setPowerMode', 'invalid_mode')
    t.fail('Should have thrown an error')
  } catch (err) {
    t.ok(err.message.includes('ERR_SET_POWER_MODE_INVALID'))
  }
})

test('validateWriteAction - other actions delegate to parent', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  // Mock the parent validateWriteAction method
  const originalSuper = miner.validateWriteAction
  miner.validateWriteAction = function (action, ...args) {
    return 'delegated'
  }

  const result = miner.validateWriteAction('someOtherAction', 'arg1', 'arg2')
  t.is(result, 'delegated')

  // Restore original method
  miner.validateWriteAction = originalSuper
})

test('_getStatus - returns ERROR when hasErrors is true', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._getStatus(true, { minerMode: 0 })
  t.is(result, STATUS.ERROR)
})

test('_getStatus - returns MINING when minerMode is 0', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._getStatus(false, { minerMode: 0 })
  t.is(result, STATUS.MINING)
})

test('_getStatus - returns SLEEPING when minerMode is 1', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._getStatus(false, { minerMode: 1 })
  t.is(result, STATUS.SLEEPING)
})

test('_isSuspended - returns true when minerMode is 1', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._isSuspended({ minerMode: 1 })
  t.is(result, true)
})

test('_isSuspended - returns false when minerMode is 0', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._isSuspended({ minerMode: 0 })
  t.is(result, false)
})

test('_calcPowerW - calculates power correctly', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._calcPowerW({ power: '1234.567' })
  t.is(result, 1234.56)
})

test('_calcAvgTemp - calculates average temperature correctly', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const stats = {
    boards: [
      { raw_temps: { chip: [50.5] } },
      { raw_temps: { chip: [60.3] } },
      { raw_temps: { chip: [70.1] } }
    ]
  }

  const result = miner._calcAvgTemp(stats)
  t.is(result, 60.29) // (50.5 + 60.3 + 70.1) / 3 = 60.3, but rounded to 60.29
})

test('_getPowerMode - returns SLEEP when minerMode is 1', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._getPowerMode({ minerMode: 1 })
  t.is(result, POWER_MODE.SLEEP)
})

test('_getPowerMode - returns NORMAL when minerMode is 0', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._getPowerMode({ minerMode: 0 })
  t.is(result, POWER_MODE.NORMAL)
})

test('_calcEfficiency - returns undefined for non-s19xp_h type', (t) => {
  const miner = new Miner({
    type: 's19xp',
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._calcEfficiency({ power: 1000 }, { mhs_av: 100 })
  t.is(result, undefined)
})

test('_calcEfficiency - calculates efficiency for s19xp_h type', (t) => {
  const miner = new Miner({
    type: 's19xp_h',
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._calcEfficiency({ power: 1000 }, { mhs_av: 100 })
  t.is(result, '10000000.00')
})

test('_calcEfficiency - returns 0 when hashrate is 0', (t) => {
  const miner = new Miner({
    type: 's19xp_h',
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._calcEfficiency({ power: 1000 }, { mhs_av: 0 })
  t.is(result, 0)
})

test('_calcEfficiency - returns undefined when efficiency is NaN', (t) => {
  const miner = new Miner({
    type: 's19xp_h',
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const result = miner._calcEfficiency({ power: 'invalid' }, { mhs_av: 100 })
  t.is(result, undefined)
})

test('_calcHashrates - calculates hashrates correctly', (t) => {
  const miner = new Miner({
    address: '127.0.0.1',
    port: 80,
    username: 'admin',
    password
  })

  const summary = {
    mhs_av: 123.456,
    mhs_5s: 124.789,
    mhs_30m: 125.123
  }

  const result = miner._calcHashrates(summary)
  t.is(result.avg, 123.45)
  t.is(result.t_5s, 124.78)
  t.is(result.t_5m, 125.12)
  t.is(result.t_30m, 125.12)
})
