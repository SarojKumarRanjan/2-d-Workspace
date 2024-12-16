/* eslint-disable @typescript-eslint/ban-ts-comment */


import { Button } from "@/components/ui/button";
import { Myspace } from "@/types";
import { useNavigate } from "react-router-dom";

interface SpaceGridProps {
  spaces: Myspace[];
}

export function SpaceGrid({ spaces }: SpaceGridProps) {
  const navigate = useNavigate();

  //@ts-ignore
  const space:Myspace[] = spaces.spaces

 // console.log(spaces);
  

   if (!Array.isArray(space)) {
    console.error('Spaces prop is not an array:', space);
    return <div>Error: Invalid spaces data</div>;
  } 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {space.map((space) => (
        <div
          key={space.id}
          className="rounded-lg border bg-card p-2 hover:shadow-lg transition-all"
        >
          <div className="aspect-video rounded-md bg-muted mb-4 overflow-hidden">
            {/* Map preview would go here */}
             <img src={space.thumbnail} alt="Map preview" className="w-full h-full object-cover" /> 
            <div className="w-full h-full bg-primary/10"></div>
          </div>
          <h3 className="text-lg font-semibold mb-2">{space.name}</h3>
          
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