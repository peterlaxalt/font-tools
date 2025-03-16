"use client"

import { useState, useEffect, useRef } from "react"
import { Inter } from "next/font/google"
import AxisControl from "@/components/axis-control"
import CharacterDisplay from "@/components/character-display"
import CharacterSettings from "@/components/character-settings"

const inter = Inter({ subsets: ["latin"] })

interface CharacterConfig {
  backgroundColor: string
  css: string
}

export default function Home() {
  const [characters, setCharacters] = useState("X")
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [intervalDuration, setIntervalDuration] = useState(1500)
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif")
  const [axes, setAxes] = useState([
    {
      id: crypto.randomUUID(),
      name: "wght",
      min: 0,
      max: 1000,
      steps: 9,
      css: "color: transparent; -webkit-text-stroke: 2px black; text-stroke: 2px black;",
    },
  ])
  const [globalCSS, setGlobalCSS] = useState("font-size: 65vh;")

  // Store settings for each character
  const [characterSettings, setCharacterSettings] = useState<Record<string, CharacterConfig>>({
    X: { backgroundColor: "#ffffff", css: "" },
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize settings for new characters
  useEffect(() => {
    const newSettings = { ...characterSettings }

    // Add settings for any new characters
    for (const char of characters) {
      if (!newSettings[char]) {
        newSettings[char] = {
          backgroundColor: "#ffffff",
          css: "",
        }
      }
    }

    setCharacterSettings(newSettings)
  }, [characters])

  // Handle character animation
  useEffect(() => {
    if (characters.length <= 1 || isAnimationPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setCurrentCharIndex((prevIndex) => (prevIndex + 1) % characters.length)
    }, intervalDuration)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [characters, intervalDuration, isAnimationPaused])

  const addAxis = () => {
    setAxes([
      ...axes,
      {
        id: crypto.randomUUID(),
        name: "wght",
        min: 0,
        max: 1000,
        steps: 9,
        css: "color: transparent; -webkit-text-stroke: 2px black; text-stroke: 2px black;",
      },
    ])
  }

  const updateAxis = (id: string, field: string, value: string | number) => {
    setAxes(
      axes.map((axis) => {
        if (axis.id === id) {
          return { ...axis, [field]: value }
        }
        return axis
      }),
    )
  }

  const removeAxis = (id: string) => {
    setAxes(axes.filter((axis) => axis.id !== id))
  }

  const updateCharacterSetting = (char: string, field: string, value: string) => {
    setCharacterSettings((prev) => ({
      ...prev,
      [char]: {
        ...prev[char],
        [field]: value,
      },
    }))
  }

  const toggleAnimation = () => {
    setIsAnimationPaused((prev) => !prev)
  }

  const resetAnimation = () => {
    setCurrentCharIndex(0)
    setIsAnimationPaused(false)
  }

  // Get current character and its settings
  const currentChar = characters[currentCharIndex] || "X"
  const currentSettings = characterSettings[currentChar] || { backgroundColor: "#ffffff", css: "" }

  return (
    <main className="min-h-screen p-0">
      <div className="grid grid-cols-[350px_1fr] gap-0">
        <div className={`space-y-6 bg-gray-50 p-6 ${inter.className}`}>
          <div>
            <label htmlFor="characters" className="block text-sm font-medium mb-1">
              Characters
            </label>
            <input
              type="text"
              id="characters"
              value={characters}
              onChange={(e) => setCharacters(e.target.value || "X")}
              className="w-full p-2 border rounded"
              placeholder="Enter one or more characters"
            />
            <p className="text-xs text-gray-500 mt-1">Enter multiple characters to create an animation loop</p>
          </div>

          {characters.length > 1 && (
            <div>
              <label htmlFor="intervalDuration" className="block text-sm font-medium mb-1">
                Animation Interval (ms)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="intervalDuration"
                  value={intervalDuration}
                  onChange={(e) => setIntervalDuration(Math.max(100, Number.parseInt(e.target.value) || 1500))}
                  className="flex-1 p-2 border rounded"
                  min="100"
                />
                <button onClick={toggleAnimation} className="px-3 py-2 bg-blue-500 text-white rounded">
                  {isAnimationPaused ? "Play" : "Pause"}
                </button>
                <button onClick={resetAnimation} className="px-3 py-2 bg-gray-500 text-white rounded">
                  Reset
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Currently showing: {currentChar} ({currentCharIndex + 1}/{characters.length})
              </p>
            </div>
          )}

          <div>
            <label htmlFor="fontFamily" className="block text-sm font-medium mb-1">
              Font Family
            </label>
            <input
              type="text"
              id="fontFamily"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g. 'My Font', sans-serif"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the exact font-family CSS string to use your locally installed fonts
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Axis Controls</h2>
              <button onClick={addAxis} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                Add Axis
              </button>
            </div>

            <div className="space-y-4">
              {axes.map((axis) => (
                <AxisControl
                  key={axis.id}
                  axis={axis}
                  onChange={(field, value) => updateAxis(axis.id, field, value)}
                  onRemove={() => removeAxis(axis.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Character Settings</h2>
            <div className="space-y-4">
              {characters.split("").map((char) => (
                <CharacterSettings
                  key={char}
                  character={char}
                  settings={characterSettings[char] || { backgroundColor: "#ffffff", css: "" }}
                  onChange={updateCharacterSetting}
                />
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="globalCSS" className="block text-sm font-medium mb-1">
              Global CSS
            </label>
            <textarea
              id="globalCSS"
              value={globalCSS}
              onChange={(e) => setGlobalCSS(e.target.value)}
              className="w-full p-2 border rounded h-24 font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <CharacterDisplay
            character={currentChar}
            fontFamily={fontFamily}
            axes={axes}
            backgroundColor={currentSettings.backgroundColor}
            characterCSS={currentSettings.css}
            globalCSS={globalCSS}
          />
        </div>
      </div>
    </main>
  )
}

