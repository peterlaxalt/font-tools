"use client"

import { useState } from "react"
import { Inter } from "next/font/google"
import AxisControl from "@/components/axis-control"
import CharacterDisplay from "@/components/character-display"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [character, setCharacter] = useState("X")
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
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [globalCSS, setGlobalCSS] = useState("font-size: 15vh;")

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

  return (
    <main className="min-h-screen p-8">
      <h1 className={`text-3xl font-bold mb-6 ${inter.className}`}>Variable Font Visualizer</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`md:col-span-1 space-y-6 bg-gray-50 p-6 rounded-lg ${inter.className}`}>
          <div>
            <label htmlFor="character" className="block text-sm font-medium mb-1">
              Character
            </label>
            <input
              type="text"
              id="character"
              value={character}
              onChange={(e) => setCharacter(e.target.value.charAt(0) || "X")}
              className="w-full p-2 border rounded"
              maxLength={1}
            />
          </div>

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
            <label htmlFor="backgroundColor" className="block text-sm font-medium mb-1">
              Background Color
            </label>
            <div className="flex">
              <input
                type="color"
                id="backgroundColor"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="h-10 w-10 border rounded"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="ml-2 flex-1 p-2 border rounded"
              />
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

        <div className="md:col-span-2">
          <CharacterDisplay
            character={character}
            fontFamily={fontFamily}
            axes={axes}
            backgroundColor={backgroundColor}
            globalCSS={globalCSS}
          />
        </div>
      </div>
    </main>
  )
}

