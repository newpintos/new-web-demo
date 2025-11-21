import { useState } from "react";
import { TemplateSelection } from "./components/TemplateSelection";
import { Template1 } from "./templates/Template1";
import { Template2 } from "./templates/Template2";
import { Template3 } from "./templates/Template3";
import { Template4 } from "./templates/Template4";
import { Template5 } from "./templates/Template5";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleTemplateSelect = (templateNumber: number) => {
    setSelectedTemplate(templateNumber);
  };

  const handleBackToSelection = () => {
    setSelectedTemplate(null);
  };

  // Show template selection page
  if (selectedTemplate === null) {
    return (
      <>
        <TemplateSelection onTemplateSelect={handleTemplateSelect} />
        <Toaster position="top-center" />
      </>
    );
  }

  // Render selected template
  return (
    <>
      <div className="relative">
        {selectedTemplate === 1 && <Template1 onBackToHome={handleBackToSelection} />}
        {selectedTemplate === 2 && <Template2 onBackToHome={handleBackToSelection} />}
        {selectedTemplate === 3 && <Template3 onBackToHome={handleBackToSelection} />}
        {selectedTemplate === 4 && <Template4 onBackToHome={handleBackToSelection} />}
        {selectedTemplate === 5 && <Template5 onBackToHome={handleBackToSelection} />}
      </div>
      <Toaster position="top-center" />
    </>
  );
}

export default function App() {
  return <AppContent />;
}
