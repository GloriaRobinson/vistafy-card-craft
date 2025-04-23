
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QRCodeGeneratorProps {
  cardId: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ cardId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const cardUrl = `${window.location.origin}/card/${cardId}`;
  
  useEffect(() => {
    if (!cardId) return;
    
    // Using Google Charts API for QR generation
    const googleChartsUrl = "https://chart.googleapis.com/chart";
    const qrUrl = `${googleChartsUrl}?cht=qr&chs=250x250&chl=${encodeURIComponent(cardUrl)}&chco=9b87f5`;
    setQrCodeUrl(qrUrl);
  }, [cardId, cardUrl]);
  
  const downloadQRCode = () => {
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `vistafy-qr-${cardId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (!cardId) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-vistafy-purple">Your QR Code</CardTitle>
        <CardDescription>
          Scan this QR code to access your business card
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {qrCodeUrl && (
          <>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <img
                src={qrCodeUrl}
                alt="QR Code for your digital business card"
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <Button onClick={downloadQRCode}>Download QR Code</Button>
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(cardUrl)}>
                Copy Card URL
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
