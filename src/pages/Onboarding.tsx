
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  gstNumber: string;
  hasGst: boolean;
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
    useEInvoice: false,
    gstNumber: "",
    hasGst: false
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle toggle changes
  const handleToggleChange = (checked: boolean, name: string) => {
    setFormData({ ...formData, [name]: checked });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
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
      <div className="text-white text-base mb-2">
        ----- Step {step} of 7 -----
      </div>
    );
  };

  const renderStepTitle = () => {
    switch(step) {
      case 1: return "Welcome to Billclap";
      case 2: return "About You";
      case 3: return "About Business Details";
      case 4: return "Company Type";
      case 5: return "Industry Type";
      case 6: return "Registration Details";
      case 7: return "Congratulations!";
      default: return "";
    }
  };

  const renderStepDescription = () => {
    switch(step) {
      case 3:
        return (
          <div className="text-white/90 mb-8 max-w-md">
            Tell us more about your business by sharing your company name, GST
            details, average number of bills generated in a month, and whether you use
            e-invoice or e-way bill systems. This helps us understand your operations
            better and offer tailored solutions.
          </div>
        );
      case 4:
        return (
          <div className="text-white/90 mb-8 max-w-md">
            Select your company type to help us tailor our services to meet your specific
            business needs and industry requirements.
          </div>
        );
      case 5:
        return (
          <div className="text-white/90 mb-8 max-w-md">
            Select your industry type to help us tailor our services to meet your specific
            business needs and industry requirements.
          </div>
        );
      case 1:
        return null;
      case 7:
        return (
          <div className="text-white/90 mb-8 text-center max-w-md mx-auto">
            Thank you for entrusting us with your business! Your details have been submitted
            successfully. Sit back and relax while we take it from here.
          </div>
        );
      default:
        return null;
    }
  };

  // Render company type options
  const renderCompanyTypeOptions = () => {
    const companyTypes = [
      { id: "retail", name: "Retail", icon: "/lovable-uploads/d7151558-8f7b-4720-b10c-aa07eba001c0.png" },
      { id: "wholesale", name: "Wholesale", icon: "/lovable-uploads/fd569f55-6f1e-4e15-951b-31519f28be83.png" },
      { id: "manufacturing", name: "Manufacturing", icon: "/lovable-uploads/96bc93ee-770c-4736-9917-a65c6166c801.png" },
      { id: "distributor", name: "Distributor", icon: "/lovable-uploads/23c958f4-8439-4926-9101-018bc647b0b6.png" },
      { id: "service", name: "Service", icon: "/lovable-uploads/fd569f55-6f1e-4e15-951b-31519f28be83.png" },
      { id: "individual", name: "Individual", icon: "/lovable-uploads/23c958f4-8439-4926-9101-018bc647b0b6.png" },
    ];

    return (
      <div className="grid grid-cols-3 gap-4">
        {companyTypes.map((type) => (
          <div
            key={type.id}
            className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-400 ${
              formData.companyType === type.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onClick={() => handleSelectChange("companyType", type.id)}
          >
            <img src={type.icon} alt={type.name} className="w-16 h-16 mb-2" />
            <span className="text-sm font-medium">{type.name}</span>
          </div>
        ))}
      </div>
    );
  };

  // Render industry type options
  const renderIndustryTypeOptions = () => {
    const industryTypes = [
      "Agriculture", 
      "Tourism", 
      "Healthcare",
      "Information Technology", 
      "Finance and Insurance", 
      "Hospitality and Tourism",
      "Education", 
      "Energy and Utilities", 
      "Transportation & Logistics",
      "Entertainment and Media", 
      "Real Estate", 
      "Telecommunications",
      "Automotive", 
      "Fashion and Apparel", 
      "Other"
    ];

    return (
      <div className="grid grid-cols-3 gap-4">
        {industryTypes.map((type) => (
          <div
            key={type}
            className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all hover:border-blue-400 ${
              formData.industryType === type ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onClick={() => handleSelectChange("industryType", type)}
          >
            <span className="text-sm font-medium">{type}</span>
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
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-white">Welcome to Billclap</h2>
            <p className="text-white/80 mb-8">Let's set up your business profile to get started with our invoicing platform.</p>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                  <span className="text-gray-800 text-sm font-medium">Do you have GST Number?</span>
                  <span className="text-gray-400 ml-2 text-xs">(optional)</span>
                </div>
                <Switch 
                  checked={formData.hasGst}
                  onCheckedChange={(checked) => handleToggleChange(checked, "hasGst")}
                />
              </div>
            </div>

            {formData.hasGst && (
              <div className="mb-4">
                <Label htmlFor="gstNumber" className="text-gray-700">
                  GST Number
                </Label>
                <Input 
                  id="gstNumber"
                  type="text" 
                  name="gstNumber" 
                  value={formData.gstNumber} 
                  onChange={handleChange} 
                  placeholder="Enter GST Number" 
                  className="border-gray-300"
                />
              </div>
            )}

            <div className="mb-4">
              <Label htmlFor="businessName" className="text-gray-700">
                Enter Your Company Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="businessName"
                type="text" 
                name="businessName" 
                value={formData.businessName} 
                onChange={handleChange} 
                placeholder="Enter your company name" 
                className="border-gray-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="pincode" className="text-gray-700">
                  Enter Your Pincode <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="pincode"
                  type="text" 
                  name="pincode" 
                  value={formData.pincode} 
                  onChange={handleChange} 
                  placeholder="Enter your 6-digit pincode" 
                  className="border-gray-300"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-gray-700">
                  Enter Your City <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="city"
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  placeholder="Enter your city" 
                  className="border-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="state" className="text-gray-700">
                  Enter Your State <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange("state", value)} value={formData.state}>
                  <SelectTrigger id="state" className="border-gray-300">
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
                <Label htmlFor="country" className="text-gray-700">
                  Enter Your Country <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange("country", value)} value={formData.country}>
                  <SelectTrigger id="country" className="border-gray-300">
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
                <Label htmlFor="billsPerMonth" className="text-gray-700">
                  How many bills do you generate in a month?
                </Label>
                <Input 
                  id="billsPerMonth"
                  type="text" 
                  name="billsPerMonth" 
                  value={formData.billsPerMonth} 
                  onChange={handleChange} 
                  placeholder="Enter number of bills" 
                  className="border-gray-300"
                />
              </div>
              <div>
                <Label htmlFor="useEInvoice" className="text-gray-700">
                  Do you use e-invoice or e-way bill system?
                </Label>
                <Select onValueChange={(value) => handleToggleChange(value === "yes", "useEInvoice")} value={formData.useEInvoice ? "yes" : "no"}>
                  <SelectTrigger id="useEInvoice" className="border-gray-300">
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
            <h3 className="text-xl font-medium text-gray-800 mb-6">Select Your Company Type</h3>
            {renderCompanyTypeOptions()}
          </Card>
        );
      case 5:
        return (
          <Card className="bg-white rounded-md p-6 shadow-lg w-full max-w-xl">
            <h3 className="text-xl font-medium text-gray-800 mb-6">Select Your Industry Type</h3>
            {renderIndustryTypeOptions()}
          </Card>
        );
      case 6:
        return (
          <Card className="bg-white rounded-md p-6 shadow-lg w-full max-w-xl">
            <div className="space-y-4">
              <div>
                <Label htmlFor="registrationType" className="text-gray-700">Registration/Tax ID</Label>
                <Input 
                  id="registrationType"
                  type="text" 
                  name="registrationType" 
                  value={formData.registrationType} 
                  onChange={handleChange} 
                  placeholder="Tax ID / VAT / Registration Number" 
                  className="border-gray-300"
                />
              </div>
            </div>
          </Card>
        );
      case 7:
        return (
          <div className="text-center space-y-8">
            <div className="mx-auto w-20 h-20 flex items-center justify-center">
              <img src="/lovable-uploads/23c958f4-8439-4926-9101-018bc647b0b6.png" alt="Celebration" className="w-full h-full" />
            </div>
            <h1 className="text-white text-3xl font-bold">Congratulations! Steps Completed Successfully</h1>
            <Button 
              onClick={handleNext} 
              className="mt-8 bg-white text-blue-600 hover:bg-white/90 px-6"
            >
              Start Billing
            </Button>
          </div>
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-600">
      {/* Left side with logo, step indicator and description */}
      <div className="w-1/3 p-12 flex flex-col">
        <div className="mb-auto">
          <div className="text-white text-3xl font-bold mb-12">
            <span className="text-white">Bill</span>
            <span className="text-white">clap</span>
          </div>
          
          {step > 1 && step < 7 && (
            <>
              {renderStepIndicator()}
              <h1 className="text-3xl font-bold text-white mb-6">{renderStepTitle()}</h1>
              {renderStepDescription()}
            </>
          )}
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
