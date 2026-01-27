'use strict'

const { getMinerStaticIpFromThgInfo } = require('./lib/util/index.js')
const WrkMinerRack = require('./lib/worker-base.js')

class WrkMinerRackS21 extends WrkMinerRack {
  getThingType () {
    return 'miner-am-s21'
  }

  async connectThing (thg) {
    return this._connectThing(thg, 's21')
  }

  _getDefaultStaticMinerIp (thg) {
    return getMinerStaticIpFromThgInfo(thg)
  }
}

module.exports = WrkMinerRackS21
