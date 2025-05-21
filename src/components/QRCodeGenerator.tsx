
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Share2, QrCode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QRCodeGeneratorProps {
  cardId: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ cardId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const cardUrl = `${window.location.origin}/card/${cardId}`;
  const { toast } = useToast();
  
  useEffect(() => {
    if (!cardId) return;
    
    // Using Google Charts API for QR generation with improved settings
    const googleChartsUrl = "https://chart.googleapis.com/chart";
    const qrUrl = `${googleChartsUrl}?cht=qr&chs=300x300&chl=${encodeURIComponent(cardUrl)}&chco=9b87f5&chld=M|1`;
    setQrCodeUrl(qrUrl);
  }, [cardId, cardUrl]);
  
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `vistafy-qr-${cardId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code downloaded",
      description: "Your QR code has been downloaded successfully.",
    });
  };
  
  const copyCardUrl = () => {
    navigator.clipboard.writeText(cardUrl);
    toast({
      title: "Link copied!",
      description: "Card URL copied to clipboard",
    });
  };
  
  if (!cardId) {
    return null;
  }
  
  return (
    <Card className="overflow-hidden border-t-4 border-t-vistafy-purple">
      <CardHeader className="bg-vistafy-soft-purple bg-opacity-30">
        <CardTitle className="text-vistafy-purple flex items-center gap-2">
          <QrCode className="h-5 w-5" /> Your QR Code
        </CardTitle>
        <CardDescription>
          Scan this QR code to access your digital business card
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4 pt-6">
        {qrCodeUrl ? (
          <>
            <div className="bg-white p-4 rounded-lg shadow-md border">
              <img
                src={qrCodeUrl}
                alt="QR Code for your digital business card"
                className="w-full h-auto max-w-[200px]"
              />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Your card is available at: 
              <br />
              <a href={cardUrl} target="_blank" rel="noopener noreferrer" className="text-vistafy-purple hover:underline break-all">
                {cardUrl}
              </a>
            </p>
            <div className="flex flex-col w-full gap-2">
              <Button onClick={downloadQRCode} className="flex gap-2 items-center justify-center">
                <Download className="h-4 w-4" /> Download QR Code
              </Button>
              <Button variant="outline" onClick={copyCardUrl} className="flex gap-2 items-center justify-center">
                <Share2 className="h-4 w-4" /> Copy Card URL
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-40 w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vistafy-purple"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
