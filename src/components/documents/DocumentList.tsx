
import { Document, User } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Eye, EyeOff, File } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

interface DocumentListProps {
  documents: Document[];
  users: {
    [key: string]: User;
  };
}

const DocumentList = ({ documents, users }: DocumentListProps) => {
  const { user: currentUser } = useAuth();
  
  if (documents.length === 0) {
    return (
      <div className="text-center py-6 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">No documents have been uploaded yet</p>
      </div>
    );
  }
  
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <File className="h-5 w-5 text-red-500" />;
    } else if (type.includes('sheet') || type.includes('excel')) {
      return <File className="h-5 w-5 text-green-600" />;
    } else if (type.includes('word')) {
      return <File className="h-5 w-5 text-blue-600" />;
    } else {
      return <File className="h-5 w-5" />;
    }
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };
  
  const canAccessDocument = (document: Document) => {
    if (!currentUser) return false;
    return document.accessControl.includes(currentUser.id);
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Access</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium flex items-center">
                {getFileIcon(doc.type)}
                <span className="ml-2">{doc.name}</span>
              </TableCell>
              <TableCell>{users[doc.uploadedBy]?.name || 'Unknown'}</TableCell>
              <TableCell>{format(new Date(doc.createdAt), 'MMM d, yyyy')}</TableCell>
              <TableCell>{formatFileSize(doc.size)}</TableCell>
              <TableCell>
                {canAccessDocument(doc) ? (
                  <div className="flex items-center text-green-600">
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="text-xs">Accessible</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <EyeOff className="h-4 w-4 mr-1" />
                    <span className="text-xs">No Access</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                {canAccessDocument(doc) && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={doc.url} download={doc.name}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </a>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentList;
