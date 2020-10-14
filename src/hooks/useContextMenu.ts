import { RefObject, useEffect, useRef, useState } from 'react'

export function useContextMenuEvent(refEl: RefObject<HTMLElement>, callback: (e: MouseEvent) => void ) {
  const savedHandler = useRef<typeof callback>()
  
  useEffect(() => {
    savedHandler.current = callback
  }, [callback])

  useEffect(() => {
    const element = refEl.current
    if (!(element && element.addEventListener)) {
      return
    }
    
    const eventListener = (event: MouseEvent) => savedHandler.current!(event)
    element.addEventListener('contextmenu', eventListener)
    return () => {
      element.removeEventListener('contextmenu', eventListener)
    }
  }, [])
}