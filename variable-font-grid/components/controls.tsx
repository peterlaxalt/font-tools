"use client"

import { useState } from "react"

interface FontVariable {
  name: string
  min: number
  max: number
  default: number
}

// Add gridRatio to the ControlsProps interface
interface ControlsProps {
  rows: number
  cols: number
  rowChars: string[]
  colChars: string[]
  cellOverrides: Record<string, string>
  fontFamily: string
  fontVariables: FontVariable[]
  increment: number
  delay: number
  speed: number
  isPlaying: boolean
  customCSS: string
  foregroundColor: string
  backgroundColor: string
  gridRatio: string
  addRow: () => void
  removeRow: () => void
  addCol: () => void
  removeCol: () => void
  updateRowChar: (index: number, char: string) => void
  updateColChar: (index: number, char: string) => void
  updateCellChar: (rowIndex: number, colIndex: number, char: string) => void
  setFontFamily: (value: string) => void
  addFontVariable: () => void
  removeFontVariable: (index: number) => void
  updateFontVariable: (index: number, field: string, value: any) => void
  setIncrement: (value: number) => void
  setDelay: (value: number) => void
  setSpeed: (value: number) => void
  setIsPlaying: (value: boolean) => void
  setCustomCSS: (value: string) => void
  setForegroundColor: (value: string) => void
  setBackgroundColor: (value: string) => void
  setGridRatio: (value: string) => void
}

// Update the colorThemes array with more vibrant options
const colorThemes = [
  { name: "Light", foreground: "#000000", background: "#ffffff" },
  { name: "Dark", foreground: "#ffffff", background: "#000000" },
  { name: "Neon", foreground: "#00ff99", background: "#1a0033" },
  { name: "Candy", foreground: "#ff3399", background: "#ffe6f2" },
  { name: "Electric", foreground: "#ffff00", background: "#0000cc" },
  { name: "Sunset", foreground: "#ffffff", background: "linear-gradient(135deg, #ff6b6b, #556270)" },
  { name: "Mint", foreground: "#00cc99", background: "#f0fff4" },
  { name: "Bubblegum", foreground: "#9933ff", background: "#ffccff" },
  { name: "Ocean", foreground: "#ffffff", background: "#0a192f" },
  { name: "Forest", foreground: "#ffffff", background: "#2d3b2d" },
]

// Add gridRatio options
const gridRatios = [
  { name: "Square (1:1)", value: "1:1" },
  { name: "Instagram Reels (4:5)", value: "4:5" },
  { name: "Instagram Story (9:16)", value: "9:16" },
]

