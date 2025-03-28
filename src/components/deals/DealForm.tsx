
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeal } from '@/contexts/DealContext';
import { useAuth } from '@/contexts/AuthContext';
import { DealFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DealForm = () => {
  const [formData, setFormData] = useState<DealFormData>({
    title: '',
    description: '',
    initialPrice: 0,
  });
  const [errors, setErrors] = useState<Partial<DealFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createDeal } = useDeal();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'initialPrice') {
      // Only allow numbers for price field
      const numericValue = value.replace(/[^0-9.]/g, '');
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is edited
    if (errors[name as keyof DealFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DealFormData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.initialPrice || formData.initialPrice <= 0) {
      newErrors.initialPrice = 'Please enter a valid price';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!user) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const parsedData = {
        ...formData,
        initialPrice: parseFloat(formData.initialPrice.toString()),
      };
      
      const newDeal = await createDeal(parsedData, user.id);
      navigate(`/deals/${newDeal.id}`);
    } catch (error) {
      console.error('Error creating deal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Deal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Deal Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter deal title"
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter deal description"
              rows={4}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="initialPrice">Initial Price ($)</Label>
            <Input
              id="initialPrice"
              name="initialPrice"
              type="text"
              value={formData.initialPrice || ''}
              onChange={handleChange}
              placeholder="0.00"
              className={errors.initialPrice ? 'border-destructive' : ''}
            />
            {errors.initialPrice && (
              <p className="text-sm text-destructive">{errors.initialPrice}</p>
            )}
          </div>
          
          {user?.role !== 'buyer' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Only buyers can create new deals
              </AlertDescription>
            </Alert>
          )}
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting || user?.role !== 'buyer'}
            >
              {isSubmitting ? 'Creating...' : 'Create Deal'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <Button variant="outline" onClick={() => navigate('/deals')}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DealForm;
