
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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
  city: string;
  state: string;
  country: string;
  pincode: string;
  billsPerMonth: string;
  useEInvoice: boolean;
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
    paymentMethod: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    billsPerMonth: "",
    useEInvoice: false
  });

  // Navigate between steps
  const handleNext = () => {
    if (step < 7) {
      setSearchParams({ step: (step + 1).toString() });
    } else {
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

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Toggle boolean values
  const handleToggle = (name: string) => {
    setFormData({ ...formData, [name]: !formData[name as keyof FormData] });
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

  const renderStepIndicator = () => {
    return (
      <div className="mb-8 text-white text-lg font-medium">
        ----- Step {step} of 7 -----
      </div>
    );
  };

  const renderStepTitle = () => {
    switch(step) {
      case 1: return "Welcome to TransactifyRoom";
      case 2: return "About You";
      case 3: return "About Business Details";
      case 4: return "Company Information";
      case 5: return "Industry Selection";
      case 6: return "Registration Details";
      case 7: return "Payment Setup";
      default: return "";
    }
  };

  const renderStepDescription = () => {
    switch(step) {
      case 3:
        return (
          <div className="text-white/90 mb-12 max-w-md">
            Tell us more about your business by sharing your company name, GST
            details, average number of bills generated in a month, and whether you use
            e-invoice or e-way bill systems. This helps us understand your operations
            better and offer tailored solutions.
          </div>
        );
      case 4:
        return (
          <div className="text-white/90 mb-12 max-w-md">
            Help us understand your company structure and organization better
            so we can customize our services to match your specific needs.
          </div>
        );
      default: return null;
    }
  };

  // Render step content
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-white">Welcome to TransactifyRoom</h2>
            <p className="text-white/80 mb-8">Let's set up your business profile to get started with our virtual deal room.</p>
            <Button onClick={handleNext} className="w-full bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">{renderStepTitle()}</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Your Name</Label>
              <Input 
                id="name"
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Your Email</Label>
              <Input 
                id="email"
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="you@example.com" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">Your Role</Label>
              <Select onValueChange={(value) => handleSelectChange("role", value)} value={formData.role}>
                <SelectTrigger id="role" className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleNext} className="w-full mt-4 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700">
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        );
      case 3:
        return (
          <Card className="bg-white rounded-md p-6 shadow-lg w-full max-w-xl">
            <div className="mb-4">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-blue-600 mr-2"></div>
                <span className="text-gray-800 font-medium">Do you have GST Number?</span>
                <span className="text-gray-400 ml-2">(optional)</span>
                <div className="ml-auto">
                  <input type="checkbox" className="toggle" />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="businessName" className="text-gray-800 block mb-1">
                Enter Your Company Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="businessName"
                type="text" 
                name="businessName" 
                value={formData.businessName} 
                onChange={handleChange} 
                placeholder="Enter your company name" 
                className="w-full border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="pincode" className="text-gray-800 block mb-1">
                  Enter Your Pincode <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="pincode"
                  type="text" 
                  name="pincode" 
                  value={formData.pincode} 
                  onChange={handleChange} 
                  placeholder="Enter your 6-digit pincode" 
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-gray-800 block mb-1">
                  Enter Your City <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="city"
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  placeholder="Enter your city" 
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="state" className="text-gray-800 block mb-1">
                  Enter Your State <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange("state", value)} value={formData.state}>
                  <SelectTrigger id="state" className="w-full border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="country" className="text-gray-800 block mb-1">
                  Enter Your Country <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange("country", value)} value={formData.country}>
                  <SelectTrigger id="country" className="w-full border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">+91 India</SelectItem>
                    <SelectItem value="USA">+1 USA</SelectItem>
                    <SelectItem value="UK">+44 UK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="billsPerMonth" className="text-gray-800 block mb-1">
                  How many bills do you generate in a month?
                </Label>
                <Input 
                  id="billsPerMonth"
                  type="text" 
                  name="billsPerMonth" 
                  value={formData.billsPerMonth} 
                  onChange={handleChange} 
                  placeholder="Enter number of bills" 
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="useEInvoice" className="text-gray-800 block mb-1">
                  Do you use e-invoice or e-way bill system?
                </Label>
                <Select onValueChange={(value) => handleSelectChange("useEInvoice", value)} value={formData.useEInvoice ? "yes" : "no"}>
                  <SelectTrigger id="useEInvoice" className="w-full border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        );
      case 4:
        return (
          <Card className="bg-white rounded-md p-6 shadow-lg w-full max-w-xl">
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyType" className="text-gray-800 block mb-1">Select Company Type</Label>
                <Select onValueChange={(value) => handleSelectChange("companyType", value)} value={formData.companyType}>
                  <SelectTrigger id="companyType" className="w-full border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LLC">LLC</SelectItem>
                    <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="Corporation">Corporation</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Non-profit">Non-profit</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="address" className="text-gray-800 block mb-1">Company Address</Label>
                <Input 
                  id="address"
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Enter company address" 
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <Label htmlFor="contact" className="text-gray-800 block mb-1">Business Contact Number</Label>
                <Input 
                  id="contact"
                  type="text" 
                  name="contact" 
                  value={formData.contact} 
                  onChange={handleChange} 
                  placeholder="Enter business contact number" 
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </Card>
        );
      case 5:
        return (
          <Card className="bg-white rounded-md p-6 shadow-lg w-full max-w-xl">
            <div className="space-y-4">
              <div>
                <Label htmlFor="industryType" className="text-gray-800 block mb-1">Select Industry Type</Label>
                <Select onValueChange={(value) => handleSelectChange("industryType", value)} value={formData.industryType}>
                  <SelectTrigger id="industryType" className="w-full border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        );
      case 6:
        return (
          <Card className="bg-white rounded-md p-6 shadow-lg w-full max-w-xl">
            <div className="space-y-4">
              <div>
                <Label htmlFor="registrationType" className="text-gray-800 block mb-1">Registration/Tax ID</Label>
                <Input 
                  id="registrationType"
                  type="text" 
                  name="registrationType" 
                  value={formData.registrationType} 
                  onChange={handleChange} 
                  placeholder="Tax ID / VAT / Registration Number" 
                  className="w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </Card>
        );
      case 7:
        return (
          <Card className="bg-white rounded-md p-6 shadow-lg w-full max-w-xl">
            <div className="space-y-4 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-600 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Almost Done!</h2>
              <p className="text-gray-600 mb-6">Set up your payment method to start using the platform.</p>
              
              <div className="space-y-2">
                <Label htmlFor="paymentMethod" className="text-gray-800 block mb-1">Payment Method</Label>
                <Select onValueChange={(value) => handleSelectChange("paymentMethod", value)} value={formData.paymentMethod}>
                  <SelectTrigger id="paymentMethod" className="w-full border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-600">
      {/* Left side with step indicator and description */}
      <div className="w-1/3 p-12 flex flex-col">
        {step > 1 && (
          <>
            {renderStepIndicator()}
            <h1 className="text-3xl font-bold text-white mb-6">{renderStepTitle()}</h1>
            {renderStepDescription()}
          </>
        )}
      </div>
      
      {/* Right side with form content */}
      <div className="w-2/3 flex items-center justify-center">
        <div className="w-full max-w-xl">
          {renderStep()}
          
          {/* Navigation buttons */}
          {step > 1 && step < 7 && (
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handleBack} 
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              
              <Button 
                onClick={handleNext} 
                className="bg-white text-blue-600 hover:bg-white/90"
              >
                Next <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
          
          {step === 7 && (
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handleBack} 
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              
              <Button 
                onClick={handleNext} 
                className="bg-white text-blue-600 hover:bg-white/90"
              >
                Launch Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
