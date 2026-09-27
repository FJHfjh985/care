import { useEffect, useState } from 'react'
import { areaOptions, parseRestaurantJson } from './data'

const jsonTemplate = `{
  "name": "餐厅名称",
  "area": "西岸滨江",
  "address": "详细地址（可选）",
  "tags": ["安静舒适", "晚饭"]
}`

function PinIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-5.26 7-12A7 7 0 1 0 5 9c0 6.74 7 12 7 12Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function ArrowIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MoonIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.2 15.1A8.7 8.7 0 0 1 8.9 3.8 8.7 8.7 0 1 0 20.2 15.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AreaArtwork({ area, compact = false, routeNumber = '' }) {
  return (
    <div
      className={`area-artwork ${compact ? 'area-artwork--compact' : ''}`}
      style={{ '--accent': area.accent, '--shade': area.shade, '--photo-position': area.imagePosition }}
    >
      <img
        className="area-photo"
        src={area.imageUrl}
        alt={`${area.name}实景`}
        loading={compact ? 'lazy' : 'eager'}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(event) => event.currentTarget.classList.add('area-photo--unavailable')}
      />
      <span className="photo-grain" aria-hidden="true" />
      <span className="artwork-caption" aria-hidden="true">{routeNumber ? `ROUTE ${routeNumber}` : 'SHANGHAI NIGHT'}</span>
    </div>
  )
}

