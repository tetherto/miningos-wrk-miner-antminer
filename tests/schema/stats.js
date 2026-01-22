'use strict'

module.exports = (v) => {
  v.stats_validate.schema.stats.children.power_w.optional = true
  v.stats_validate.schema.stats.children.hashrate_mhs.children = {
    avg: { type: 'number', min: 0 },
    t_30m: { type: 'number', min: 0 }
  }
  v.stats_validate.schema.stats.children.frequency_mhz.children.target.optional = true
  v.stats_validate.schema.stats.children.frequency_mhz.children.chips.children.target.optional = true
  v.stats_validate.schema.stats.children.temperature_c.children.chips.children.min.optional = true

  v.config_validate.schema.config.children.network_config.children.dns.optional = true
  v.config_validate.schema.config.children.network_config.children.ip_gw.optional = true

  return {}
}
