
import { useState, useRef } from 'react';
import { useDeal } from '@/contexts/DealContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@/types';

interface DocumentUploadProps {
  dealId: string;
  otherUser: User | undefined;
  onUploadComplete: () => void;
}

const DocumentUpload = ({ dealId, otherUser, onUploadComplete }: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [shareWithOther, setShareWithOther] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { uploadDocument } = useDeal();
  const { user } = useAuth();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const clearSelectedFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleUpload = async () => {
    if (!file || !user) return;
    
    setIsUploading(true);
    
    try {
      // Determine access control (who can see this document)
      const accessControl = [user.id];
      if (shareWithOther && otherUser) {
        accessControl.push(otherUser.id);
      }
      
      await uploadDocument(dealId, file, user.id, accessControl);
      clearSelectedFile();
      onUploadComplete();
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-medium">Upload Document</h3>
      
      <div className="space-y-2">
        <Label htmlFor="document">Select file</Label>
        <div className="flex items-center space-x-2">
          <Input
            ref={fileInputRef}
            id="document"
            type="file"
            onChange={handleFileChange}
            className="flex-1"
          />
          {file && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSelectedFile}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {file && (
        <>
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
          
          {otherUser && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="share"
                checked={shareWithOther}
                onCheckedChange={(checked) => 
                  setShareWithOther(checked as boolean)
                }
              />
              <Label htmlFor="share" className="text-sm">
                Share with {otherUser.name}
              </Label>
            </div>
          )}
        </>
      )}
      
      <Button
        type="button"
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full"
      >
        {isUploading ? (
          'Uploading...'
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </>
        )}
      </Button>
    </div>
  );
};

export default DocumentUpload;
