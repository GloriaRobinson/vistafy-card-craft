
export interface CardData {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  locationUrl: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  twitter: string;
  threads: string;
  whatsapp: string;
  youtube: string;
  cardId?: string;
}

export const defaultCardData: CardData = {
  fullName: "",
  title: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  locationUrl: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  twitter: "",
  threads: "",
  whatsapp: "",
  youtube: "",
};
