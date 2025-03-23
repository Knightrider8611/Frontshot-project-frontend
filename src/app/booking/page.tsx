"use client";
import getRents from "@/libs/getRents";
import { BookingItem, BookingJson } from "interfaces";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function RentPage() {
  const {data:session} = useSession();
  const [rentJson, setRentJson] = useState<BookingJson>({success:false,count:0,data:[]});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  if(!session?.user.token){
    return;
  }
  useEffect(() => {
    const fetchRents = async () => {
      try {
        const response = await getRents(session?.user.token)
        setRentJson(response);
      } catch (err) {
        setError("Could not fetch rents.");
      } finally {
        setLoading(false);
      }
    };

    fetchRents();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <main className="p-6">
      {session.user.User_info.role==='admin'?
      <>
      <h1 className="text-2xl font-bold mb-4">All Rent History</h1>
      <h2 className="text-xl font-bold mb-4"> You can Remove Renting, Change Renting Date for Anyone</h2>
      </>:
      <>
      <h1 className="text-2xl font-bold mb-4">Your Rent History</h1>
      <h2 className="text-xl font-bold mb-4"> You can Remove Renting, Change Renting Date</h2>
      </>
      }
      <div className="space-y-4">
        {rentJson.data.length === 0 ? (
          <div>No Rents.</div>
        ) : (
          rentJson.data.map((rentItem:BookingItem) => (
            <div key={rentItem._id} className="p-4 border rounded-lg shadow">
              <div className="text-xl">Renting ID : {rentItem._id}</div>
              <div className="text-xl">Car Name : {rentItem.car_info.name}</div>
              <div className="text-xl">User Name : {rentItem.user_info.name}</div>
              <div className="text-xl">Start Date : {rentItem.startDate.substring(0,10)}</div>
              <div className="text-xl">End Date : {rentItem.endDate.substring(0,10)}</div>
              <div className="text-xl">Status : {rentItem.status}</div>
              <div className="text-xl">Confirmation Date : {rentItem.iDate}</div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
