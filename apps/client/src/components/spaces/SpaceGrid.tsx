
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Space } from "@/types";
import { useNavigate } from "react-router-dom";

interface SpaceGridProps {
  spaces: Space[];
}

export function SpaceGrid({ spaces }: SpaceGridProps) {
  const navigate = useNavigate();

  if (!Array.isArray(spaces)) {
    console.error('Spaces prop is not an array:', spaces);
    return <div>Error: Invalid spaces data</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {spaces.map((space) => (
        <div
          key={space.id}
          className="rounded-lg border bg-card p-4 hover:shadow-lg transition-all"
        >
          <div className="aspect-video rounded-md bg-muted mb-4 overflow-hidden">
            {/* Map preview would go here */}
            <div className="w-full h-full bg-primary/10"></div>
          </div>
          <h3 className="text-lg font-semibold mb-2">{space.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Users className="w-4 h-4 mr-1" />
            {space.participants?.length || 0} participants
          </div>
          <Button 
            className="w-full"
            onClick={() => navigate(`/space/${space.id}`)}
          >
            Join Space
          </Button>
        </div>
      ))}
    </div>
  );
}