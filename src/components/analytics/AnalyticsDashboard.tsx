
import { AnalyticsData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Users, MessageSquare, File, ShoppingBag } from 'lucide-react';

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

const statusColors = {
  completed: '#10B981',  // Green
  pending: '#FBBF24',    // Yellow
  inProgress: '#3B82F6', // Blue
  cancelled: '#EF4444',  // Red
};

const AnalyticsDashboard = ({ data }: AnalyticsDashboardProps) => {
  // Data for the deal status pie chart
  const dealStatusData = [
    { name: 'Completed', value: data.completedDeals, color: statusColors.completed },
    { name: 'Pending', value: data.pendingDeals, color: statusColors.pending },
    { name: 'In Progress', value: data.inProgressDeals, color: statusColors.inProgress },
    { name: 'Cancelled', value: data.cancelledDeals, color: statusColors.cancelled },
  ];
  
  // Data for user role pie chart
  const userRoleData = [
    { name: 'Buyers', value: data.buyersCount, color: '#3B82F6' },
    { name: 'Sellers', value: data.sellersCount, color: '#8B5CF6' },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-dealBlue-light/20 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-dealBlue-light" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Deals</p>
                <p className="text-3xl font-bold">{data.totalDeals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-dealBlue-light/20 p-3 rounded-full">
                <Users className="h-6 w-6 text-dealBlue-light" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">{data.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-dealBlue-light/20 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-dealBlue-light" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Messages Sent</p>
                <p className="text-3xl font-bold">{data.messagesSent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-dealBlue-light/20 p-3 rounded-full">
                <File className="h-6 w-6 text-dealBlue-light" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-3xl font-bold">{data.documentsUploaded}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Status Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Deal Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dealStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {dealStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* User Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Monthly Deals */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.monthlyDeals}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2C74B3" name="Deals" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
