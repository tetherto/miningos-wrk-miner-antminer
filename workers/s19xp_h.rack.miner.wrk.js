'use strict'
/* eslint-disable camelcase */

const WrkMinerRack = require('./lib/worker-base.js')

class WrkMinerRackS19xpH extends WrkMinerRack {
  getThingType () {
    return 'miner-am-s19xp_h'
  }

  async connectThing (thg) {
    return this._connectThing(thg, 's19xp_h')
  }
}

module.exports = WrkMinerRackS19xpH
