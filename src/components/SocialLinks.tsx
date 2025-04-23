
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardData } from "@/types";

interface SocialLinksProps {
  cardData: CardData;
  onUpdateCardData: (data: Partial<CardData>) => void;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ cardData, onUpdateCardData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateCardData({ [name]: value });
  };

  const socialPlatforms = [
    {
      name: "linkedin",
      label: "LinkedIn",
      placeholder: "https://linkedin.com/in/username",
    },
    {
      name: "instagram",
      label: "Instagram",
      placeholder: "https://instagram.com/username",
    },
    {
      name: "facebook",
      label: "Facebook",
      placeholder: "https://facebook.com/username",
    },
    {
      name: "twitter",
      label: "X / Twitter",
      placeholder: "https://x.com/username",
    },
    {
      name: "threads",
      label: "Threads",
      placeholder: "https://threads.net/@username",
    },
    {
      name: "whatsapp",
      label: "WhatsApp",
      placeholder: "https://wa.me/1234567890",
    },
    {
      name: "youtube",
      label: "YouTube",
      placeholder: "https://youtube.com/@channel",
    },
  ];

  return (
    <div className="social-grid">
      {socialPlatforms.map((platform) => (
        <div key={platform.name} className="space-y-2">
          <Label htmlFor={platform.name}>{platform.label}</Label>
          <Input
            id={platform.name}
            name={platform.name}
            type="url"
            value={cardData[platform.name as keyof CardData] as string}
            onChange={handleChange}
            placeholder={platform.placeholder}
          />
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
