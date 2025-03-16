"use client"

import { useState, useEffect } from "react"

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDark)

    // Set initial colors based on theme
    if (prefersDark) {
      setForegroundColor("#ffffff")
      setBackgroundColor("#000000")
    } else {
      setForegroundColor("#000000")
      setBackgroundColor("#ffffff")
    }

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
      if (e.matches) {
        setForegroundColor("#ffffff")
        setBackgroundColor("#000000")
      } else {
        setForegroundColor("#000000")
        setBackgroundColor("#ffffff")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return {
    isDarkMode,
    foregroundColor,
    backgroundColor,
    setForegroundColor,
    setBackgroundColor,
  }
}

