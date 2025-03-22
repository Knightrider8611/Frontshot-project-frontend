import CarCatalog from "@/components/CarCatalog";
import CarPanel from "@/components/CarPanel";
import getCars from "@/libs/getCars"
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
export default async function Car(){
    const cars = await getCars();
    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Desired Car</h1>
            {/* <CarPanel/> */}
            <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                <CarCatalog carJson={cars}/>
            </Suspense>
            <hr className="my-10"/>
            {/* <h1 className="text-xl font-medium">TRY Client-side Car Panel</h1>
            <CarPanel/> */}
        </main>
    );
}