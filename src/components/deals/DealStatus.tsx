
import { useDeal } from '@/contexts/DealContext';
import { useAuth } from '@/contexts/AuthContext';
import { Deal, DealStatus as DealStatusType } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react';

interface DealStatusProps {
  deal: Deal;
}

const getStatusIcon = (status: DealStatusType) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'in_progress':
      return <Clock className="h-5 w-5 text-blue-500" />;
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'cancelled':
      return <XCircle className="h-5 w-5 text-red-500" />;
  }
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const DealStatusComponent = ({ deal }: DealStatusProps) => {
  const [selectedStatus, setSelectedStatus] = useState<DealStatusType>(deal.status);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { updateDealStatus } = useDeal();
  const { user } = useAuth();
  
  const isUserInvolved = user?.id === deal.buyerId || user?.id === deal.sellerId;
  const canUpdateStatus = isUserInvolved && deal.status !== 'completed' && deal.status !== 'cancelled';
  
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value as DealStatusType);
  };
  
  const handleUpdateStatus = async () => {
    if (selectedStatus === deal.status) return;
    
    setIsUpdating(true);
    
    try {
      await updateDealStatus(deal.id, selectedStatus);
    } catch (error) {
      console.error('Error updating deal status:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deal Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            {getStatusIcon(deal.status)}
            <div>
              <p className="font-medium">
                Current Status: <span className="capitalize">{deal.status.replace('_', ' ')}</span>
              </p>
            </div>
          </div>
          
          {canUpdateStatus ? (
            <div className="space-y-4">
              <Select value={selectedStatus} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                onClick={handleUpdateStatus}
                disabled={isUpdating || selectedStatus === deal.status}
                className="w-full"
              >
                {isUpdating ? 'Updating...' : 'Update Status'}
              </Button>
            </div>
          ) : (
            <div className="pt-2">
              {deal.status === 'completed' || deal.status === 'cancelled' ? (
                <p className="text-sm text-muted-foreground">
                  This deal is {deal.status} and cannot be updated
                </p>
              ) : !isUserInvolved ? (
                <p className="text-sm text-muted-foreground">
                  Only the buyer or seller can update this deal's status
                </p>
              ) : null}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DealStatusComponent;
