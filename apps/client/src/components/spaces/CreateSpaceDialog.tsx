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
import { MapSelector } from "@/components/spaces/MapSelector";
import { spaceService } from "@/services/api";
import { toast } from "sonner";

interface CreateSpaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateSpaceDialog({ open, onOpenChange }: CreateSpaceDialogProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedMap, setSelectedMap] = useState({ mapId: "", dimensions: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!name || !selectedMap) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await spaceService.createSpace(name, selectedMap.mapId, selectedMap.dimensions);
      toast.success("Space created successfully!");
      onOpenChange(false);
      navigate(`/space/${response.data.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create space");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] h-[85vh] max-w-none max-h-none">
        <DialogHeader>
          <DialogTitle>Create New Space</DialogTitle>
          <DialogDescription>
            Create your own virtual space by selecting a map and giving it a name.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Space Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter space name"
            />
          </div>
          <MapSelector onSelect={(mapId, dimensions) => setSelectedMap({ mapId, dimensions })} selected={selectedMap} />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Space"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}