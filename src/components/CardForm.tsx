
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { CardData } from "@/types";
import SocialLinks from "./SocialLinks";

interface CardFormProps {
  cardData: CardData;
  onUpdateCardData: (data: Partial<CardData>) => void;
}

const CardForm: React.FC<CardFormProps> = ({ cardData, onUpdateCardData }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onUpdateCardData({ [name]: value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-vistafy-purple">Personal Information</CardTitle>
          <CardDescription>Enter your personal and professional details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              name="fullName"
              value={cardData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title/Profession *</Label>
            <Input
              id="title"
              name="title"
              value={cardData.title}
              onChange={handleChange}
              placeholder="Software Engineer"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Short Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={cardData.bio}
              onChange={handleChange}
              placeholder="I help companies build amazing web applications..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-vistafy-purple">Contact Information</CardTitle>
          <CardDescription>How can people reach you?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={cardData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={cardData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location (City, Country)</Label>
            <Input
              id="location"
              name="location"
              value={cardData.location}
              onChange={handleChange}
              placeholder="New York, USA"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="locationUrl">Google Maps URL</Label>
            <Input
              id="locationUrl"
              name="locationUrl"
              type="url"
              value={cardData.locationUrl}
              onChange={handleChange}
              placeholder="https://maps.google.com/?q=..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-vistafy-purple">Social Links</CardTitle>
          <CardDescription>Connect your social profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <SocialLinks cardData={cardData} onUpdateCardData={onUpdateCardData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CardForm;
