import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpaceGrid } from "@/components/spaces/SpaceGrid";
import { CreateSpaceDialog } from "@/components/spaces/CreateSpaceDialog";
import { JoinSpaceDialog } from "@/components/spaces/JoinSpaceDialog";
import { useSpaces } from "@/hooks/use-spaces";

export function SpacesPage() {
  const { spaces, isLoading, error } = useSpaces();
  const [createOpen, setCreateOpen] = React.useState(false);
  const [joinOpen, setJoinOpen] = React.useState(false);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Virtual Spaces</h1>
          <p className="text-muted-foreground">
            Join an existing space or create your own
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setJoinOpen(true)} variant="outline">
            Join Space
          </Button>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Space
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center text-destructive p-4">
          {error}
        </div>
      ) : spaces.length === 0 ? (
        <div className="text-center text-muted-foreground p-8">
          <p>No spaces found. Create a new space to get started!</p>
        </div>
      ) : (
        <SpaceGrid spaces={spaces} />
      )}

      <CreateSpaceDialog open={createOpen} onOpenChange={setCreateOpen} />
      <JoinSpaceDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}