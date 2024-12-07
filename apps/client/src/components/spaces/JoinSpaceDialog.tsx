import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { spaceService } from "@/services/api";
import { toast } from "sonner";

interface JoinSpaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinSpaceDialog({ open, onOpenChange }: JoinSpaceDialogProps) {
  const navigate = useNavigate();
  const [spaceId, setSpaceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async () => {
    if (!spaceId) {
      toast.error("Please enter a space ID");
      return;
    }

    setIsLoading(true);
    try {
      // Verify space exists before navigating
      await spaceService.getSpace(spaceId);
      onOpenChange(false);
      navigate(`/space/${spaceId}`);
    } catch (error) {
      toast.error("Invalid space ID");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Space</DialogTitle>
          <DialogDescription>
            Enter a space ID to join an existing virtual space.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="spaceId">Space ID</Label>
            <Input
              id="spaceId"
              value={spaceId}
              onChange={(e) => setSpaceId(e.target.value)}
              placeholder="Enter space ID"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleJoin} disabled={isLoading}>
              {isLoading ? "Joining..." : "Join Space"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}