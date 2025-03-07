"use client"

interface CharacterSettingsProps {
  character: string
  settings: {
    backgroundColor: string
    css: string
  }
  onChange: (character: string, field: string, value: string) => void
}

export default function CharacterSettings({ character, settings, onChange }: CharacterSettingsProps) {
  return (
    <div className="border rounded p-4">
      <h3 className="font-medium mb-3">Settings for "{character}"</h3>

      <div className="space-y-3">
        <div>
          <label htmlFor={`backgroundColor-${character}`} className="block text-sm font-medium mb-1">
            Background Color ({character})
          </label>
          <div className="flex">
            <input
              type="color"
              id={`backgroundColor-${character}`}
              value={settings.backgroundColor}
              onChange={(e) => onChange(character, "backgroundColor", e.target.value)}
              className="h-10 w-10 border rounded"
            />
            <input
              type="text"
              value={settings.backgroundColor}
              onChange={(e) => onChange(character, "backgroundColor", e.target.value)}
              className="ml-2 flex-1 p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label htmlFor={`css-${character}`} className="block text-sm font-medium mb-1">
            CSS ({character})
          </label>
          <textarea
            id={`css-${character}`}
            value={settings.css}
            onChange={(e) => onChange(character, "css", e.target.value)}
            className="w-full p-2 border rounded h-16 font-mono text-sm"
            placeholder="Additional CSS for this character"
          />
        </div>
      </div>
    </div>
  )
}

