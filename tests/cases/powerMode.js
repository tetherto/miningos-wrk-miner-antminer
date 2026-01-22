'use strict'

module.exports = (v) => {
  v.setPowerModeSleep.stages[1].wait = 200
  v.setPowerModeNormal.stages[1].wait = 200
  delete v.setPowerModeLow
  delete v.setPowerModeHigh
}
