
import { Deal } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { MessageSquare, File } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
}

const DealStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="deal-status-pending">Pending</Badge>;
    case 'in_progress':
      return <Badge variant="outline" className="deal-status-in-progress">In Progress</Badge>;
    case 'completed':
      return <Badge variant="outline" className="deal-status-completed">Completed</Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="deal-status-cancelled">Cancelled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const DealCard = ({ deal }: DealCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{deal.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Created {format(new Date(deal.createdAt), 'MMM d, yyyy')}
            </p>
          </div>
          <DealStatusBadge status={deal.status} />
        </div>
        
        <p className="text-sm line-clamp-2 mb-4">{deal.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Initial Price</p>
            <p className="font-medium">${deal.initialPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Price</p>
            <p className="font-medium">${deal.currentPrice.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="flex items-center text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="text-xs">{deal.messages.length}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <File className="h-4 w-4 mr-1" />
              <span className="text-xs">{deal.documents.length}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            {deal.buyer && (
              <div className="text-xs">
                <span className="text-muted-foreground">Buyer: </span>
                <span>{deal.buyer.name}</span>
              </div>
            )}
            {deal.seller && (
              <div className="text-xs">
                <span className="text-muted-foreground">Seller: </span>
                <span>{deal.seller.name}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Link to={`/deals/${deal.id}`} className="text-sm font-medium text-dealBlue-light hover:underline w-full text-center">
          View Deal
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DealCard;
