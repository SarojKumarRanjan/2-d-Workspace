import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateMapDialog } from "@/components/spaces/CreateMapDialog";
import { useMaps } from "@/hooks/use-maps";

interface MapSelectorProps {
  onSelect: (mapId: string) => void;
  selected: string;
}

export function MapSelector({ onSelect, selected }: MapSelectorProps) {
  const { maps, isLoading, error } = useMaps();
  const [createMapOpen, setCreateMapOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Label>Select Map</Label>
        <div className="flex items-center justify-center h-40 bg-muted/50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <Label>Select Map</Label>
        <div className="flex items-center justify-center h-40 bg-destructive/10 text-destructive rounded-lg">
          <p>Failed to load maps</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label>Select Map</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCreateMapOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Create Map
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {maps.map((map) => (
          <div
            key={map.id}
            className={`cursor-pointer rounded-lg border p-2 ${
              selected === map.id
                ? "border-primary bg-primary/10"
                : "hover:border-primary/50"
            }`}
            onClick={() => onSelect(map.id)}
          >
            <div className="aspect-video rounded bg-muted mb-2">
              {map.previewUrl ? (
                <img
                  src={map.previewUrl}
                  alt={map.name}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 rounded flex items-center justify-center text-muted-foreground text-sm">
                  No Preview
                </div>
              )}
            </div>
            <p className="text-sm font-medium truncate">{map.name}</p>
          </div>
        ))}
      </div>
      <CreateMapDialog 
        open={createMapOpen} 
        onOpenChange={setCreateMapOpen} 
      />
    </div>
  );
}