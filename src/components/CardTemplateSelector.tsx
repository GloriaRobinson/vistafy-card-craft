
import React from "react";
import { Check } from "lucide-react";

interface CardTemplateSelectorProps {
  template: string;
  setTemplate: (template: string) => void;
}

const CARD_TEMPLATES = [
  { value: "blue", label: "Modern Blue", color: "bg-gradient-to-r from-blue-500 to-blue-800 border-l-4 border-blue-300 text-white" },
  { value: "corporate", label: "Corporate", color: "bg-gradient-to-br from-white to-gray-100 border-t-4 border-blue-900" },
  { value: "orange", label: "Orange Accent", color: "bg-white border-l-4 border-orange-500" },
  { value: "dark", label: "Dark Gold", color: "bg-gradient-to-r from-gray-900 to-gray-800 border-l-4 border-amber-500 text-white" },
  { value: "minimal", label: "Minimal", color: "bg-white border border-gray-200" }
];

const CardTemplateSelector: React.FC<CardTemplateSelectorProps> = ({ template, setTemplate }) => {
  return (
    <div className="mb-5">
      <h3 className="font-semibold text-center mb-3 text-vistafy-dark-purple">Select Card Template</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {CARD_TEMPLATES.map(tpl => (
          <button
            key={tpl.value}
            onClick={() => setTemplate(tpl.value)}
            className={`
              relative w-16 h-16 rounded-md transition-all
              ${tpl.color}
              ${template === tpl.value ? 'ring-2 ring-vistafy-purple scale-110' : 'opacity-80 hover:opacity-100 border border-gray-200'}
            `}
            title={tpl.label}
          >
            {template === tpl.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check className="w-6 h-6 text-vistafy-purple bg-white bg-opacity-50 rounded-full p-1" />
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="text-center mt-2 text-xs text-muted-foreground">
        {CARD_TEMPLATES.find(t => t.value === template)?.label || "Select a template"}
      </div>
    </div>
  );
};

export default CardTemplateSelector;
