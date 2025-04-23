
import React from "react";

interface CardTemplateSelectorProps {
  template: string;
  setTemplate: (template: string) => void;
}

const CARD_TEMPLATES = [
  { value: "basic", label: "Basic" },
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" }
];

const CardTemplateSelector: React.FC<CardTemplateSelectorProps> = ({ template, setTemplate }) => {
  return (
    <div className="mb-3 flex gap-3 items-center justify-center">
      <label htmlFor="card-template" className="font-medium text-vistafy-dark-purple">
        Card Template:
      </label>
      <select
        id="card-template"
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        className="bg-white border border-gray-300 rounded px-3 py-1 shadow-sm focus:ring-vistafy-purple focus:border-vistafy-purple transition"
      >
        {CARD_TEMPLATES.map(tpl => (
          <option key={tpl.value} value={tpl.value}>{tpl.label}</option>
        ))}
      </select>
    </div>
  );
};

export default CardTemplateSelector;
