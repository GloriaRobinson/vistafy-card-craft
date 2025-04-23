import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CardData } from "@/types";
import { QrCode } from "lucide-react";

interface CardQuickPreviewProps {
  cardData: CardData;
}

const CardQuickPreview: React.FC<CardQuickPreviewProps> = ({ cardData }) => {
  const cardUrl = cardData.cardId
    ? `${window.location.origin}/card/${cardData.cardId}`
    : "";

  // Use Google Charts for QR code (same as before)
  const qrCodeUrl =
    cardData.cardId
      ? `https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=${encodeURIComponent(
          cardUrl
        )}&chco=9b87f5`
      : "";

  return (
    <Card className="p-0 overflow-hidden card-shadow border-t-4 border-t-vistafy-purple">
      <CardHeader className="pb-2">
        <CardTitle className="text-vistafy-purple text-center text-xl">Card Preview</CardTitle>
        <CardDescription className="text-center">This is how others will see your card</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex flex-col items-center">
        {qrCodeUrl && (
          <div className="bg-white p-2 rounded-md shadow-sm mb-2">
            <img 
              src={qrCodeUrl}
              alt="QR Code"
              className="w-32 h-32 mx-auto"
            />
          </div>
        )}
        <div className="text-center space-y-1 w-full">
          <h2 className="font-semibold text-lg">{cardData.fullName || <span className="opacity-50">Full Name</span>}</h2>
          <div className="text-vistafy-dark-purple">{cardData.title || <span className="opacity-50">Title/Profession</span>}</div>
          <div className="text-sm">
            {cardData.email && (
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a href={`mailto:${cardData.email}`} className="text-vistafy-purple hover:underline">{cardData.email}</a>
              </p>
            )}
            {cardData.phone && (
              <p>
                <span className="font-medium">Phone:</span>{" "}
                <a href={`tel:${cardData.phone}`} className="text-vistafy-purple hover:underline">{cardData.phone}</a>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardQuickPreview;
