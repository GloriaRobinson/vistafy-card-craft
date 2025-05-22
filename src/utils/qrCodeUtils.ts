
export const getQrCodeUrl = (
  cardId?: string,
  websiteUrl?: string, 
  phone?: string
): string => {
  if (!cardId) return "";
  
  const cardUrl = `${window.location.origin}/card/${cardId}`;
  
  // If website is provided, create QR for website
  if (websiteUrl) {
    return `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(websiteUrl)}&chco=000000&chld=H|1`;
  } 
  // If phone is available, create WhatsApp QR
  else if (phone) {
    // Format number for WhatsApp (remove spaces, dashes, etc.)
    const formattedPhone = phone.replace(/\D/g, '');
    return `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(`https://wa.me/${formattedPhone}`)}&chco=000000&chld=H|1`;
  }
  // Default to card URL
  return `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(cardUrl)}&chco=000000&chld=H|1`;
};
