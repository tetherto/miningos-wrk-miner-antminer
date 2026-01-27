# Antminer APIs

This document describes the functions exposed by the `miner.js` library for Antminer. Below are functions common to all miners. Look at individual miner documentation for specific changes if any. As of now we are not aware of any miner specific changes

## Miner specific documentation
- [Antminer S19XP Hydro](./antminer-s19xp-hydro.md)
- [Antminer S19XP](./antminer-s19xp.md)
- [Antminer S21](./antminer-s21.md)
- [Antminer S21pro](./antminer-s21pro.md)

## Common Functions
- [Antminer APIs](#antminer-apis)
  - [`constructor(minerId, minerName, host, port = 80, username = 'root', password = 'root', eventTiming = 5000)` -\> `AntminerMiner`](#constructorminerid-minername-host-port--80-username--root-password--root-eventtiming--5000---antminerminer)
    - [Parameters](#parameters)
  - [`getVersion()` -\> `Object`](#getversion---object)
    - [Returns](#returns)
  - [`getStats()` -\> `Object`](#getstats---object)
    - [Returns](#returns-1)
  - [`getPools()` -\> `Array`](#getpools---array)
    - [Returns](#returns-2)
  - [`getDeviceConfiguration()` -\> `Object`](#getdeviceconfiguration---object)
    - [Returns](#returns-3)
  - [`getFrequency()` -\> `number`](#getfrequency---number)
  - [`setFan(state)` -\> `boolean`](#setfanstate---boolean)
    - [Parameters](#parameters-1)
  - [`setFanSpeed(speed)` -\> `boolean`](#setfanspeedspeed---boolean)
    - [Parameters](#parameters-2)
  - [`getFan()` -\> `boolean`](#getfan---boolean)
  - [`getFanSpeed()` -\> `number`](#getfanspeed---number)
  - [`getVoltage()` -\> `number`](#getvoltage---number)
  - [`getNetworkInformation()` -\> `Object`](#getnetworkinformation---object)
    - [Returns](#returns-4)
  - [`setNetworkInformation(network_settings)` -\> `boolean`](#setnetworkinformationnetwork_settings---boolean)
    - [Parameters](#parameters-3)
  - [`getPools()` -\> `Array`](#getpools---array-1)
    - [Returns](#returns-5)
  - [`setPools(pools)` -\> `boolean`](#setpoolspools---boolean)
    - [Parameters](#parameters-4)
  - [`reboot()` -\> `boolean`](#reboot---boolean)
  - [`setFrequency(frequency)` -\> `boolean`](#setfrequencyfrequency---boolean)
    - [Parameters](#parameters-5)
  - [`setLEDControl(state)` -\> `boolean`](#setledcontrolstate---boolean)
    - [Parameters](#parameters-6)
  - [`updateFirmware(firmware_file)` -\> `boolean`](#updatefirmwarefirmware_file---boolean)
    - [Parameters](#parameters-7)
  - [`updateAdminPassword(new_password)` -\> `boolean`](#updateadminpasswordnew_password---boolean)
    - [Parameters](#parameters-8)
  - [`getSnap()` -\> `Object`](#getsnap---object)
    - [Returns](#returns-6)


## `constructor(minerId, minerName, host, port = 80, username = 'root', password = 'root', eventTiming = 5000)` -> `AntminerMiner`
Creates a new `AntminerMiner` instance.

### Parameters
| Param  | Type | Description | Default |
| -- | -- | -- | -- |
| minerId | `string` | ID of the miner (for identification purposes). | |
| minerName | `string` | Name of the miner (for identification purposes). | |
| host | `string` | Hostname or IP address of the miner. | |
| port | `number` | Port of the miner. | `80` |
| username | `string` | Username to use for authentication. | `root` |
| password | `string` | Password to use for authentication. | `root` |
| eventTiming | `number` | Time in milliseconds between each event. | `5000` |

## `getVersion()` -> `Object`
Gets the version information of the miner.

### Returns
| Key | Type | Description |
| -- | -- | -- |
| platform | `string` | Platform of the miner. |
| antminer.firmware | `string` | Firmware version of the miner. |

## `getStats()` -> `Object`
Gets the mining statistics of the miner.

### Returns
| Key | Type | Description |
| -- | -- | -- |
| mhs_av | `number` | Average hashrate of the miner in H/s. |
| mhs_5s | `number` | Average hashrate of the miner in H/s over the last 5 seconds. |
| mhs_30m | `number` | Average hashrate of the miner in H/s over the last 30 minutes. |
| elapsed | `number` | Time elapsed since the miner was turned on in seconds. |
| best_share | `number` | The best share the miner has found. |

## `getPools()` -> `Array`
Gets the mining pools the miner is connected to.

### Returns
| Key | Type | Description |
| -- | -- | -- |
| index | `number` | Index of the pool. |
| url | `string` | URL of the pool. |
| username | `string` | Username of the pool. |
| status | `string` | Status of the pool. |
| priority | `number` | Priority of the pool. |
| getworks | `number` | Number of getworks. |
| accepted | `number` | Number of accepted shares. |
| rejected | `number` | Number of rejected shares. |
| discarded | `number` | Number of discarded shares. |
| stale | `number` | Number of stale shares. |
| difficulty | `number` | Difficulty of the pool. |
| diff1 | `number` | Difficulty of the pool. |
| difficulty_accepted | `number` | Difficulty of the pool. |
| difficulty_rejected | `number` | Difficulty of the pool. |
| difficulty_stale | `number` | Difficulty of the pool. |
| last_share_difficulty | `number` | Difficulty of the pool. |
| last_share_time | `number` | Time of the last share. |

## `getDeviceConfiguration()` -> `Object`
Gets the device configuration of the miner.

### Returns
| Key | Type | Description |
| -- | -- | -- |
| api_enabled | `boolean` | Whether the API is enabled. |
| api_network_enabled | `boolean` | Whether the API is network enabled. |
| api_groups | `string` | API groups. |
| api_allow | `string` | API allowed. |
| fan_control | `boolean` | Whether fan control is enabled. |
| fan_speed | `number` | Fan speed in percent. |
| use_vil | `boolean` | Whether VIL is enabled. |
| frequency | `number` | Frequency of the miner. |
| voltage | `number` | Voltage of the miner. |
| cc_delay | `number` | CC delay of the miner. |
| work_mode | `number` | Work mode of the miner. |
| frequency_level | `number` | Frequency level of the miner. |

## `getFrequency()` -> `number`
Gets the frequency of the miner.

## `setFan(state)` -> `boolean`
Sets the fan state of the miner.

### Parameters
| Param  | Type | Description |
| -- | -- | -- |
| state | `boolean` | Whether the fan should be enabled. |

## `setFanSpeed(speed)` -> `boolean`
Sets the fan speed of the miner.

### Parameters
| Param  | Type | Description |
| -- | -- | -- |
| speed | `number` | Speed of the fan in percent. |

## `getFan()` -> `boolean`
Gets the fan state of the miner.

## `getFanSpeed()` -> `number`
Gets the fan speed of the miner in percent.

## `getVoltage()` -> `number`
Gets the voltage of the miner.

## `getNetworkInformation()` -> `Object`
Gets the network information of the miner.

### Returns
| Key | Type | Description |
| -- | -- | -- |
| type | `string` | Type of the network. |
| network.ip | `string` | IP address of the miner. |
| network.mac | `string` | MAC address of the miner. |
| network.hostname | `string` | Hostname of the miner. |
| network.mask | `string` | Mask of the miner. |
| network.gateway | `string` | Gateway of the miner. |
| network.dns | `Array` | DNS servers of the miner. |

## `setNetworkInformation(network_settings)` -> `boolean`
Sets the network information of the miner.

### Parameters
| Param  | Type | Description |
| -- | -- | -- |
| network_settings.type | `string` | Type of the network. |
| network_settings.network.ip | `string` | IP address of the miner. |
| network_settings.network.mac | `string` | MAC address of the miner. |
| network_settings.network.hostname | `string` | Hostname of the miner. |
| network_settings.network.mask | `string` | Mask of the miner. |
| network_settings.network.gateway | `string` | Gateway of the miner. |
| network_settings.network.dns | `Array` | DNS servers of the miner. |

## `getPools()` -> `Array`
Gets the mining pools the miner is connected to.

### Returns
| Key | Type | Description |
| -- | -- | -- |
| index | `number` | Index of the pool. |
| url | `string` | URL of the pool. |
| username | `string` | Username of the pool. |
| status | `string` | Status of the pool. |
| priority | `number` | Priority of the pool. |
| getworks | `number` | Number of getworks. |
| accepted | `number` | Number of accepted shares. |
| rejected | `number` | Number of rejected shares. |
| discarded | `number` | Number of discarded shares. |
| stale | `number` | Number of stale shares. |
| difficulty | `number` | Difficulty of the pool. |
| diff1 | `number` | Difficulty of the pool. |
| difficulty_accepted | `number` | Difficulty of the pool. |
| difficulty_rejected | `number` | Difficulty of the pool. |
| difficulty_stale | `number` | Difficulty of the pool. |
| last_share_difficulty | `number` | Difficulty of the pool. |
| last_share_time | `number` | Time of the last share. |

## `setPools(pools, appendId = true)` -> `Boolean`
Sets pool information of the miner. Accepts `pools` which is an array of objects with the following parameters. If `appendId` is set to `true`, the miner ID will be appended to the pool worker name.

### Parameters
| Param  | Type | Description |
| -- | -- | -- |
| url | `string` | Pool URL |
| worker_name | `string` | Worker Username |
| worker_password | `string` | Worker Password |

## `reboot()` -> `boolean`
Reboots the miner.

## `setFrequency(frequency)` -> `boolean`
Sets the frequency of the miner.

### Parameters
| Param  | Type | Description |
| -- | -- | -- |
| frequency | `number` | Frequency to set the miner to. |

## `setLEDControl(state)` -> `boolean`
Sets the LED control of the miner.

### Parameters
| Param  | Type | Description |
| -- | -- | -- |
| state | `boolean` | State of the LED. |

## `updateFirmware(firmware_file)` -> `boolean`
Updates the firmware of the miner.

### Parameters
| Param  | Type | Description |
| -- | -- | -- |
| firmware_file | `string` | Path to the firmware file. |

## `updateAdminPassword(new_password)` -> `boolean`
Updates the admin password of the miner.

### Parameters
| Param  | Type | Description |
| -- | -- | -- |
| new_password | `string` | New password to set. |

## `getSnap()` -> `Object`
Gets a snapshot of the miner.

### Returns
| Key | Type | Description |
| -- | -- | -- |
| stats.mhs_5s | `number` | Average hashrate of the miner in H/s over the last 5 seconds. |
| stats.mhs_av | `number` | Average hashrate of the miner in H/s. |
| stats.mhs_30m | `number` | Average hashrate of the miner in H/s over the last 30 minutes. |
| stats.elapsed | `number` | Time elapsed since the miner was turned on in seconds. |
| stats.best_share | `number` | The best share the miner has found. |
| stats.target_freq | `number` | The target frequency of the miner. |
| version.platform | `string` | Platform of the miner. |
| version.antminer.firmware | `string` | Firmware version of the miner. |
| pools.index | `number` | Index of the pool. |
| pools.url | `string` | URL of the pool. |
| pools.username | `string` | Username of the pool. |
| pools.status | `string` | Status of the pool. |
| pools.priority | `number` | Priority of the pool. |
| pools.getworks | `number` | Number of getworks. |
| pools.accepted | `number` | Number of accepted shares. |
| pools.rejected | `number` | Number of rejected shares. |
| pools.discarded | `number` | Number of discarded shares. |
| pools.stale | `number` | Number of stale shares. |
| pools.difficulty | `number` | Difficulty of the pool. |
| pools.diff1 | `number` | Difficulty of the pool. |
| pools.difficulty_accepted | `number` | Difficulty of the pool. |
| pools.difficulty_rejected | `number` | Difficulty of the pool. |
| pools.difficulty_stale | `number` | Difficulty of the pool. |
| pools.last_share_difficulty | `number` | Difficulty of the pool. |
| pools.last_share_time | `number` | Time of the last share. |
| network_info.type | `string` | Type of the network. |
| network_info.network.ip | `string` | IP address of the miner. |
| network_info.network.mac | `string` | MAC address of the miner. |
| network_info.network.hostname | `string` | Hostname of the miner. |
| network_info.network.mask | `string` | Mask of the miner. |
| network_info.network.gateway | `string` | Gateway of the miner. |
| network_info.network.dns | `Array` | DNS servers of the miner. |
| other.api_enabled | `boolean` | Whether the API is enabled. |
| other.api_network_enabled | `boolean` | Whether the API is network enabled. |
| other.api_groups | `string` | API groups. |
| other.api_allow | `string` | API allowed. |
| other.fan_control | `boolean` | Whether fan control is enabled. |
| other.fan_speed | `number` | Fan speed in percent. |
| other.use_vil | `boolean` | Whether VIL is enabled. |
| other.frequency | `number` | Frequency of the miner. |
| other.voltage | `number` | Voltage of the miner. |
| other.cc_delay | `number` | CC delay of the miner. |
| other.work_mode | `number` | Work mode of the miner. |
| other.frequency_level | `number` | Frequency level of the miner. |
| psu.powerInput.voltage | `number` | Voltage of the miner. |
