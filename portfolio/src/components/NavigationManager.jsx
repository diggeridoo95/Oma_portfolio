import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const NavigationManager = () => {
  const { key } = useLocation()
  const navigationType = useNavigationType()
  const entries = useRef(new Map())
  const previousKey = useRef(null)

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  useLayoutEffect(() => {
    const main = document.getElementById('main-content')
    if (!main) return

    const savedEntry = entries.current.get(key)
    const hasNavigated = previousKey.current !== null && previousKey.current !== key
    previousKey.current = key

    if (hasNavigated) {
      const restoreEntry = navigationType === 'POP' ? savedEntry : null
      const previousLink = restoreEntry?.focusHref
        ? Array.from(main.querySelectorAll('a[href]')).find(
          (link) => link.getAttribute('href') === restoreEntry.focusHref,
        )
        : null

      // Focusing must not change the position that we are about to restore.
      const focusTarget = previousLink ?? main
      focusTarget.focus({ preventScroll: true })
      window.scrollTo({
        left: restoreEntry?.x ?? 0,
        top: restoreEntry?.y ?? 0,
        behavior: 'instant',
      })
    }

    const entry = {
      x: window.scrollX,
      y: window.scrollY,
      focusHref: main.contains(document.activeElement)
        ? document.activeElement.getAttribute('href')
        : null,
    }
    entries.current.set(key, entry)

    const savePosition = () => {
      entry.x = window.scrollX
      entry.y = window.scrollY
    }

    const saveFocus = () => {
      const activeElement = document.activeElement
      entry.focusHref = main.contains(activeElement)
        ? activeElement.getAttribute('href')
        : null
    }

    const saveClick = (event) => {
      // Capture the outgoing link before React Router changes the page.
      savePosition()
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (link && main.contains(link)) entry.focusHref = link.getAttribute('href')
    }

    window.addEventListener('scroll', savePosition, { passive: true })
    document.addEventListener('focusin', saveFocus)
    document.addEventListener('click', saveClick, true)

    return () => {
      // The old page's scroll position may already be clamped after its DOM is removed.
      // Keep the position saved by the listeners instead of reading it during cleanup.
      window.removeEventListener('scroll', savePosition)
      document.removeEventListener('focusin', saveFocus)
      document.removeEventListener('click', saveClick, true)
    }
  }, [key, navigationType])

  return null
}

export default NavigationManager
