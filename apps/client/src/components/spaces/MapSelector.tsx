import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateMapDialog } from "@/components/spaces/CreateMapDialog";
import { useMaps } from "@/hooks/use-maps";
import { ScrollArea } from "../ui/scrollArea";

interface MapSelectorProps {
  onSelect: (mapId: string,dimensions:string) => void;
  selected: {
    mapId: string;
    dimensions: string;
  };
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
      <ScrollArea className="h-72 w-full ">
      <div className="grid grid-cols-4 gap-4">
        
        {maps.map((map) => (
          <div
            key={map.id}
            className={`w-[290px] h-[250px]  cursor-pointer rounded-lg border p-2 mx-2 ${
              selected.mapId === map.id
                ? "border-primary bg-primary/10"
                : "hover:border-primary/50"
            }`}
            onClick={() => onSelect(map.id,`${map.width}x${map.height}`)}
          >
            <div className="aspect-video rounded bg-muted mb-2">
              {map.thumbnail ? (
                <img
                 
                  src={map.thumbnail}
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
      </ScrollArea>
      <CreateMapDialog 
        open={createMapOpen} 
        onOpenChange={setCreateMapOpen} 
      />
    </div>
  );
}