function App() {
  const [selectedArea, setSelectedArea] = useState(null)
  const [isImportOpen, setIsImportOpen] = useState(false)
  const [jsonInput, setJsonInput] = useState(jsonTemplate)
  const [importError, setImportError] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const areaRestaurants = selectedArea
    ? restaurants.filter((restaurant) => restaurant.area === selectedArea.name)
    : []

  const openImport = () => {
    setImportError('')
    setJsonInput(jsonTemplate.replace('西岸滨江', selectedArea?.name ?? '区域名称'))
    setIsImportOpen(true)
  }

  const handleImport = () => {
    try {
      const restaurant = parseRestaurantJson(jsonInput)
      setRestaurants((current) => [
        ...current,
        { ...restaurant, area: restaurant.area || selectedArea?.name || '' },
      ])
      setIsImportOpen(false)
      setImportError('')
    } catch (error) {
      setImportError(error.message)
    }
  }

  const chooseArea = (area) => {
    setSelectedArea(area)
  }

  if (selectedArea) {
    return (
      <main className="site-frame min-h-screen px-4 py-4 sm:px-6 sm:py-6">
        <section className="page-shell page-shell--detail mx-auto max-w-6xl overflow-hidden">
          <header className="guide-header flex items-center justify-between px-5 py-5 sm:px-8">
            <button className="back-button" type="button" onClick={() => setSelectedArea(null)}>
              <span aria-hidden="true">←</span>
              返回选地点
            </button>
            <button
              className="theme-button"
              type="button"
              aria-label={theme === 'light' ? '切换到深色主题' : '切换到浅色主题'}
              onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            >
              <MoonIcon className="h-4 w-4" />
            </button>
          </header>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="detail-art-panel p-5 sm:p-8 lg:p-10">
              <div className="detail-label mb-7 flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[var(--text-muted)]">
                <PinIcon className="h-4 w-4" />
                SHANGHAI NIGHT GUIDE
              </div>
              <AreaArtwork area={selectedArea} />
              <p className="mt-6 max-w-md text-sm leading-7 text-[var(--text-muted)]">{selectedArea.note}</p>
            </div>

            <div className="px-5 pb-8 pt-2 sm:px-8 sm:pb-10 lg:px-10 lg:pt-10">
              <p className="section-kicker">路线详情</p>
              <h1 className="display-title mt-2 text-4xl sm:text-5xl">{selectedArea.name}</h1>
              <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">{selectedArea.description}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="soft-pill">{selectedArea.subtitle}</span>
                <span className="soft-pill">{selectedArea.duration}</span>
              </div>

              <section className="mt-10">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="section-title">沿途安排</h2>
                  <span className="text-xs tracking-[0.12em] text-[var(--text-muted)]">按时间灵活调整</span>
                </div>
                <ol className="route-list mt-5">
                  {selectedArea.route.map((stop, index) => (
                    <li key={stop.title} className="route-stop">
                      <span className="route-index" style={{ '--area-accent': selectedArea.accent }}>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h3 className="font-semibold text-[var(--text)]">{stop.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{stop.note}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="restaurant-section mt-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="section-title">附近餐厅</h2>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">可导入自己的收藏，做成更实用的路线</p>
                  </div>
                  <button className="import-button" type="button" onClick={openImport}>＋ 导入餐厅</button>
                </div>

                {areaRestaurants.length === 0 ? (
                  <div className="restaurant-empty mt-5">
                    <span className="empty-dot" style={{ background: selectedArea.accent }} />
                    <p>餐厅信息将在这里出现</p>
                  </div>
                ) : (
                  <div className="mt-5 grid gap-3">
                    {areaRestaurants.map((restaurant) => (
                      <article className="restaurant-card" key={`${restaurant.name}-${restaurant.address}`}>
                        <div>
                          <h3 className="font-semibold text-[var(--text)]">{restaurant.name}</h3>
                          {restaurant.address && <p className="mt-1 text-sm text-[var(--text-muted)]">{restaurant.address}</p>}
                        </div>
                        {restaurant.tags.length > 0 && (
                          <div className="flex flex-wrap justify-end gap-1.5">
                            {restaurant.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </section>

        {isImportOpen && (
          <div className="modal-backdrop" role="presentation" onMouseDown={() => setIsImportOpen(false)}>
            <section className="import-modal" role="dialog" aria-modal="true" aria-labelledby="import-title" onMouseDown={(event) => event.stopPropagation()}>
              <button className="modal-close" type="button" aria-label="关闭导入窗口" onClick={() => setIsImportOpen(false)}>×</button>
              <p className="section-kicker">餐厅数据</p>
              <h2 id="import-title" className="display-title mt-1 text-3xl">导入一间餐厅</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">粘贴一条 JSON 数据；导入后仅保存在当前浏览器中。</p>
              <textarea className="json-input mt-5" value={jsonInput} onChange={(event) => setJsonInput(event.target.value)} spellCheck="false" aria-label="餐厅 JSON 数据" />
              {importError && <p className="mt-3 text-sm text-[var(--error)]" role="alert">{importError}</p>}
              <div className="mt-5 flex justify-end gap-3">
                <button className="secondary-button" type="button" onClick={() => setIsImportOpen(false)}>取消</button>
                <button className="primary-button" type="button" onClick={handleImport}>确认导入</button>
              </div>
            </section>
          </div>
        )}
      </main>
    )
  }

  return (
    <main className="site-frame min-h-screen px-4 py-4 sm:px-6 sm:py-6">
      <section className="page-shell mx-auto max-w-6xl overflow-hidden">
        <header className="guide-header flex items-center justify-between px-5 py-5 sm:px-8">
          <div className="brand-lockup">
            <span className="brand-mark">上海夜行路线</span>
            <span className="brand-subtitle">SHANGHAI NIGHT GUIDE</span>
          </div>
          <button
            className="theme-button"
            type="button"
            aria-label={theme === 'light' ? '切换到深色主题' : '切换到浅色主题'}
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
          >
            <MoonIcon className="h-4 w-4" />
          </button>
        </header>

        <div className="hero-grid border-t border-[var(--line)]">
          <div className="hero-copy px-5 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-16 lg:px-12 lg:pb-16">
            <p className="section-kicker">从华东师范大学闵行校区出发</p>
            <h1 className="display-title mt-4 max-w-xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">今晚去哪？</h1>
            <p className="mt-6 max-w-md text-base leading-8 text-[var(--text-muted)]">晚饭、散步、看展，选一个方向，把今晚安排得清楚一点。</p>
            <div className="mt-9 flex items-center gap-3 text-sm text-[var(--text-muted)]">
              <span className="pulse-dot" />
              已整理 5 条夜间路线
            </div>
          </div>

          <div className="hero-map p-5 sm:p-8 lg:p-10" aria-hidden="true">
            <div className="map-orbit map-orbit--one" />
            <div className="map-orbit map-orbit--two" />
            <div className="map-river" />
            {areaOptions.map((area, index) => (
              <span className={`map-pin map-pin--${index + 1}`} key={area.id} style={{ '--pin': area.accent }} />
            ))}
            <div className="map-caption">从闵行出发<br />去见上海的另一面</div>
          </div>
        </div>

        <section className="routes-section border-t border-[var(--line)] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">选择今晚的城市切面</p>
              <h2 className="section-title mt-2">五个方向，五种心情</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[var(--text-muted)]">每条路线标出主要停靠点；根据天气、时间和人流自行调整。</p>
          </div>

          <div className="area-grid mt-8">
            {areaOptions.map((area, index) => (
              <button className="area-card group text-left" type="button" key={area.id} onClick={() => chooseArea(area)} aria-label={`查看${area.name}路线`} style={{ '--card-delay': `${index * 70}ms` }}>
                <AreaArtwork area={area} compact routeNumber={String(index + 1).padStart(2, '0')} />
                <div className="area-card-content mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-[var(--text)]">{area.name}</h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{area.subtitle}</p>
                  </div>
                  <span className="card-arrow" style={{ '--area-accent': area.accent }}><ArrowIcon className="h-4 w-4" /></span>
                </div>
                <div className="area-card-duration mt-5 border-t border-[var(--line)] pt-4 text-xs font-medium tracking-[0.08em] text-[var(--text-muted)]">{area.duration}<span>查看路线</span></div>
              </button>
            ))}
          </div>
        </section>

        <footer className="site-footer flex flex-col gap-2 border-t border-[var(--line)] px-5 py-6 text-xs text-[var(--text-muted)] sm:flex-row sm:justify-between sm:px-8 lg:px-12">
          <span>上海夜行路线</span>
          <span>晚饭 · 散步 · 看展</span>
        </footer>
      </section>
    </main>
  )
}

export default App