// Update the Controls component to include the new props
export function Controls({
  rows,
  cols,
  rowChars,
  colChars,
  cellOverrides,
  fontFamily,
  fontVariables,
  increment,
  delay,
  speed,
  isPlaying,
  customCSS,
  foregroundColor,
  backgroundColor,
  gridRatio,
  addRow,
  removeRow,
  addCol,
  removeCol,
  updateRowChar,
  updateColChar,
  updateCellChar,
  setFontFamily,
  addFontVariable,
  removeFontVariable,
  updateFontVariable,
  setIncrement,
  setDelay,
  setSpeed,
  setIsPlaying,
  setCustomCSS,
  setForegroundColor,
  setBackgroundColor,
  setGridRatio,
}: ControlsProps) {
  const [selectedTheme, setSelectedTheme] = useState("")

  const applyTheme = (themeName: string) => {
    const theme = colorThemes.find((t) => t.name === themeName)
    if (theme) {
      setForegroundColor(theme.foreground)
      setBackgroundColor(theme.background)
      setSelectedTheme(themeName)
    }
  }

  // Helper function to get cell value, ensuring it's never undefined
  const getCellValue = (rowIndex: number, colIndex: number): string => {
    const cellId = `${rowIndex}-${colIndex}`
    return cellOverrides[cellId] || rowChars[rowIndex] || colChars[colIndex] || "A"
  }

  // Add the grid ratio section and speed control to the Animation Settings section
  return (
    <div className="w-full md:w-96 space-y-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-y-auto max-h-[80vh]">
      <section>
        <h2 className="text-xl font-bold mb-2">Grid Configuration</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Grid Ratio</label>
          <select
            value={gridRatio}
            onChange={(e) => setGridRatio(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {gridRatios.map((ratio) => (
              <option key={ratio.value} value={ratio.value}>
                {ratio.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Rows: {rows}</label>
            <div className="flex gap-2">
              <button
                onClick={removeRow}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                disabled={rows <= 1}
              >
                -
              </button>
              <button onClick={addRow} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">Columns: {cols}</label>
            <div className="flex gap-2">
              <button
                onClick={removeCol}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                disabled={cols <= 1}
              >
                -
              </button>
              <button onClick={addCol} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Character Matrix</h3>
          <div className="overflow-auto max-h-64 border rounded">
            <table className="w-full border-collapse">
              <tbody>
                {/* Header row with column characters */}
                <tr>
                  <td className="p-1 border bg-gray-100 dark:bg-gray-700"></td>
                  {Array.from({ length: cols }).map((_, colIndex) => (
                    <td key={`header-col-${colIndex}`} className="p-1 border bg-gray-100 dark:bg-gray-700">
                      <input
                        type="text"
                        value={colChars[colIndex] || ""}
                        onChange={(e) => {
                          updateColChar(colIndex, e.target.value.charAt(0))
                        }}
                        maxLength={1}
                        className="w-full text-center bg-gray-100 dark:bg-gray-700"
                      />
                    </td>
                  ))}
                  <td className="p-1 border bg-gray-100 dark:bg-gray-700">
                    <div className="flex">
                      <button onClick={removeCol} className="px-1 text-red-500" disabled={cols <= 1}>
                        -
                      </button>
                      <button onClick={addCol} className="px-1 text-green-500">
                        +
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Matrix rows */}
                {Array.from({ length: rows }).map((_, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                    {/* Row header cell */}
                    <td className="p-1 border bg-gray-100 dark:bg-gray-700">
                      <input
                        type="text"
                        value={rowChars[rowIndex] || ""}
                        onChange={(e) => {
                          updateRowChar(rowIndex, e.target.value.charAt(0))
                        }}
                        maxLength={1}
                        className="w-full text-center bg-gray-100 dark:bg-gray-700"
                      />
                    </td>

                    {/* Matrix cells */}
                    {Array.from({ length: cols }).map((_, colIndex) => {
                      // Create a unique ID for this cell
                      const cellId = `${rowIndex}-${colIndex}`

                      return (
                        <td key={cellId} className="p-1 border">
                          <input
                            type="text"
                            value={getCellValue(rowIndex, colIndex)}
                            onChange={(e) => {
                              updateCellChar(rowIndex, colIndex, e.target.value.charAt(0))
                            }}
                            maxLength={1}
                            className="w-full text-center"
                          />
                        </td>
                      )
                    })}

                    {/* Row controls */}
                    {rowIndex === 0 && (
                      <td className="p-1 border bg-gray-100 dark:bg-gray-700 align-top" rowSpan={rows}>
                        <div className="flex flex-col h-full justify-between">
                          <button onClick={removeRow} className="px-1 text-red-500" disabled={rows <= 1}>
                            -
                          </button>
                          <button onClick={addRow} className="px-1 text-green-500">
                            +
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Font Settings</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Font Family</label>
          <input
            type="text"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Font Variables</h3>
            <button onClick={addFontVariable} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
              Add Variable
            </button>
          </div>

          {fontVariables.map((variable, index) => (
            <div key={`var-${index}`} className="mb-4 p-3 border rounded">
              <div className="flex justify-between mb-2">
                <label className="font-medium">Variable Name</label>
                <button onClick={() => removeFontVariable(index)} className="text-red-500">
                  Remove
                </button>
              </div>

              <input
                type="text"
                value={variable.name}
                onChange={(e) => updateFontVariable(index, "name", e.target.value)}
                placeholder="e.g. wght"
                className="w-full p-2 border rounded mb-2"
              />

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm">Min</label>
                  <input
                    type="number"
                    value={variable.min}
                    onChange={(e) => updateFontVariable(index, "min", Number.parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">Max</label>
                  <input
                    type="number"
                    value={variable.max}
                    onChange={(e) => updateFontVariable(index, "max", Number.parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">Default</label>
                  <input
                    type="number"
                    value={variable.default}
                    onChange={(e) => updateFontVariable(index, "default", Number.parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Animation Settings</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Increment: {increment}%</label>
          <input
            type="range"
            min="1"
            max="20"
            value={increment}
            onChange={(e) => setIncrement(Number.parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Delay: {delay}ms</label>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={delay}
            onChange={(e) => setDelay(Number.parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Speed: {speed}x</label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number.parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded ${
              isPlaying ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Appearance</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Color Theme</label>
          <select
            value={selectedTheme}
            onChange={(e) => applyTheme(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Custom</option>
            {colorThemes.map((theme) => (
              <option key={theme.name} value={theme.name}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={foregroundColor}
                onChange={(e) => {
                  setForegroundColor(e.target.value)
                  setSelectedTheme("")
                }}
                className="w-10 h-10 border-0"
              />
              <input
                type="text"
                value={foregroundColor}
                onChange={(e) => {
                  setForegroundColor(e.target.value)
                  setSelectedTheme("")
                }}
                className="flex-1 p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => {
                  setBackgroundColor(e.target.value)
                  setSelectedTheme("")
                }}
                className="w-10 h-10 border-0"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => {
                  setBackgroundColor(e.target.value)
                  setSelectedTheme("")
                }}
                className="flex-1 p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Custom CSS</label>
          <textarea
            value={customCSS}
            onChange={(e) => setCustomCSS(e.target.value)}
            placeholder="font-size: 2rem; letter-spacing: 0.1em;"
            className="w-full p-2 border rounded h-24 font-mono"
          />
        </div>
      </section>
    </div>
  )
}

