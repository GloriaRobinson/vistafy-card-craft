
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardData } from "@/types";

interface CardPreviewProps {
  cardData: CardData;
  isPreviewOnly?: boolean;
}

const CardPreview: React.FC<CardPreviewProps> = ({ cardData, isPreviewOnly = false }) => {
  const hasSocialLinks = Object.entries(cardData)
    .filter(([key]) => ["linkedin", "instagram", "facebook", "twitter", "threads", "whatsapp", "youtube"].includes(key))
    .some(([_, value]) => value);

  // Social media icons using simple Unicode symbols (for simplicity)
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "linkedin": return "in";
      case "instagram": return "ig";
      case "facebook": return "fb";
      case "twitter": return "𝕏";
      case "threads": return "◎";
      case "whatsapp": return "wa";
      case "youtube": return "▶";
      default: return "";
    }
  };
  
  return (
    <div className={`flex flex-col ${isPreviewOnly ? "" : "lg:sticky lg:top-8"}`}>
      <h2 className={`text-lg font-medium mb-3 text-center ${isPreviewOnly ? "hidden" : ""}`}>
        Card Preview
      </h2>
      
      <div className="mx-auto w-full max-w-sm">
        <Card className="overflow-hidden card-shadow border-t-4 border-t-vistafy-purple transform transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="space-y-1.5 text-center">
              {cardData.fullName ? (
                <h1 className="font-semibold text-xl">{cardData.fullName}</h1>
              ) : (
                <div className="h-7 bg-muted rounded animate-pulse w-3/4 mx-auto" />
              )}
              
              {cardData.title ? (
                <p className="text-vistafy-dark-purple font-medium">{cardData.title}</p>
              ) : (
                <div className="h-5 bg-muted rounded animate-pulse w-2/4 mx-auto mt-1" />
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pb-4 text-center space-y-4">
            {cardData.bio && (
              <p className="text-sm text-muted-foreground">{cardData.bio}</p>
            )}
            
            <div className="space-y-2 pt-2">
              {cardData.email && (
                <p className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  <a href={`mailto:${cardData.email}`} className="text-vistafy-purple hover:underline">
                    {cardData.email}
                  </a>
                </p>
              )}
              
              {cardData.phone && (
                <p className="text-sm">
                  <span className="font-medium">Phone:</span>{" "}
                  <a href={`tel:${cardData.phone}`} className="text-vistafy-purple hover:underline">
                    {cardData.phone}
                  </a>
                </p>
              )}
              
              {cardData.location && (
                <p className="text-sm">
                  <span className="font-medium">Location:</span>{" "}
                  {cardData.locationUrl ? (
                    <a href={cardData.locationUrl} target="_blank" rel="noopener noreferrer" className="text-vistafy-purple hover:underline">
                      {cardData.location}
                    </a>
                  ) : (
                    <span>{cardData.location}</span>
                  )}
                </p>
              )}
            </div>
            
            {hasSocialLinks && (
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">Connect with me:</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.entries(cardData)
                    .filter(([key, value]) => 
                      ["linkedin", "instagram", "facebook", "twitter", "threads", "whatsapp", "youtube"].includes(key) && value
                    )
                    .map(([platform, url]) => (
                      <a 
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 inline-flex items-center justify-center bg-vistafy-soft-purple text-vistafy-dark-purple rounded-md hover:bg-vistafy-purple hover:text-white transition-colors"
                      >
                        {getSocialIcon(platform)}
                      </a>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center border-t pt-4 pb-4 bg-vistafy-light-gray">
            <p className="text-xs text-muted-foreground">
              Created with <span className="text-vistafy-purple">Vistafy</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CardPreview;
