
import React from "react";
import { QrCode, Mail, Phone, MapPin } from "lucide-react";
import { CardData } from "@/types";
import { cn } from "@/lib/utils";

interface TemplateDisplayProps {
  template: string;
  cardData: CardData;
  qrCodeUrl: string;
  showPreviewLabels: boolean;
}

// Style maps
const TEMPLATE_STYLES: Record<string, string> = {
  blue: "p-0 overflow-hidden card-shadow border-l-4 border-blue-300 bg-gradient-to-r from-blue-500 to-blue-800 text-white",
  corporate: "p-0 overflow-hidden card-shadow border-t-4 border-blue-900 bg-gradient-to-br from-white to-gray-100",
  orange: "p-0 overflow-hidden card-shadow border-l-4 border-orange-500 bg-white",
  dark: "p-0 overflow-hidden card-shadow border-l-4 border-amber-500 bg-gradient-to-r from-gray-900 to-gray-800 text-white",
  minimal: "p-0 border border-gray-200 bg-white",
};

const TemplateDisplay: React.FC<TemplateDisplayProps> = ({
  template,
  cardData,
  qrCodeUrl,
  showPreviewLabels,
}) => {
  // Get text color based on template
  const getTextClass = () => {
    if (template === "dark" || template === "blue") return "text-white";
    return "text-gray-800";
  };

  const getMutedTextClass = () => {
    if (template === "dark" || template === "blue") return "text-gray-300";
    return "text-muted-foreground";
  };

  const getHighlightClass = () => {
    switch (template) {
      case "blue":
        return "text-blue-200";
      case "dark":
        return "text-amber-400";
      case "orange":
        return "text-orange-500";
      case "corporate":
        return "text-blue-900";
      case "minimal":
        return "text-vistafy-purple";
      default:
        return "text-vistafy-purple";
    }
  };

  return (
    <div className={`relative max-w-xs mx-auto rounded-lg shadow-md ${TEMPLATE_STYLES[template]}`}>
      {showPreviewLabels && (
        <div className="pb-2 px-6 pt-6">
          <h3 className={cn("text-center text-xl flex items-center gap-2 justify-center", getTextClass())}>
            <QrCode className="w-5 h-5 mr-1" /> Card Preview
          </h3>
          <p className={getMutedTextClass()}>
            This is how others will see your card
          </p>
        </div>
      )}

      <div className={`space-y-3 flex flex-col items-center px-6 ${!showPreviewLabels ? 'pt-6' : ''}`}>
        {/* QR code display */}
        {qrCodeUrl && (
          <div className="bg-white p-2 rounded-md shadow-sm mb-2">
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="w-32 h-32 mx-auto"
              draggable={false}
              crossOrigin="anonymous"
            />
          </div>
        )}

        <div className="text-center space-y-1 w-full">
          <h2 className={`font-semibold text-lg ${getTextClass()}`}>
            {cardData.fullName || <span className="opacity-50">Full Name</span>}
          </h2>

          <div className={getHighlightClass()}>
            {cardData.title || <span className="opacity-50">Title/Profession</span>}
          </div>

          <div className="text-sm">
            {cardData.email && (
              <p className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${cardData.email}`}
                  className={template === "dark" ? "text-amber-400 hover:underline" : template === "blue" ? "text-blue-200 hover:underline" : "text-vistafy-purple hover:underline"}
                >
                  {cardData.email}
                </a>
              </p>
            )}

            {cardData.phone && (
              <p className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href={`tel:${cardData.phone}`}
                  className={template === "dark" ? "text-amber-400 hover:underline" : template === "blue" ? "text-blue-200 hover:underline" : "text-vistafy-purple hover:underline"}
                >
                  {cardData.phone}
                </a>
              </p>
            )}

            {cardData.location && (
              <p className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                <span
                  className={template === "dark" ? "text-amber-400" : template === "blue" ? "text-blue-200" : "text-vistafy-purple"}
                >
                  {cardData.location}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        className={`border-t pt-3 pb-3 flex justify-center ${
          template === "dark"
            ? "border-gray-700 bg-gray-900"
            : template === "blue"
              ? "border-blue-700 bg-blue-900"
              : "bg-vistafy-light-gray"
        }`}
      >
        <p className={`text-xs ${template === "dark" || template === "blue" ? "text-gray-400" : "text-muted-foreground"}`}>
          Created with <span className={template === "dark" ? "text-amber-400" : template === "blue" ? "text-blue-200" : "text-vistafy-purple"}>Vistafy</span>
        </p>
      </div>
    </div>
  );
};

export default TemplateDisplay;
