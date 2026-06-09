
import {z} from "zod"

export const  reportSchema= z.object({
    type: z.enum([
    "flood",
    "fire",
    "earthquake",
    "cyclone",
    "landslide"
  ]),
    description : z
        .string()
        .min(10,"Description too short")
        .max(150,"Description too long"),
    latitude : z
        .number()
        .min(-90)
        .max(90),
    longitude : z
        .number()
        .min(-90)
        .max(90)
});
