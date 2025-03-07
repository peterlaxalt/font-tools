"use client"
import type { JSX } from "react"

interface CharacterDisplayProps {
  character: string
  fontFamily: string
  axes: {
    id: string
    name: string
    min: number
    max: number
    steps: number
    css: string
  }[]
  backgroundColor: string
  globalCSS: string
}

export default function CharacterDisplay({
  character,
  fontFamily,
  axes,
  backgroundColor,
  globalCSS,
}: CharacterDisplayProps) {
  // Generate character layers for each step of each axis
  const generateCharacterLayers = () => {
    const layers: JSX.Element[] = []

    axes.forEach((axis) => {
      const { name, min, max, steps, css } = axis
      const stepSize = (max - min) / (steps - 1)

      for (let i = 0; i < steps; i++) {
        const value = max - i * stepSize
        const style = {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontVariationSettings: `"${name}" ${value}`,
        }

        // Add fontFamily separately to avoid any automatic formatting
        Object.defineProperty(style, "fontFamily", {
          value: fontFamily,
          enumerable: true,
        })

        // Parse and apply the CSS string
        const parsedCSS: Record<string, string> = {}
        css.split(";").forEach((rule) => {
          const [property, value] = rule.split(":").map((s) => s.trim())
          if (property && value) {
            // Convert kebab-case to camelCase for React
            const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
            parsedCSS[camelProperty] = value
          }
        })

        // Parse and apply global CSS
        const parsedGlobalCSS: Record<string, string> = {}
        globalCSS.split(";").forEach((rule) => {
          const [property, value] = rule.split(":").map((s) => s.trim())
          if (property && value) {
            // Convert kebab-case to camelCase for React
            const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
            parsedGlobalCSS[camelProperty] = value
          }
        })

        layers.push(
          <div key={`${axis.id}-${i}`} style={{ ...style, ...parsedCSS, ...parsedGlobalCSS }}>
            {character}
          </div>,
        )
      }
    })

    return layers
  }

  return (
    <div className="w-full h-[70vh] rounded-lg relative overflow-hidden" style={{ backgroundColor }}>
      {generateCharacterLayers()}
    </div>
  )
}

