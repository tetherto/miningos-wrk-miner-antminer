'use strict'

const WrkMinerRack = require('./lib/worker-base.js')

class WrkMinerRackS19xp extends WrkMinerRack {
  getThingType () {
    return 'miner-am-s19xp'
  }

  async connectThing (thg) {
    return this._connectThing(thg, 's19xp')
  }
}

module.exports = WrkMinerRackS19xp
