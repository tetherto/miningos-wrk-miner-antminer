'use strict'

const { test } = require('brittle')
const { getMinerStaticIpFromThgInfo } = require('../../workers/lib/util/index')

test('getMinerStaticIpFromThgInfo - generates correct IP for valid thg info', (t) => {
  const thg = {
    info: {
      container: 'container-001',
      pos: '1_2_3'
    }
  }

  const result = getMinerStaticIpFromThgInfo(thg)
  t.is(result, '10.001.1.23')
})

test('getMinerStaticIpFromThgInfo - generates correct IP for different container numbers', (t) => {
  const thg = {
    info: {
      container: 'container-042',
      pos: '3_4_5'
    }
  }

  const result = getMinerStaticIpFromThgInfo(thg)
  t.is(result, '10.042.3.45')
})

test('getMinerStaticIpFromThgInfo - handles single digit positions', (t) => {
  const thg = {
    info: {
      container: 'container-001',
      pos: '1_1_1'
    }
  }

  const result = getMinerStaticIpFromThgInfo(thg)
  t.is(result, '10.001.1.11')
})

test('getMinerStaticIpFromThgInfo - handles multi-digit positions', (t) => {
  const thg = {
    info: {
      container: 'container-001',
      pos: '10_20_30'
    }
  }

  const result = getMinerStaticIpFromThgInfo(thg)
  // The function concatenates shelf and pos, so 20 + 30 = 2030
  // But this creates an invalid IP (2030 > 255), so it returns empty string
  t.is(result, '')
})

test('getMinerStaticIpFromThgInfo - returns empty string for invalid IP', (t) => {
  const thg = {
    info: {
      container: 'container-999',
      pos: '999_999_999'
    }
  }

  const result = getMinerStaticIpFromThgInfo(thg)
  t.is(result, '')
})

test('getMinerStaticIpFromThgInfo - handles edge case with zeros', (t) => {
  const thg = {
    info: {
      container: 'container-000',
      pos: '0_0_0'
    }
  }

  const result = getMinerStaticIpFromThgInfo(thg)
  t.is(result, '10.000.0.00')
})

test('getMinerStaticIpFromThgInfo - handles different container name formats', (t) => {
  const thg = {
    info: {
      container: 'rack-123',
      pos: '5_6_7'
    }
  }

  const result = getMinerStaticIpFromThgInfo(thg)
  t.is(result, `10.${thg.info.container.replace('rack-', '')}.5.67`)
})

test('getMinerStaticIpFromThgInfo - handles container with no dash', (t) => {
  const thg = {
    info: {
      container: 'container123',
      pos: '1_2_3'
    }
  }

  const result = getMinerStaticIpFromThgInfo(thg)
  // When there's no dash, split('-').pop() returns the whole string
  t.is(result, '')
})

test('getMinerStaticIpFromThgInfo - handles malformed container name', (t) => {
  const thg = {
    info: {
      container: 'invalid',
      pos: '1_2_3'
    }
  }

  const result = getMinerStaticIpFromThgInfo(thg)
  // When there's no dash, split('-').pop() returns 'invalid', which creates invalid IP
  t.is(result, '')
})

test('getMinerStaticIpFromThgInfo - handles malformed position', (t) => {
  const thg = {
    info: {
      container: 'container-001',
      pos: 'invalid'
    }
  }

  const result = getMinerStaticIpFromThgInfo(thg)
  // When pos is 'invalid', split('_') returns ['invalid'], so [cupboard, shelf, pos] = ['invalid', undefined, undefined]
  // This creates an invalid IP, so it returns empty string
  t.is(result, '')
})
