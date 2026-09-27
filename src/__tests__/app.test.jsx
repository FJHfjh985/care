import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { areaOptions, parseRestaurantJson } from '../data'

describe('今晚去哪？路线规划原型', () => {
  it('提供五个上海夜晚区域选项', () => {
    expect(areaOptions).toHaveLength(5)
    expect(areaOptions.map((area) => area.name)).toEqual([
      '西岸滨江',
      '四川北路',
      '浦东滨江',
      '巨富长',
      '衡山路 / 徐家汇',
    ])
  })

  it('点击区域卡片后展示详情与餐厅占位', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /西岸滨江/ }))

    expect(screen.getByRole('heading', { name: '西岸滨江' })).toBeInTheDocument()
    expect(screen.getByText('附近餐厅')).toBeInTheDocument()
    expect(screen.getByText('餐厅信息将在这里出现')).toBeInTheDocument()
  })

  it('解析有效餐厅 JSON，并拒绝空数据', () => {
    expect(parseRestaurantJson('{"name":"晚风食堂","area":"西岸滨江","tags":["适合聊天"]}')).toEqual({
      name: '晚风食堂',
      area: '西岸滨江',
      tags: ['适合聊天'],
    })

    expect(() => parseRestaurantJson('{"name":""}')).toThrow('请至少填写餐厅名称')
  })
})
