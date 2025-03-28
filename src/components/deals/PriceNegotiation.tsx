
import { useState } from 'react';
import { useDeal } from '@/contexts/DealContext';
import { useAuth } from '@/contexts/AuthContext';
import { Deal } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';

interface PriceNegotiationProps {
  deal: Deal;
}

const PriceNegotiation = ({ deal }: PriceNegotiationProps) => {
  const [newPrice, setNewPrice] = useState<string>(deal.currentPrice.toString());
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { updateDealPrice } = useDeal();
  const { user } = useAuth();
  
  const isDecrease = parseFloat(newPrice) < deal.currentPrice;
  const percentChange = deal.currentPrice > 0
    ? Math.abs(((parseFloat(newPrice) - deal.currentPrice) / deal.currentPrice) * 100)
    : 0;
    
  const isCompleted = deal.status === 'completed' || deal.status === 'cancelled';
  const isBuyer = user?.id === deal.buyerId;
  const isSeller = user?.id === deal.sellerId;
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setNewPrice(value);
    setError(null);
  };
  
  const validatePrice = (): boolean => {
    const priceValue = parseFloat(newPrice);
    
    if (isNaN(priceValue) || priceValue <= 0) {
      setError('Please enter a valid price');
      return false;
    }
    
    if (priceValue === deal.currentPrice) {
      setError('New price must be different from current price');
      return false;
    }
    
    // Buyers can only decrease the price, sellers can only increase
    if (isBuyer && priceValue > deal.currentPrice) {
      setError('As a buyer, you can only offer a lower price');
      return false;
    }
    
    if (isSeller && priceValue < deal.currentPrice) {
      setError('As a seller, you can only offer a higher price');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePrice()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await updateDealPrice(deal.id, parseFloat(newPrice));
    } catch (error) {
      console.error('Error updating price:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Negotiation</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Price negotiation is unavailable for {deal.status} deals
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Negotiation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Initial Price</p>
              <p className="text-xl font-medium">${deal.initialPrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-xl font-medium">${deal.currentPrice.toLocaleString()}</p>
            </div>
          </div>
          
          {(isBuyer || isSeller) && deal.status === 'in_progress' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPrice">
                  {isBuyer ? 'Make a counter-offer' : 'Update price'}
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  <Input
                    id="newPrice"
                    value={newPrice}
                    onChange={handlePriceChange}
                    className="pl-7"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                
                {newPrice !== deal.currentPrice.toString() && !error && (
                  <div className="flex items-center space-x-2 text-sm">
                    {isDecrease ? (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                        <span>Decrease by {percentChange.toFixed(2)}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>Increase by {percentChange.toFixed(2)}%</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Price'}
              </Button>
            </form>
          )}
          
          {!isBuyer && !isSeller && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You must be the buyer or seller to negotiate the price
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceNegotiation;
