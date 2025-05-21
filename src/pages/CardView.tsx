
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CardPreview from "@/components/CardPreview";
import { CardData, defaultCardData } from "@/types";
import { ArrowLeft, Share2, Download, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

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
        scale: 2,
        logging: false,
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

  const copyCardUrl = () => {
    const cardUrl = `${window.location.origin}/card/${cardId}`;
    navigator.clipboard.writeText(cardUrl);
    toast({
      title: "Link copied!",
      description: "Card URL copied to clipboard",
    });
  };

  const handleToggleQR = () => {
    setShowQR(prev => !prev);
  };

  // Generate QR code based on available data
  const generateQRCodeURL = () => {
    const cardUrl = `${window.location.origin}/card/${cardId}`;
    
    // If website is provided, create QR for website
    if (cardData.linkedInWebsite) {
      return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(cardData.linkedInWebsite)}&chco=000000&chld=L|1`;
    } 
    // If WhatsApp number is available, create WhatsApp QR
    else if (cardData.phone) {
      // Format number for WhatsApp (remove spaces, dashes, etc.)
      const formattedPhone = cardData.phone.replace(/\D/g, '');
      return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(`https://wa.me/${formattedPhone}`)}&chco=000000&chld=L|1`;
    }
    // Default to card URL
    return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(cardUrl)}&chco=000000&chld=L|1`;
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-vistafy-purple border-t-transparent mx-auto"></div>
          <p>Loading business card...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
          <p className="mb-6">The business card you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button className="mx-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Create Your Own Card
            </Button>
          </Link>
        </div>
      </div>
    );
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
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex gap-2 items-center"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? "Processing..." : "Download Card"}
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleToggleQR}
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
        
        {showQR && (
          <div className="mb-8 max-w-sm mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scan to Connect</CardTitle>
                <CardDescription>
                  {cardData.linkedInWebsite 
                    ? "Scan to visit website"
                    : cardData.phone
                      ? "Scan to chat on WhatsApp"
                      : "Scan to view digital card"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <img 
                    src={generateQRCodeURL()}
                    alt="QR Code"
                    className="w-full h-auto max-w-[240px]"
                    crossOrigin="anonymous"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="text-center mt-4">
          <Link to="/">
            <Button variant="outline" className="mx-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Create Your Own Card
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            Powered by <span className="font-medium text-vistafy-purple">Vistafy</span> • The Digital Business Card Generator
          </p>
        </div>
      </div>
    </div>
  );
};

// New professional card template based on examples provided
const ProfessionalCardPreview: React.FC<{ cardData: CardData }> = ({ cardData }) => {
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
        };
      case 'orange':
        return {
          mainClass: "bg-white",
          accentClass: "border-l-4 border-orange-500",
          highlightClass: "text-orange-500",
          logoBackground: "bg-gradient-to-br from-orange-400 to-orange-600",
        };
      case 'corporate':
        return {
          mainClass: "bg-gradient-to-br from-white to-gray-100",
          accentClass: "border-t-4 border-blue-900",
          highlightClass: "text-blue-900",
          logoBackground: "bg-blue-900",
        };
      default: // blue template
        return {
          mainClass: "bg-gradient-to-r from-blue-500 to-blue-800 text-white",
          accentClass: "border-l-4 border-blue-300",
          highlightClass: "text-white",
          logoBackground: "bg-white bg-opacity-15",
        };
    }
  };

  const styles = getTemplateStyles();
  
  return (
    <div className="mx-auto max-w-md">
      <div className={`rounded-lg shadow-lg overflow-hidden flex ${styles.mainClass} ${styles.accentClass}`}>
        <div className="p-6 flex-1">
          <div className="mb-4">
            <h2 className="text-xl font-bold">{cardData.fullName || "Your Name"}</h2>
            <p className={`${styles.highlightClass} text-sm`}>{cardData.title || "Your Title"}</p>
          </div>
          
          <div className="space-y-3 text-sm">
            {cardData.email && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-xs rounded-full bg-opacity-30 bg-white">@</div>
                <span>{cardData.email}</span>
              </div>
            )}
            
            {cardData.phone && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-xs rounded-full bg-opacity-30 bg-white">📞</div>
                <span>{cardData.phone}</span>
              </div>
            )}
            
            {cardData.location && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-xs rounded-full bg-opacity-30 bg-white">📍</div>
                <span>{cardData.location}</span>
              </div>
            )}
            
            {cardData.linkedInWebsite && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-xs rounded-full bg-opacity-30 bg-white">🌐</div>
                <span>{cardData.linkedInWebsite.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-between p-4 w-1/3">
          <div className={`w-16 h-16 ${styles.logoBackground} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
            {cardData.fullName ? cardData.fullName.charAt(0) : "V"}
          </div>
          
          <div className="mt-auto w-full">
            <img 
              src={`https://chart.googleapis.com/chart?cht=qr&chs=90x90&chl=${encodeURIComponent(`${window.location.origin}/card/${cardData.cardId}`)}&chco=000000&chld=L|1`}
              alt="QR Code"
              className="mx-auto w-20 h-20 bg-white p-1 rounded-md"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardView;
