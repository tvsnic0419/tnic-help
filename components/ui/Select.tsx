'use client';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  hint?: string;
}

export function Select({ label, value, onChange, options, hint }: SelectProps) {
  return (
    <div>
      <label className="text-sm text-zinc-400 block mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base w-full appearance-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-zinc-900">
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-caption text-zinc-600 mt-1">{hint}</p>}
    </div>
  );
}