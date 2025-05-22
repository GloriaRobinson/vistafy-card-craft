
import React, { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import html2canvas from "html2canvas";
import CardTemplateSelector from "./CardTemplateSelector";
import { CardData } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { getQrCodeUrl } from "@/utils/qrCodeUtils";
import TemplateDisplay from "./card-preview/TemplateDisplay";
import CardActions from "./card-preview/CardActions";

interface CardQuickPreviewProps {
  cardData: CardData;
}

const CardQuickPreview: React.FC<CardQuickPreviewProps> = ({ cardData }) => {
  const [template, setTemplate] = useState<string>("blue");
  const previewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreviewLabels, setShowPreviewLabels] = useState(true);
  const { toast } = useToast();

  const cardUrl = cardData.cardId
    ? `${window.location.origin}/card/${cardData.cardId}`
    : "";

  const qrCodeUrl = getQrCodeUrl(
    cardData.cardId, 
    cardData.linkedInWebsite, 
    cardData.phone
  );

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
        scale: 3, // Higher resolution
        logging: false,
        onclone: (document, element) => {
          // Make sure all images are loaded properly in the clone
          const images = element.getElementsByTagName('img');
          for (let i = 0; i < images.length; i++) {
            images[i].crossOrigin = "anonymous";
          }
        }
      });
      
      const link = document.createElement("a");
      link.download = `vistafy-card-${cardData.cardId || "preview"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast({
        title: "Card downloaded",
        description: "Business card image downloaded successfully.",
      });
    } catch (error) {
      console.error("Failed to download card:", error);
      toast({
        title: "Download failed",
        description: "There was an error downloading your card.",
        variant: "destructive",
      });
    } finally {
      // Restore labels after download
      setShowPreviewLabels(true);
      setIsDownloading(false);
    }
  };

  return (
    <div ref={previewRef}>
      <CardTemplateSelector template={template} setTemplate={setTemplate} />
      
      <Card ref={cardRef}>
        <TemplateDisplay 
          template={template}
          cardData={cardData}
          qrCodeUrl={qrCodeUrl}
          showPreviewLabels={showPreviewLabels}
        />
      </Card>
      
      <CardActions 
        onDownload={handleDownload}
        isDownloading={isDownloading}
        cardUrl={cardUrl}
      />
    </div>
  );
};

export default CardQuickPreview;
