
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import CardTemplateSelector from "./CardTemplateSelector";
import { QrCode, Download, Share2 } from "lucide-react";
import { CardData } from "@/types";
import { cn } from "@/lib/utils";

interface CardQuickPreviewProps {
  cardData: CardData;
}

const TEMPLATE_STYLES: Record<string, string> = {
  blue: "p-0 overflow-hidden card-shadow border-l-4 border-blue-300 bg-gradient-to-r from-blue-500 to-blue-800 text-white",
  corporate: "p-0 overflow-hidden card-shadow border-t-4 border-blue-900 bg-gradient-to-br from-white to-gray-100",
  orange: "p-0 overflow-hidden card-shadow border-l-4 border-orange-500 bg-white",
  dark: "p-0 overflow-hidden card-shadow border-l-4 border-amber-500 bg-gradient-to-r from-gray-900 to-gray-800 text-white",
  minimal: "p-0 border border-gray-200 bg-white",
};

const CardQuickPreview: React.FC<CardQuickPreviewProps> = ({ cardData }) => {
  const [template, setTemplate] = useState<string>("blue");
  const previewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreviewLabels, setShowPreviewLabels] = useState(true);

  const cardUrl = cardData.cardId
    ? `${window.location.origin}/card/${cardData.cardId}`
    : "";

  // Generate QR Code URL with better size and error correction
  const qrCodeUrl = cardData.cardId
    ? `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(
        cardUrl
      )}&chco=000000&chld=L|1`
    : "";

  // Download the preview as image
  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    
    // Temporarily hide preview labels
    setShowPreviewLabels(false);
    
    try {
      // Wait for UI update after hiding labels
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
        logging: false,
      });
      
      const link = document.createElement("a");
      link.download = `vistafy-card-${cardData.cardId || "preview"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to download card:", error);
    } finally {
      // Restore labels after download
      setShowPreviewLabels(true);
      setIsDownloading(false);
    }
  };

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
    switch(template) {
      case "blue": return "text-blue-200";
      case "dark": return "text-amber-400";
      case "orange": return "text-orange-500";
      case "corporate": return "text-blue-900";
      case "minimal": return "text-vistafy-purple";
      default: return "text-vistafy-purple";
    }
  };

  return (
    <div ref={previewRef}>
      <CardTemplateSelector template={template} setTemplate={setTemplate} />
      
      <div 
        ref={cardRef} 
        className={`relative max-w-xs mx-auto rounded-lg shadow-md ${TEMPLATE_STYLES[template]}`}
      >
        {showPreviewLabels && (
          <CardHeader className="pb-2">
            <CardTitle className={cn("text-center text-xl flex items-center gap-2 justify-center", getTextClass())}>
              <QrCode className="w-5 h-5 mr-1" /> Card Preview
            </CardTitle>
            <CardDescription className={getMutedTextClass()}>
              This is how others will see your card
            </CardDescription>
          </CardHeader>
        )}
        
        <CardContent className={`space-y-3 flex flex-col items-center ${!showPreviewLabels ? 'pt-6' : ''}`}>
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
                <p>
                  <span className={`font-medium ${getTextClass()}`}>Email:</span>{" "}
                  <a href={`mailto:${cardData.email}`} className={template === "dark" ? "text-amber-400 hover:underline" : template === "blue" ? "text-blue-200 hover:underline" : "text-vistafy-purple hover:underline"}>
                    {cardData.email}
                  </a>
                </p>
              )}
              
              {cardData.phone && (
                <p>
                  <span className={`font-medium ${getTextClass()}`}>Phone:</span>{" "}
                  <a href={`tel:${cardData.phone}`} className={template === "dark" ? "text-amber-400 hover:underline" : template === "blue" ? "text-blue-200 hover:underline" : "text-vistafy-purple hover:underline"}>
                    {cardData.phone}
                  </a>
                </p>
              )}
              
              {cardData.location && (
                <p>
                  <span className={`font-medium ${getTextClass()}`}>Location:</span>{" "}
                  <span className={template === "dark" ? "text-amber-400" : template === "blue" ? "text-blue-200" : "text-vistafy-purple"}>
                    {cardData.location}
                  </span>
                </p>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className={`border-t pt-3 pb-3 flex justify-center ${
          template === "dark" 
            ? "border-gray-700 bg-gray-900" 
            : template === "blue"
              ? "border-blue-700 bg-blue-900"
              : "bg-vistafy-light-gray"
        }`}>
          <p className={`text-xs ${template === "dark" || template === "blue" ? "text-gray-400" : "text-muted-foreground"}`}>
            Created with <span className={template === "dark" ? "text-amber-400" : template === "blue" ? "text-blue-200" : "text-vistafy-purple"}>Vistafy</span>
          </p>
        </CardFooter>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button 
          className="flex-1"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? "Processing..." : "Download Card"}
        </Button>
        
        <Button variant="outline" className="flex-shrink-0" onClick={() => navigator.clipboard.writeText(cardUrl)} disabled={!cardUrl}>
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CardQuickPreview;
