
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

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
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 shadow-md transition-all duration-300 ${
                i < step 
                  ? 'bg-gradient-to-r from-dealBlue-light to-dealBlue-medium text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i < step ? <CheckCircle className="w-5 h-5" /> : i + 1}
            </div>
            <div className={`text-xs ${i < step ? 'text-dealBlue-light font-medium' : 'text-gray-400'}`}>
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

  // Get gradient based on step
  const getGradientClass = () => {
    switch(step) {
      case 1: return "bg-gradient-to-br from-blue-50 to-indigo-100";
      case 2: return "bg-gradient-to-br from-cyan-50 to-blue-100";
      case 3: return "bg-gradient-to-br from-sky-50 to-cyan-100";
      case 4: return "bg-gradient-to-br from-indigo-50 to-blue-100";
      case 5: return "bg-gradient-to-br from-violet-50 to-purple-100";
      case 6: return "bg-gradient-to-br from-purple-50 to-indigo-100";
      case 7: return "bg-gradient-to-br from-blue-50 to-emerald-100";
      default: return "bg-gradient-to-br from-blue-50 to-indigo-100";
    }
  };

  // Render step content
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-dealBlue-light to-dealBlue-dark flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-dealBlue-medium to-dealBlue-dark bg-clip-text text-transparent">Welcome to TransactifyRoom</h2>
            <p className="text-gray-600 mb-8">Let's set up your business profile to get started with our virtual deal room.</p>
            <Button onClick={handleNext} className="w-full bg-gradient-to-r from-dealBlue-light to-dealBlue-dark hover:from-dealBlue-medium hover:to-dealBlue-dark">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-dealBlue-dark">Tell Us About You</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name"
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
                className="border-dealBlue-light/30 focus:border-dealBlue-light"
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
                className="border-dealBlue-light/30 focus:border-dealBlue-light"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <select 
                id="role"
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-dealBlue-light/30 bg-background px-3 py-2 text-sm focus:border-dealBlue-light"
              >
                <option value="">Select Role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="both">Both</option>
              </select>
            </div>
            
            <Button onClick={handleNext} className="w-full mt-4 bg-gradient-to-r from-dealBlue-light to-dealBlue-dark hover:from-dealBlue-medium hover:to-dealBlue-dark">
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-dealBlue-dark">Business Details</h2>
            
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input 
                id="businessName"
                type="text" 
                name="businessName" 
                value={formData.businessName} 
                onChange={handleChange} 
                placeholder="Your business name" 
                className="border-dealBlue-light/30 focus:border-dealBlue-light"
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
                className="border-dealBlue-light/30 focus:border-dealBlue-light"
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
                className="border-dealBlue-light/30 focus:border-dealBlue-light"
              />
            </div>
            
            <Button onClick={handleNext} className="w-full mt-4 bg-gradient-to-r from-dealBlue-light to-dealBlue-dark hover:from-dealBlue-medium hover:to-dealBlue-dark">
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-dealBlue-dark">Company Type</h2>
            
            <div className="space-y-2">
              <Label htmlFor="companyType">Select Company Type</Label>
              <select 
                id="companyType"
                name="companyType" 
                value={formData.companyType} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-dealBlue-light/30 bg-background px-3 py-2 text-sm focus:border-dealBlue-light"
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
            
            <Button onClick={handleNext} className="w-full mt-4 bg-gradient-to-r from-dealBlue-light to-dealBlue-dark hover:from-dealBlue-medium hover:to-dealBlue-dark">
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-dealBlue-dark">Industry Type</h2>
            
            <div className="space-y-2">
              <Label htmlFor="industryType">Your Industry</Label>
              <select 
                id="industryType"
                name="industryType" 
                value={formData.industryType} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-dealBlue-light/30 bg-background px-3 py-2 text-sm focus:border-dealBlue-light"
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
            
            <Button onClick={handleNext} className="w-full mt-4 bg-gradient-to-r from-dealBlue-light to-dealBlue-dark hover:from-dealBlue-medium hover:to-dealBlue-dark">
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-dealBlue-dark">Company Registration</h2>
            
            <div className="space-y-2">
              <Label htmlFor="registrationType">Registration/Tax ID</Label>
              <Input 
                id="registrationType"
                type="text" 
                name="registrationType" 
                value={formData.registrationType} 
                onChange={handleChange} 
                placeholder="Tax ID / VAT / Registration Number" 
                className="border-dealBlue-light/30 focus:border-dealBlue-light"
              />
            </div>
            
            <Button onClick={handleNext} className="w-full mt-4 bg-gradient-to-r from-dealBlue-light to-dealBlue-dark hover:from-dealBlue-medium hover:to-dealBlue-dark">
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-dealBlue-light to-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-dealBlue-medium to-emerald-500 bg-clip-text text-transparent">Almost Done!</h2>
            <p className="text-gray-600 mb-6">Set up your payment method to start using the platform.</p>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <select 
                id="paymentMethod"
                name="paymentMethod" 
                value={formData.paymentMethod} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-dealBlue-light/30 bg-background px-3 py-2 text-sm focus:border-dealBlue-light"
              >
                <option value="">Select Payment Method</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            
            <Button onClick={handleNext} variant="default" className="w-full mt-8 bg-gradient-to-r from-dealBlue-light to-emerald-500 hover:from-dealBlue-medium hover:to-emerald-600">
              Launch Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${getGradientClass()} transition-all duration-500`}>
      <Card className="shadow-xl border-0 overflow-hidden w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-0">
          {step > 1 && step < 7 && renderProgress()}
        </CardHeader>
        <CardContent className="p-8">
          {renderStep()}
          <div className="flex justify-between mt-6">
            {step > 1 && step < 7 && (
              <Button variant="outline" onClick={handleBack} className="border-dealBlue-light/30 hover:bg-dealBlue-light/10">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
