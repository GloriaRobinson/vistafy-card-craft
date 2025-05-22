
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardData, defaultCardData } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

import ProfessionalCardPreview from "@/components/card-view/ProfessionalCardPreview";
import CardLoadingState from "@/components/card-view/CardLoadingState";
import CardNotFound from "@/components/card-view/CardNotFound";
import QRCodeDisplay from "@/components/card-view/QRCodeDisplay";
import CardActionButtons from "@/components/card-view/CardActionButtons";

const CardView: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [cardData, setCardData] = useState<CardData>(defaultCardData);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (!cardId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const storedCardData = localStorage.getItem(`vistafy-card-${cardId}`);
    
    if (storedCardData) {
      try {
        setCardData(JSON.parse(storedCardData));
      } catch (e) {
        console.error("Failed to parse card data:", e);
        setNotFound(true);
      }
    } else {
      setNotFound(true);
    }
    
    setLoading(false);
  }, [cardId]);

  const handleDownload = async () => {
    if (!cardId) return;
    setIsDownloading(true);
    
    try {
      const element = document.getElementById('card-download-container');
      if (!element) {
        toast({
          title: "Error",
          description: "Could not find card to download",
          variant: "destructive",
        });
        return;
      }

      const canvas = await html2canvas(element, {
        backgroundColor: null,
        useCORS: true,
        scale: 3, // Increased resolution
        logging: false,
        onclone: (document, element) => {
          // Ensure all images are loaded properly in the clone
          const images = element.getElementsByTagName('img');
          for (let i = 0; i < images.length; i++) {
            images[i].crossOrigin = "anonymous";
          }
        }
      });
      
      const link = document.createElement("a");
      link.download = `vistafy-card-${cardData.fullName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast({
        title: "Card downloaded successfully",
        description: "Your business card has been saved to your device.",
      });
    } catch (error) {
      console.error("Failed to download card:", error);
      toast({
        title: "Download failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleToggleQR = () => {
    setShowQR(prev => !prev);
  };

  if (loading) {
    return <CardLoadingState />;
  }

  if (notFound) {
    return <CardNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Digital Business Card</h1>
          <p className="text-muted-foreground">View and save contact information</p>
        </div>
        
        <div className="mb-10" id="card-download-container">
          <ProfessionalCardPreview cardData={cardData} />
        </div>
        
        <CardActionButtons 
          cardId={cardId}
          onDownload={handleDownload}
          isDownloading={isDownloading}
          showQR={showQR}
          onToggleQR={handleToggleQR}
        />
        
        {showQR && <QRCodeDisplay cardData={cardData} />}
        
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            Powered by <span className="font-medium text-vistafy-purple">Vistafy</span> • The Digital Business Card Generator
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardView;
