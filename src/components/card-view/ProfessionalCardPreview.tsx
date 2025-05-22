
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { CardData } from "@/types";
import { getQrCodeUrl } from "@/utils/qrCodeUtils";

interface ProfessionalCardPreviewProps {
  cardData: CardData;
}

const ProfessionalCardPreview: React.FC<ProfessionalCardPreviewProps> = ({ cardData }) => {
  // Determine which template to use based on URL params or default
  const templateStyle = new URLSearchParams(window.location.search).get('template') || 'blue';

  const getTemplateStyles = () => {
    switch (templateStyle) {
      case 'dark':
        return {
          mainClass: "bg-gradient-to-r from-gray-900 to-gray-800 text-white",
          accentClass: "border-l-4 border-amber-500",
          highlightClass: "text-amber-400",
          logoBackground: "bg-amber-500 bg-opacity-20",
          iconClass: "text-amber-400",
        };
      case 'orange':
        return {
          mainClass: "bg-white",
          accentClass: "border-l-4 border-orange-500",
          highlightClass: "text-orange-500",
          logoBackground: "bg-gradient-to-br from-orange-400 to-orange-600",
          iconClass: "text-orange-500",
        };
      case 'corporate':
        return {
          mainClass: "bg-gradient-to-br from-white to-gray-100",
          accentClass: "border-t-4 border-blue-900",
          highlightClass: "text-blue-900",
          logoBackground: "bg-blue-900",
          iconClass: "text-blue-900",
        };
      default: // blue template based on uploaded image
        return {
          mainClass: "bg-gradient-to-r from-blue-500 to-blue-800 text-white",
          accentClass: "border-l-4 border-blue-300",
          highlightClass: "text-white",
          logoBackground: "bg-white bg-opacity-15",
          iconClass: "text-white",
        };
    }
  };

  const styles = getTemplateStyles();
  
  // Generate QR code URL based on available data
  const qrCodeUrl = getQrCodeUrl(
    cardData.cardId,
    cardData.linkedInWebsite,
    cardData.phone
  );
  
  return (
    <div className="mx-auto max-w-md">
      <div className={`rounded-lg shadow-lg overflow-hidden flex ${styles.mainClass} ${styles.accentClass}`}>
        <div className="p-6 flex-1">
          <div className="mb-6">
            <h2 className="text-xl font-bold">{cardData.fullName || "Your Name"}</h2>
            <p className={`${styles.highlightClass} text-sm font-medium`}>{cardData.title || "Your Title"}</p>
          </div>
          
          <div className="space-y-4 text-sm">
            {cardData.email && (
              <div className="flex items-center gap-3">
                <Mail className={`w-5 h-5 ${styles.iconClass}`} />
                <span>{cardData.email}</span>
              </div>
            )}
            
            {cardData.phone && (
              <div className="flex items-center gap-3">
                <Phone className={`w-5 h-5 ${styles.iconClass}`} />
                <span>{cardData.phone}</span>
              </div>
            )}
            
            {cardData.location && (
              <div className="flex items-center gap-3">
                <MapPin className={`w-5 h-5 ${styles.iconClass}`} />
                <span>{cardData.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-between p-5 w-1/3">
          <div className={`w-16 h-16 ${styles.logoBackground} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md`}>
            {cardData.fullName ? cardData.fullName.charAt(0) : "V"}
          </div>
          
          <div className="mt-auto w-full">
            {qrCodeUrl && (
              <img 
                src={qrCodeUrl}
                alt="QR Code"
                className="mx-auto w-24 h-24 bg-white p-1 rounded-md shadow-sm"
                crossOrigin="anonymous"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCardPreview;
