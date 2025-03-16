"use client"

import { useEffect, useRef, useState } from "react"

interface FontVariable {
  name: string
  min: number
  max: number
  default: number
}

// Update the VariableFontGridProps interface to include speed and gridRatio
interface VariableFontGridProps {
  rows: number
  cols: number
  rowChars: string[]
  colChars: string[]
  cellOverrides: Record<string, string>
  getCharForCell: (rowIndex: number, colIndex: number) => string
  fontFamily: string
  fontVariables: FontVariable[]
  increment: number
  delay: number
  speed: number // Add speed property
  isPlaying: boolean
  customCSS: string
  foregroundColor: string
  backgroundColor: string
  gridRatio: string // Add gridRatio property
}

export function VariableFontGrid({
  rows,
  cols,
  rowChars,
  colChars,
  cellOverrides,
  getCharForCell,
  fontFamily,
  fontVariables,
  increment,
  delay,
  speed, // Add speed
  isPlaying,
  customCSS,
  foregroundColor,
  backgroundColor,
  gridRatio, // Add gridRatio
}: VariableFontGridProps) {
  const [gridValues, setGridValues] = useState<number[][]>([])
  const [animationPhase, setAnimationPhase] = useState(0)
  const animationRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)

  // Initialize grid values
  useEffect(() => {
    const newGrid: number[][] = []
    for (let i = 0; i < rows; i++) {
      newGrid[i] = []
      for (let j = 0; j < cols; j++) {
        newGrid[i][j] = 0 // Start with default values
      }
    }
    setGridValues(newGrid)
  }, [rows, cols])

  // Animation logic - update to include speed
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateTimeRef.current >= delay) {
        lastUpdateTimeRef.current = timestamp
        // Use speed as a multiplier for the animation phase increment
        setAnimationPhase((prev) => (prev + 1 * speed) % 100)
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, delay, speed]) // Add speed to dependencies

  // Calculate font variation settings for each cell based on animation phase
  const getCellStyle = (rowIndex: number, colIndex: number) => {
    const fontVariationSettings = fontVariables
      .map((variable) => {
        // Calculate wave effect based on row and column position
        const rowProgress = rowIndex / (rows - 1)
        const colProgress = colIndex / (cols - 1)

        // Create a wave effect that propagates through the grid
        const waveOffset = (rowProgress + colProgress) * 50
        const wavePhase = (animationPhase + waveOffset) % 100

        // Convert to a sine wave between 0 and 1
        const waveValue = (Math.sin((wavePhase / 100) * Math.PI * 2) + 1) / 2

        // Map the wave value to the font variable range
        const value = variable.min + waveValue * (variable.max - variable.min)

        return `"${variable.name}" ${Math.round(value)}`
      })
      .join(", ")

    return {
      fontFamily: `"${fontFamily}", sans-serif`,
      fontVariationSettings,
      color: foregroundColor,
    }
  }

  // Parse the grid ratio to set the aspect ratio
  const getGridRatioStyle = () => {
    const [width, height] = gridRatio.split(":").map(Number)
    return {
      aspectRatio: `${width} / ${height}`,
    }
  }

  // Custom CSS as a style object
  const parseCustomCSS = () => {
    try {
      const cssText = customCSS.trim()
      if (!cssText) return {}

      // Simple CSS parser (for demonstration)
      const styleObj: Record<string, string> = {}
      const rules = cssText.split(";")

      rules.forEach((rule) => {
        const [property, value] = rule.split(":").map((s) => s.trim())
        if (property && value) {
          // Convert kebab-case to camelCase for React
          const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
          styleObj[camelProperty] = value
        }
      })

      return styleObj
    } catch (e) {
      console.error("Error parsing custom CSS:", e)
      return {}
    }
  }

  const customStyles = parseCustomCSS()

  return (
    <div className="flex-1 overflow-auto p-4 rounded-lg flex items-center justify-center" style={{ backgroundColor }}>
      <div className="w-full max-w-full max-h-full" style={getGridRatioStyle()}>
        <div
          className="grid w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: "4px",
          }}
        >
          {Array.from({ length: rows }).map((_, rowIndex) =>
            Array.from({ length: cols }).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="flex items-center justify-center text-4xl md:text-6xl lg:text-8xl"
                style={{
                  ...getCellStyle(rowIndex, colIndex),
                  ...customStyles,
                }}
              >
                {getCharForCell(rowIndex, colIndex)}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  )
}

