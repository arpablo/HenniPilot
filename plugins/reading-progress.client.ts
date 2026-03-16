export default defineNuxtPlugin(() => {
  const bar = document.createElement('div')
  bar.id = 'reading-progress'
  document.body.prepend(bar)

  const update = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const progress = scrollHeight === clientHeight
      ? 0
      : (scrollTop / (scrollHeight - clientHeight)) * 100
    bar.style.width = `${progress}%`
  }

  window.addEventListener('scroll', update, { passive: true })
  useRouter().afterEach(() => bar.style.width = '0%')
})
