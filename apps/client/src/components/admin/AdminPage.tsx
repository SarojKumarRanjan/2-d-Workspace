/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { adminService } from "@/services/api"
import { toast } from "sonner"



function AdminPage() {
    const [nature,setNature] = useState<boolean>(true)
    const [elementThumbnail, setElementThumbnail] = useState<File | null>(null)
    const [width,setWidth] = useState<number>(0)
    const [height,setHeight] = useState<number>(0)
    const [avatarThumbnail,setAvatarThumbnail] = useState<File | null>(null);
    const [avatarName,setAvatarName] = useState<string>("")
    const [mapThumbnail,setMapThumbnail] = useState<File | null>(null)
    

    const handleCreateElement = async () => {
        const formData = new FormData()
        //@ts-ignore
        formData.append("static", nature!)
        formData.append("thumbnail", elementThumbnail!)
        //@ts-ignore
        formData.append("width", width!)
        //@ts-ignore
        formData.append("height", height!)
       const response = await adminService.createElement(formData)
       console.log(response)
       if(response.status === 201){
        toast.success(response.data.message)
        setElementThumbnail(null)
        setHeight(0)
        setWidth(0)
        setNature(true)
       }
       else{
        toast.error("Failed to create element")
       }
       
    }

    const handleCreateAvatar = async() => {
        const formData  = new FormData();
        formData.append("name",avatarName);
        //@ts-ignore
        formData.append("thumbnail",avatarThumbnail)

        const res = await adminService.createAvatar(formData);
        if(res.data.status===201){
            toast.success(res.data.message)
            setAvatarName("")
            setAvatarThumbnail(null)
            
        }
        else{
            toast.error("Failed to create avatar")
        }
    }

    const handleCreateMap = async () => {
        const formData = new FormData();
        formData.append("name", "demomap");
        formData.append("thumbnail", mapThumbnail!);
        formData.append("dimensions", "200x200");
    
        
        formData.append(
            "defaultElements",
            JSON.stringify([
                {
                    elementId: "cm4ofwak90000jtk1z9ne02mp",
                    x: 4,
                    y: 5,
                },
                {
                    elementId: "cm4og2u3r0000a8kfpupgacz1",
                    x: 16,
                    y: 25,
                },
            ])
        );
    
        try {
            const res = await adminService.createMap(formData);
            if (res.status == 201) {
                toast.success(res.data.message);
                console.log(res.data);
                
                setMapThumbnail(null);
            } else {
                console.log(res.data);
                toast.error("Failed to create map");
            }
        } catch (error) {
            toast.error("An error occurred while creating the map");
            console.error(error);
        }
    };
    

  return (
    <div className="flex justify-between mx-28 h-[calc(100vh-20rem)] items-center gap-4">
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Create Element</h1>

            
            
            <Label>Thumbnail</Label>
            <Input type="file"
             onChange={(e) => {
                //@ts-ignore
                return setElementThumbnail(e.target.files[0])}}
             placeholder="Thumbnail" />
            <Label>Nature</Label>
            <Select
             value={nature.toString()}
             onValueChange={(value) => setNature(value === "true")}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Nature" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="true">Static</SelectItem>
                    <SelectItem value="false">Dynamic</SelectItem>
                </SelectContent>
            </Select>
            <Label>Width</Label>
            <Input type="number"
             value={width}
             onChange={(e) => setWidth(Number(e.target.value))}
             placeholder="Width" />
            <Label>Height</Label>
            <Input type="number"
             value={height}
             onChange={(e) => setHeight(Number(e.target.value))}
             placeholder="Height" />
            <Button onClick={handleCreateElement}>Create</Button>
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Create Avatar</h1>
            <Label>Name</Label>
            <Input
            onChange={(e) => setAvatarName(e.target.value)}
            placeholder="Name" />
            <Label>Thumbnail</Label>
           
            <Input onChange={(e) => {
                //@ts-ignore
                return setAvatarThumbnail(e.target.files[0])}}
             type="file" placeholder="Thumbnail" />
            <Button onClick={handleCreateAvatar}>Create</Button>
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Create Map</h1>
            <Label>Name</Label>
            <Input placeholder="Name" />
            <Label>Thumbnail</Label>
            <Input
            onChange={(e) => {
                //@ts-ignore
                return setMapThumbnail(e.target.files[0])}}
             type="file" placeholder="Thumbnail" />
            <Label>Dimensions</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select Dimensions" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="100x100">100x100</SelectItem>
                    <SelectItem value="200x200">200x200</SelectItem>
                    <SelectItem value="300x300">300x300</SelectItem>
                </SelectContent>
            </Select>
            
            <Label>Default Elements</Label>
            <Input placeholder="Default Elements id" />

            <Button onClick={handleCreateMap}>Create</Button>
        </div>
    </div>
  )
}

export default AdminPage