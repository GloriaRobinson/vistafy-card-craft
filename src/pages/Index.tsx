
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CardForm from "@/components/CardForm";
import CardQuickPreview from "@/components/CardQuickPreview";
import { CardData, defaultCardData } from "@/types";
import { nanoid } from "nanoid";

const Index: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    ...defaultCardData,
    cardId: nanoid(8),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateCardData = (newData: Partial<CardData>) => {
    setCardData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const saveCard = () => {
    if (!cardData.fullName || !cardData.title || !cardData.email) {
      toast({
        title: "Missing required fields",
        description: "Please fill in your name, title, and email address.",
        variant: "destructive",
      });
      return;
    }
    try {
      localStorage.setItem(
        `vistafy-card-${cardData.cardId}`,
        JSON.stringify(cardData)
      );
      toast({
        title: "Card saved successfully!",
        description: "Your digital business card is ready to share.",
      });
      
      // Navigate to the card view page
      navigate(`/card/${cardData.cardId}`);
    } catch (error) {
      console.error("Failed to save card:", error);
      toast({
        title: "Failed to save card",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b py-4">
        <div className="container">
          <h1 className="text-2xl font-bold text-center text-vistafy-purple">
            Vistafy <span className="text-vistafy-dark-gray">|</span> Digital Business Card
          </h1>
        </div>
      </header>
      <main className="container py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Create Your Digital Business Card</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fill in your details below to generate a professional digital business card 
            that can be shared via QR code or direct link.
          </p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <CardForm cardData={cardData} onUpdateCardData={updateCardData} />
            <div className="text-center">
              <Button 
                className="px-8 py-6 text-lg"
                onClick={saveCard}
              >
                Save & Generate Card
              </Button>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <CardQuickPreview cardData={cardData} />
          </div>
        </div>
      </main>
      <footer className="bg-vistafy-light-gray py-6 mt-12">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vistafy • The Digital Business Card Generator
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
