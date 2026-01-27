'use strict'

const { getMinerStaticIpFromThgInfo } = require('./lib/util/index.js')
const WrkMinerRack = require('./lib/worker-base.js')

class WrkMinerRackS21pro extends WrkMinerRack {
  getThingType () {
    return 'miner-am-s21pro'
  }

  async connectThing (thg) {
    return this._connectThing(thg, 's21pro')
  }

  _getDefaultStaticMinerIp (thg) {
    return getMinerStaticIpFromThgInfo(thg)
  }
}

module.exports = WrkMinerRackS21pro
