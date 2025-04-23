
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import CardTemplateSelector from "./CardTemplateSelector";
import { QrCode } from "lucide-react";
import { CardData } from "@/types";

interface CardQuickPreviewProps {
  cardData: CardData;
}

const TEMPLATE_STYLES: Record<string, string> = {
  basic: "p-0 overflow-hidden card-shadow border-t-4 border-t-vistafy-purple bg-white",
  modern: "p-0 overflow-hidden card-shadow border-t-4 border-t-vivid-purple bg-gradient-to-br from-vistafy-soft-purple to-white",
  minimal: "p-0 border border-gray-200 bg-white"
};

const CardQuickPreview: React.FC<CardQuickPreviewProps> = ({ cardData }) => {
  const [template, setTemplate] = useState<string>("basic");
  const previewRef = useRef<HTMLDivElement>(null);

  const cardUrl = cardData.cardId
    ? `${window.location.origin}/card/${cardData.cardId}`
    : "";

  // Google Charts QR code URL
  const qrCodeUrl =
    cardData.cardId
      ? `https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=${encodeURIComponent(
          cardUrl
        )}&chco=9b87f5`
      : "";

  // Download the preview as image
  const handleDownload = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = `vistafy-card-${cardData.cardId || "preview"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <CardTemplateSelector template={template} setTemplate={setTemplate} />
      <div ref={previewRef} className={`relative max-w-xs mx-auto ${TEMPLATE_STYLES[template]}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-vistafy-purple text-center text-xl flex items-center gap-2 justify-center">
            <QrCode className="w-5 h-5 mr-1" /> Card Preview
          </CardTitle>
          <CardDescription className="text-center">This is how others will see your card</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 flex flex-col items-center">
          {qrCodeUrl && (
            <div className="bg-white p-2 rounded-md shadow-sm mb-2">
              <img 
                src={qrCodeUrl}
                alt="QR Code"
                className="w-32 h-32 mx-auto"
                draggable={false}
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
      </div>
      <Button className="mt-4 w-full" onClick={handleDownload}>
        Download Card
      </Button>
    </div>
  );
};

export default CardQuickPreview;

