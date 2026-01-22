'use strict'

const { getDefaultConf, testExecutor } = require('miningos-tpl-wrk-miner/tests/miner.test')
const Miner = require('../workers/lib/miner')
const srv = require('../mock/server')

let mockServer

const conf = getDefaultConf()
if (!conf.settings.live) {
  conf.settings.host = '127.0.0.1'
  mockServer = srv.createServer({ host: conf.settings.host, port: conf.settings.port, type: 'S19xp' })
}

const miner = new Miner({
  timeout: 100,
  address: conf.settings.host,
  port: conf.settings.port,
  username: conf.settings.username,
  password: conf.settings.password,
  id: '001'
})

conf.cleanup = async () => {
  try {
    if (mockServer) {
      await mockServer.exit()
    }
  } catch (e) {
    // Ignore errors during cleanup
  }
}

const execute = async () => {
  try {
    await miner._setupClient()
    await testExecutor(miner, conf)
  } finally {
    // Ensure cleanup is called
    if (conf.cleanup) {
      await conf.cleanup()
    }
    // Give time for connections to close
    await new Promise(resolve => setTimeout(resolve, 2000))
    process.exit(0)
  }
}

execute().catch(err => {
  console.error(err)
  process.exit(1)
})
