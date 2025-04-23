
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CardPreview from "@/components/CardPreview";
import { CardData, defaultCardData } from "@/types";
import { ArrowLeft } from "lucide-react";

const CardView: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [cardData, setCardData] = useState<CardData>(defaultCardData);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!cardId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    // In a real app, we would fetch the card data from a database
    // For now, we'll just check local storage
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
        
        <div className="mb-10">
          <CardPreview cardData={cardData} isPreviewOnly={true} />
        </div>
        
        <div className="text-center">
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

export default CardView;
