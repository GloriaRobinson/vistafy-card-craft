
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CardData } from "@/types";
import { getQrCodeUrl } from "@/utils/qrCodeUtils";

interface QRCodeDisplayProps {
  cardData: CardData;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ cardData }) => {
  const qrCodeUrl = getQrCodeUrl(
    cardData.cardId,
    cardData.linkedInWebsite,
    cardData.phone
  );

  return (
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
              src={qrCodeUrl}
              alt="QR Code"
              className="w-full h-auto max-w-[240px]"
              crossOrigin="anonymous"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeDisplay;
