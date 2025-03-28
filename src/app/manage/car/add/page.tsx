"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import createCar from "@/libs/createCar";

export default function AddCarPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    vin_plate: "",
    provider_info: "",
    picture: "",
    capacity: 1,
    model: "",
    pricePerDay: 1,
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "capacity" || name === "pricePerDay" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    try {
      if (!session?.user.token) {
        setError(true);
        setErrorMessage("You must be logged in as an admin to add a car.");
        return;
      }
      console.log(formData.picture);
      const response = await createCar(
        session.user.token,
        formData.name,
        formData.vin_plate,
        formData.provider_info,
        formData.picture,
        formData.capacity,
        formData.model,
        formData.pricePerDay
      );

      if (response.success) {
        alert("Created car successfully");
        router.push("/car");
      } else {
        setError(true);
        setErrorMessage(response.message || "Failed to add car.");
      }
    } catch (error) {
      setError(true);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <>
      {session?.user.User_info.role === "admin" ? (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md font-[BlinkMacSystemFont] mt-5">
          <h2 className="text-4xl font-semibold mb-6 text-indigo-600 text-center">
            Add New Car
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Car Name
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter car name"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="vin_plate"
              >
                VIN
              </label>
              <input
                type="text"
                required
                name="vin_plate"
                value={formData.vin_plate}
                onChange={handleChange}
                placeholder="Enter VIN"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="provider_info"
              >
                Car Provider ID
              </label>
              <input
                type="text"
                required
                name="provider_info"
                value={formData.provider_info}
                onChange={handleChange}
                placeholder="Enter provider's ID"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="picture"
              >
                Car Picture URL
              </label>
              <input
                type="text"
                required
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                placeholder="Enter picture URL"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="capacity"
              >
                Car Capacity
              </label>
              <input
                type="number"
                required
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Enter capacity"
                min={1}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="model"
              >
                Car Model
              </label>
              <input
                type="text"
                required
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Enter model or description"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="pricePerDay"
              >
                Daily Rental Rate
              </label>
              <input
                type="number"
                required
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                placeholder="Enter daily rate"
                min={1}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors duration-300"
            >
              Add New Car
            </button>
            {error && (
              <p className="text-red-500 mt-2 text-center">{errorMessage}</p>
            )}
          </form>
        </div>
      ) : (
        <div className="text-center text-xl text-red-500 p-4">
          You are not an admin. Access denied.
        </div>
      )}
    </>
  );
}
