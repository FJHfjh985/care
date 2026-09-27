import test from 'node:test'
import assert from 'node:assert/strict'
import { areaOptions, parseRestaurantJson } from '../src/data.js'

test('路线数据包含五个约定区域', () => {
  assert.deepEqual(
    areaOptions.map((area) => area.name),
    ['西岸滨江', '四川北路', '浦东滨江', '巨富长', '衡山路 / 徐家汇'],
  )
})

test('餐厅 JSON 导入要求填写餐厅名称', () => {
  assert.deepEqual(
    parseRestaurantJson('{"name":"晚风食堂","area":"西岸滨江","tags":["适合聊天"]}'),
    { name: '晚风食堂', area: '西岸滨江', tags: ['适合聊天'] },
  )

  assert.throws(() => parseRestaurantJson('{"name":""}'), /请至少填写餐厅名称/)
})
