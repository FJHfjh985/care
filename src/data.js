export const areaOptions = [
  {
    id: 'west-bund',
    name: '西岸滨江',
    subtitle: '艺术 · 江景 · 低速散步',
    duration: '约 2.5 小时',
    accent: '#f28a72',
    shade: '#f8d6c9',
    imageUrl: 'https://imgix.bustle.com/wmag/2016/12/15/5852bdd057dfc3b0230f4940_1515-WM-CHIN-02.jpg',
    imagePosition: 'center 52%',
    description: '适合把晚饭和散步放慢一点。江风、展馆和开阔的滨水步道，会把上海的夜晚拉得很长。',
    route: [
      { title: '西岸梦中心', note: '先吃晚饭，挑一家临江或露台餐厅' },
      { title: '油罐艺术中心', note: '绕着草坪散步，看被灯光点亮的圆形建筑' },
      { title: '徐汇滨江', note: '沿江慢走，把最后一段留给夜景' },
    ],
    note: '氛围感最稳定的一条路线，适合第一次认真约会。',
  },
  {
    id: 'sichuan-north',
    name: '四川北路',
    subtitle: '老建筑 · 咖啡 · 微复古',
    duration: '约 2 小时',
    accent: '#ce9b5b',
    shade: '#f0dfb8',
    imageUrl: 'https://lcc.sjtu.edu.cn/Assets/userfiles/sys_eb538c1c-65ff-4e82-8e6a-a1ef01127fed/images/2%2827%29.jpg',
    imagePosition: 'center',
    description: '比起热闹商圈，这里更像一段有故事的旧电影。建筑的线条、安静的街道和晚开的咖啡店都很耐看。',
    route: [
      { title: '1933 老场坊', note: '先走进光影交错的混凝土迷宫' },
      { title: '今潮 8 弄', note: '沿着石库门小路慢逛，留意橱窗和小店' },
      { title: '鲁迅公园', note: '如果不太晚，用一段树影收尾' },
    ],
    note: '适合想聊天、也想有一点城市质感的晚上。',
  },
  {
    id: 'pudong-riverside',
    name: '浦东滨江',
    subtitle: '开阔 · 建筑 · 城市天际线',
    duration: '约 3 小时',
    accent: '#6e9fbd',
    shade: '#c9dfeb',
    imageUrl: 'https://sghimages.shobserver.com/img/catch/2024/12/06/2bbf4a43-9400-4ca0-8e42-bcd13c4a699f.jpg',
    imagePosition: 'center 46%',
    description: '想看上海最有“夜航感”的一面，就往江东走。这里的距离感、天际线和风，会让普通的晚饭变成小旅行。',
    route: [
      { title: '世博大道', note: '晚饭后从宽阔的步道开始，不赶时间' },
      { title: '中华艺术宫', note: '在红色建筑外停一会儿，拍一张很有城市感的照片' },
      { title: '浦东美术馆 · 三件套', note: '把陆家嘴灯光当作这一晚的终点' },
    ],
    note: '适合天气好、想看开阔夜景的周末。',
  },
  {
    id: 'jufuchang',
    name: '巨富长',
    subtitle: '小店 · 酒吧 · 都市夜生活',
    duration: '约 2.5 小时',
    accent: '#bc778e',
    shade: '#e9c8d2',
    imageUrl: 'https://m.online.sh.cn/100/images/attachement/jpg/site1/20230519/IMGe0be037d2ca76344786021_small.JPG',
    imagePosition: 'center 44%',
    description: '巨鹿、富民、长乐三条路连起来，是很适合“边走边决定”的地方。吃饭、逛店、喝一杯都有余地。',
    route: [
      { title: '巨鹿路', note: '先从一顿轻松晚饭开始，别把行程排得太满' },
      { title: '富民路', note: '沿街逛独立店和咖啡馆，看到喜欢的就停下' },
      { title: '长乐路', note: '用一间安静酒吧或甜品店结束夜晚' },
    ],
    note: '最不需要攻略的一条路线，跟着当下心情走就好。',
  },
  {
    id: 'hengshan-xujiahui',
    name: '衡山路 / 徐家汇',
    subtitle: '梧桐 · 教堂 · 温柔旧上海',
    duration: '约 2 小时',
    accent: '#75a68b',
    shade: '#cce1d2',
    imageUrl: 'https://www.credaward.com/wp-content/uploads/2023/12/DSCF3657-3000x2250.jpg',
    imagePosition: 'center 38%',
    description: '一条更安静的夜游线。梧桐影子、教堂钟楼和公园长椅，适合不急着回去、也不急着把话说完的晚上。',
    route: [
      { title: '徐家汇公园', note: '散步先从绿意和水边开始' },
      { title: '衡山路', note: '沿着梧桐树往北走，找一家氛围舒服的餐厅' },
      { title: '徐家汇天主堂', note: '在灯光下看一会儿钟楼，再慢慢返程' },
    ],
    note: '适合偏安静的约会，也适合雨后有一点凉意的晚上。',
  },
]

export function parseRestaurantJson(input) {
  let restaurant

  try {
    restaurant = JSON.parse(input)
  } catch {
    throw new Error('JSON 格式不正确，请检查括号和引号')
  }

  if (!restaurant || Array.isArray(restaurant) || typeof restaurant !== 'object') {
    throw new Error('请导入一条餐厅对象数据')
  }

  const name = typeof restaurant.name === 'string' ? restaurant.name.trim() : ''
  if (!name) {
    throw new Error('请至少填写餐厅名称')
  }

  const address = typeof restaurant.address === 'string' ? restaurant.address.trim() : ''

  return {
    name,
    area: typeof restaurant.area === 'string' ? restaurant.area.trim() : '',
    ...(address ? { address } : {}),
    tags: Array.isArray(restaurant.tags)
      ? restaurant.tags.filter((tag) => typeof tag === 'string' && tag.trim()).map((tag) => tag.trim())
      : [],
  }
}
