import { useEffect, useState } from 'react'

type Stage = { title: string; desc: string; command: string }
const stages: Stage[] = [
  { title: 'Checkout', desc: 'Tải mã nguồn từ repository', command: 'actions/checkout@v4' },
  { title: 'Typecheck', desc: 'Cài thư viện và kiểm tra TypeScript', command: 'npm run typecheck' },
  { title: 'Build', desc: 'Vite biên dịch mã nguồn thành dist', command: 'npm run build' },
  { title: 'Deploy', desc: 'Triển khai bản build lên GitHub Pages', command: 'actions/deploy-pages@v4' }
]

export default function App() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setStep(old => {
        if (old >= stages.length) {
          setPlaying(false)
          return stages.length + 1
        }
        return old + 1
      })
    }, 900)
    return () => window.clearInterval(timer)
  }, [playing])

  const run = () => { setStep(1); setPlaying(true) }
  return (
    <div className="site">
      <header className="header container">
        <a className="brand" href="#"><span className="brand-icon">&lt;/&gt;</span> CI/CD <span>Lab.</span></a>
        <a className="source" href="https://github.com/HoangTouliverBN/github-pages-cicd-demo" target="_blank" rel="noreferrer">Xem mã nguồn ↗</a>
      </header>
      <main className="container">
        <section className="hero">
          <span className="overline">BÀI THỰC HÀNH • REACT + TYPESCRIPT + VITE</span>
          <h1>Code. Build. <em>Deploy.</em></h1>
          <p>Khám phá quy trình CI/CD thực tế: từ một lần push mã nguồn lên GitHub đến khi website được xuất bản tự động bằng GitHub Actions và GitHub Pages.</p>
          <div className="buttons">
            <button onClick={run} disabled={playing}>{playing ? 'Đang mô phỏng…' : '▶ Mô phỏng pipeline'}</button>
            <a className="outline" href="https://github.com/HoangTouliverBN/github-pages-cicd-demo/actions" target="_blank" rel="noreferrer">Xem Actions thật ↗</a>
          </div>
          <p className="note">Lưu ý: nút mô phỏng chỉ trình diễn giao diện. Kết quả CI/CD thật nằm trong tab Actions của repository.</p>
        </section>
        <section className="pipeline">
          <div className="pipeline-head">
            <div><span className="overline">PIPELINE OVERVIEW</span><h2>Quy trình triển khai</h2></div>
            <span className="pill">{playing ? '● Đang chạy demo' : step > stages.length ? '✓ Demo hoàn tất' : '● Sẵn sàng'}</span>
          </div>
          <div className="cards">
            {stages.map((stage, i) => {
              const status = step > i + 1 ? 'done' : step === i + 1 && playing ? 'active' : ''
              return <article className={'stage ' + status} key={stage.title}>
                <div className="step-meta"><span>0{i + 1}</span><span>{status === 'done' ? '✓' : status === 'active' ? '↻' : '○'}</span></div>
                <h3>{stage.title}</h3><p>{stage.desc}</p><code>{stage.command}</code>
              </article>
            })}
          </div>
          <div className="terminal"><span className="dots">● ● ●</span> {playing ? 'Pipeline demo đang chạy…' : step > stages.length ? '✓ Đã hoàn thành mô phỏng (không phải kết quả Actions)' : '› Nhấn nút Mô phỏng pipeline để bắt đầu.'}</div>
        </section>
        <section className="details">
          <article><span className="overline">TECH STACK</span><h2>Công nghệ sử dụng</h2><div className="tags"><span>React</span><span>TypeScript</span><span>Vite</span><span>GitHub Actions</span><span>GitHub Pages</span></div></article>
          <article><span className="overline">CONTINUOUS DEPLOYMENT</span><h2>Push là triển khai</h2><p>Khi push lên <code>main</code>, workflow tự cài thư viện, kiểm tra TypeScript, build và xuất bản thư mục <code>dist</code>.</p></article>
        </section>
      </main>
      <footer className="container foot">CI/CD Lab · Quản trị dự án công nghệ thông tin (BS2025.2A01) <span>GitHub Pages Demo</span></footer>
    </div>
  )
}
