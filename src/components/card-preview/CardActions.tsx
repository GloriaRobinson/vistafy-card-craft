
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CardActionsProps {
  onDownload: () => Promise<void>;
  isDownloading: boolean;
  cardUrl: string;
}

const CardActions: React.FC<CardActionsProps> = ({ onDownload, isDownloading, cardUrl }) => {
  const { toast } = useToast();
  
  const handleShare = () => {
    if (cardUrl) {
      navigator.clipboard.writeText(cardUrl);
      toast({
        title: "Link copied!",
        description: "Card URL copied to clipboard",
      });
    }
  };
  
  return (
    <div className="flex gap-2 mt-4">
      <Button 
        className="flex-1"
        onClick={onDownload}
        disabled={isDownloading}
      >
        <Download className="w-4 h-4 mr-2" />
        {isDownloading ? "Processing..." : "Download Card"}
      </Button>
      
      <Button 
        variant="outline" 
        className="flex-shrink-0" 
        onClick={handleShare} 
        disabled={!cardUrl}
      >
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CardActions;
