"use client"

import { useState, useEffect, useRef } from "react"
import { VariableFontGrid } from "@/components/variable-font-grid"
import { Controls } from "@/components/controls"
import { useTheme } from "@/hooks/use-theme"

// Configuration
const FULLSCREEN_PADDING = 20 // px from window edge

export default function Home() {
  // Grid state
  const [rows, setRows] = useState(5)
  const [cols, setCols] = useState(5)
  const [rowChars, setRowChars] = useState<string[]>(Array(rows).fill("A"))
  const [colChars, setColChars] = useState<string[]>(Array(cols).fill("A"))
  const [cellOverrides, setCellOverrides] = useState<Record<string, string>>({})
  const [gridRatio, setGridRatio] = useState("1:1")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })
  const [scale, setScale] = useState(1)

  // Font settings
  const [fontFamily, setFontFamily] = useState("Marlette")
  const [fontVariables, setFontVariables] = useState([{ name: "wght", min: 100, max: 900, default: 400 }])

  // Animation settings
  const [increment, setIncrement] = useState(5)
  const [delay, setDelay] = useState(100)
  const [speed, setSpeed] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  // Custom CSS
  const [customCSS, setCustomCSS] = useState("")

  // Theme
  const { isDarkMode, foregroundColor, backgroundColor, setForegroundColor, setBackgroundColor } = useTheme()

  // Refs for animation
  const gridRef = useRef<HTMLDivElement>(null)
  const fullscreenRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()

  // Update row/col chars when rows/cols change
  useEffect(() => {
    setRowChars((prev) => {
      const newChars = [...prev]
      while (newChars.length < rows) newChars.push("A")
      return newChars.slice(0, rows)
    })
  }, [rows])

  useEffect(() => {
    setColChars((prev) => {
      const newChars = [...prev]
      while (newChars.length < cols) newChars.push("A")
      return newChars.slice(0, cols)
    })
  }, [cols])

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Calculate scale when fullscreen opens or window resizes
  useEffect(() => {
    if (isFullscreen) {
      const calculateScale = () => {
        const maxWidth = window.innerWidth - (FULLSCREEN_PADDING * 2)
        const maxHeight = window.innerHeight - (FULLSCREEN_PADDING * 2)
        const widthScale = maxWidth / originalDimensions.width
        const heightScale = maxHeight / originalDimensions.height
        setScale(Math.min(widthScale, heightScale))
      }

      calculateScale()
      window.addEventListener('resize', calculateScale)
      return () => window.removeEventListener('resize', calculateScale)
    }
  }, [isFullscreen, originalDimensions])

  // Store original dimensions when opening fullscreen
  const handleFullscreenOpen = () => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect()
      setOriginalDimensions({
        width: rect.width,
        height: rect.height
      })
      setIsFullscreen(true)
    }
  }

  const addRow = () => setRows((r) => r + 1)
  const removeRow = () => setRows((r) => Math.max(1, r - 1))
  const addCol = () => setCols((c) => c + 1)
  const removeCol = () => setCols((c) => Math.max(1, c - 1))

  const updateRowChar = (index: number, char: string) => {
    setRowChars((prev) => {
      const newChars = [...prev]
      newChars[index] = char || "A"
      return newChars
    })
  }

  const updateColChar = (index: number, char: string) => {
    setColChars((prev) => {
      const newChars = [...prev]
      newChars[index] = char || "A"
      return newChars
    })
  }

  const updateCellChar = (rowIndex: number, colIndex: number, char: string) => {
    setCellOverrides((prev) => ({
      ...prev,
      [`${rowIndex}-${colIndex}`]: char || "A",
    }))
  }

  const getCharForCell = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`
    if (cellOverrides[cellKey]) {
      return cellOverrides[cellKey]
    }
    return rowChars[rowIndex] || colChars[colIndex] || "A"
  }

  const addFontVariable = () => {
    setFontVariables([...fontVariables, { name: "", min: 0, max: 1000, default: 500 }])
  }

  const removeFontVariable = (index: number) => {
    setFontVariables(fontVariables.filter((_, i) => i !== index))
  }

  const updateFontVariable = (index: number, field: string, value: any) => {
    setFontVariables(fontVariables.map((variable, i) => (i === index ? { ...variable, [field]: value } : variable)))
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Variable Font Animator</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <Controls
          rows={rows}
          cols={cols}
          rowChars={rowChars}
          colChars={colChars}
          cellOverrides={cellOverrides}
          fontFamily={fontFamily}
          fontVariables={fontVariables}
          increment={increment}
          delay={delay}
          speed={speed}
          isPlaying={isPlaying}
          customCSS={customCSS}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          gridRatio={gridRatio}
          addRow={addRow}
          removeRow={removeRow}
          addCol={addCol}
          removeCol={removeCol}
          updateRowChar={updateRowChar}
          updateColChar={updateColChar}
          updateCellChar={updateCellChar}
          setFontFamily={setFontFamily}
          addFontVariable={addFontVariable}
          removeFontVariable={removeFontVariable}
          updateFontVariable={updateFontVariable}
          setIncrement={setIncrement}
          setDelay={setDelay}
          setSpeed={setSpeed}
          setIsPlaying={setIsPlaying}
          setCustomCSS={setCustomCSS}
          setForegroundColor={setForegroundColor}
          setBackgroundColor={setBackgroundColor}
          setGridRatio={setGridRatio}
        />

        <div className="relative flex-1" ref={gridRef}>
          <button
            onClick={handleFullscreenOpen}
            className="absolute top-2 right-2 z-10 px-3 py-1 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70"
          >
            Fullscreen
          </button>
          <VariableFontGrid
            rows={rows}
            cols={cols}
            rowChars={rowChars}
            colChars={colChars}
            cellOverrides={cellOverrides}
            getCharForCell={getCharForCell}
            fontFamily={fontFamily}
            fontVariables={fontVariables}
            increment={increment}
            delay={delay}
            speed={speed}
            isPlaying={isPlaying}
            customCSS={customCSS}
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
            gridRatio={gridRatio}
          />
        </div>
      </div>

      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          }}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-10 px-3 py-1 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70"
          >
            Close
          </button>
          <div 
            ref={fullscreenRef} 
            style={{
              width: originalDimensions.width,
              height: originalDimensions.height,
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              backgroundColor: backgroundColor
            }}
          >
            <VariableFontGrid
              rows={rows}
              cols={cols}
              rowChars={rowChars}
              colChars={colChars}
              cellOverrides={cellOverrides}
              getCharForCell={getCharForCell}
              fontFamily={fontFamily}
              fontVariables={fontVariables}
              increment={increment}
              delay={delay}
              speed={speed}
              isPlaying={isPlaying}
              customCSS={customCSS}
              foregroundColor={foregroundColor}
              backgroundColor={backgroundColor}
              gridRatio={gridRatio}
            />
          </div>
        </div>
      )}
    </main>
  )
}
