
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  role: string;
  businessName: string;
  address: string;
  contact: string;
  companyType: string;
  industryType: string;
  registrationType: string;
  paymentMethod: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  const step = Number(searchParams.get("step")) || 1;
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "",
    businessName: "",
    address: "",
    contact: "",
    companyType: "",
    industryType: "",
    registrationType: "",
    paymentMethod: ""
  });

  // Navigate between steps
  const handleNext = () => {
    if (step < 7) {
      setSearchParams({ step: (step + 1).toString() });
    } else {
      // On final step
      toast({
        title: "Onboarding complete!",
        description: "Your business profile has been set up successfully.",
      });
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setSearchParams({ step: (step - 1).toString() });
    }
  };

  // Update form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("onboardingData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save data on change
  useEffect(() => {
    localStorage.setItem("onboardingData", JSON.stringify(formData));
  }, [formData]);

  // Progress indicator
  const renderProgress = () => {
    return (
      <div className="w-full flex items-center justify-between mb-8">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${i < step ? 'bg-dealBlue-light text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {i + 1}
            </div>
            <div className={`text-xs ${i < step ? 'text-dealBlue-light' : 'text-gray-400'}`}>
              {i === 0 ? 'Welcome' : 
               i === 1 ? 'Profile' : 
               i === 2 ? 'Business' : 
               i === 3 ? 'Company' : 
               i === 4 ? 'Industry' : 
               i === 5 ? 'Registration' : 'Payment'}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render step content
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Welcome to TransactifyRoom</h2>
            <p className="text-gray-600 mb-8">Let's set up your business profile to get started with our virtual deal room.</p>
            <Button onClick={handleNext} className="w-full">Get Started</Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Tell Us About You</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name"
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input 
                id="email"
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="you@example.com" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <select 
                id="role"
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select Role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="both">Both</option>
              </select>
            </div>
            
            <Button onClick={handleNext} className="w-full mt-4">Continue</Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Business Details</h2>
            
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input 
                id="businessName"
                type="text" 
                name="businessName" 
                value={formData.businessName} 
                onChange={handleChange} 
                placeholder="Your business name" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Input 
                id="address"
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Enter your business address" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">Business Contact</Label>
              <Input 
                id="contact"
                type="text" 
                name="contact" 
                value={formData.contact} 
                onChange={handleChange} 
                placeholder="Phone or alternative contact" 
              />
            </div>
            
            <Button onClick={handleNext} className="w-full mt-4">Continue</Button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Company Type</h2>
            
            <div className="space-y-2">
              <Label htmlFor="companyType">Select Company Type</Label>
              <select 
                id="companyType"
                name="companyType" 
                value={formData.companyType} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select Type</option>
                <option value="LLC">LLC</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Corporation">Corporation</option>
                <option value="Partnership">Partnership</option>
                <option value="Non-profit">Non-profit</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <Button onClick={handleNext} className="w-full mt-4">Continue</Button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Industry Type</h2>
            
            <div className="space-y-2">
              <Label htmlFor="industryType">Your Industry</Label>
              <select 
                id="industryType"
                name="industryType" 
                value={formData.industryType} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <Button onClick={handleNext} className="w-full mt-4">Continue</Button>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Company Registration</h2>
            
            <div className="space-y-2">
              <Label htmlFor="registrationType">Registration/Tax ID</Label>
              <Input 
                id="registrationType"
                type="text" 
                name="registrationType" 
                value={formData.registrationType} 
                onChange={handleChange} 
                placeholder="Tax ID / VAT / Registration Number" 
              />
            </div>
            
            <Button onClick={handleNext} className="w-full mt-4">Continue</Button>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold mb-2">Almost Done!</h2>
            <p className="text-gray-600 mb-6">Set up your payment method to start using the platform.</p>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <select 
                id="paymentMethod"
                name="paymentMethod" 
                value={formData.paymentMethod} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select Payment Method</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            
            <Button onClick={handleNext} variant="default" className="w-full mt-8">
              Launch Dashboard
            </Button>
          </div>
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {step > 1 && step < 7 && renderProgress()}
        {renderStep()}
        <div className="flex justify-between mt-6">
          {step > 1 && step < 7 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
