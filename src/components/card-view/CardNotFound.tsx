
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CardNotFound: React.FC = () => {
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
};

export default CardNotFound;
