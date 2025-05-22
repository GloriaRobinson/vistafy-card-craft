
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, QrCode, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface CardActionButtonsProps {
  cardId?: string;
  onDownload: () => Promise<void>;
  isDownloading: boolean;
  showQR: boolean;
  onToggleQR: () => void;
}

const CardActionButtons: React.FC<CardActionButtonsProps> = ({
  cardId,
  onDownload,
  isDownloading,
  showQR,
  onToggleQR,
}) => {
  const { toast } = useToast();

  const copyCardUrl = () => {
    const cardUrl = `${window.location.origin}/card/${cardId}`;
    navigator.clipboard.writeText(cardUrl);
    toast({
      title: "Link copied!",
      description: "Card URL copied to clipboard",
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <Button 
          onClick={onDownload}
          disabled={isDownloading}
          className="flex gap-2 items-center"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? "Processing..." : "Download Card"}
        </Button>
        
        <Button 
          variant="outline"
          onClick={onToggleQR}
          className="flex gap-2 items-center"
        >
          <QrCode className="w-4 h-4" />
          {showQR ? "Hide QR Code" : "Show QR Code"}
        </Button>
        
        <Button 
          variant="secondary"
          onClick={copyCardUrl}
          className="flex gap-2 items-center"
        >
          <Share2 className="w-4 h-4" />
          Share Card
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <Link to="/">
          <Button variant="outline" className="mx-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Create Your Own Card
          </Button>
        </Link>
      </div>
    </>
  );
};

export default CardActionButtons;
