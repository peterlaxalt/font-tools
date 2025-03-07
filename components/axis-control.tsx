"use client"

import { useState } from "react"

interface AxisProps {
  axis: {
    id: string
    name: string
    min: number
    max: number
    steps: number
    css: string
  }
  onChange: (field: string, value: string | number) => void
  onRemove: () => void
}

export default function AxisControl({ axis, onChange, onRemove }: AxisProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="border rounded p-4">
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => setIsExpanded(!isExpanded)} className="font-medium flex items-center">
          <span className="mr-2">{isExpanded ? "▼" : "►"}</span>
          {axis.name} Axis
        </button>
        <button onClick={onRemove} className="text-red-500 text-sm">
          Remove
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1">Axis Name</label>
            <input
              type="text"
              value={axis.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs mb-1">Min</label>
              <input
                type="number"
                value={axis.min}
                onChange={(e) => onChange("min", Number.parseInt(e.target.value))}
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Max</label>
              <input
                type="number"
                value={axis.max}
                onChange={(e) => onChange("max", Number.parseInt(e.target.value))}
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Steps</label>
              <input
                type="number"
                value={axis.steps}
                min={1}
                max={20}
                onChange={(e) => onChange("steps", Number.parseInt(e.target.value))}
                className="w-full p-2 border rounded text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1">CSS</label>
            <textarea
              value={axis.css}
              onChange={(e) => onChange("css", e.target.value)}
              className="w-full p-2 border rounded h-16 text-sm font-mono"
            />
          </div>
        </div>
      )}
    </div>
  )
}

