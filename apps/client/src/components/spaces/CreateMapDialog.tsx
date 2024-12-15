import  { useState } from "react";
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
import { adminService } from "@/services/api";
import { toast } from "sonner";

interface CreateMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateMapDialog({ open, onOpenChange }: CreateMapDialogProps) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!name || !file) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      
      await adminService.createMap(formData);
      toast.success("Map created successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create map");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] max-w-none">
        <DialogHeader>
          <DialogTitle>Create New Map</DialogTitle>
          <DialogDescription>
            Upload a map file and give it a name to create a new virtual space template.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="mapName">Map Name</Label>
            <Input
              id="mapName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter map name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mapFile">Map File</Label>
            <Input
              id="mapFile"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept=".json,.tmx"
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
            <Button onClick={handleCreate} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Map"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}