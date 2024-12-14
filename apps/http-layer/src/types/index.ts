import z from 'zod';


export const SignupSchema = z.object({
    username: z.string(),
    password: z.string(),
    role: z.enum(["user", "admin"]),
})
 export const SigninSchema = z.object({
    username:z.string(),
    password:z.string()
 })


 export const UpdateMetaDataSchema = z.object({
    avatarId:z.string()
 })

 export const CreateSpaceSchema = z.object({
    name:z.string(),
    mapId:z.string().optional(),
    dimensions:z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
 })

 export const AddElementSchema = z.object({
    spaceId: z.string(),
    elementId: z.string(),
    x: z.number(),
    y: z.number(),

 })

 export const CreateElementSchema = z.object({
    thumbnail: z.string().optional(),
    width: z.number(),
    height: z.number(),
    static: z.boolean(),
 })

 export const UpdateElementSchema = z.object({
   thumbnail:z.string().optional()
 })

 export const CreateAvatarSchema = z.object({
   thumbnail:z.string().optional(),
    name:z.string()
 })

 export const CreateMapSchema = z.object({
    thumbnail: z.string().optional(),
    dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    name: z.string(),
    defaultElements: z.array(z.object({
        elementId: z.string(),
        x: z.number(),  
        y: z.number(),
    }))
 })


 declare global {
   namespace Express {
     export interface Request {
       role?: "admin" | "user";
       userId?: string;
     }
   }
}