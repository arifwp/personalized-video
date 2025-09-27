"use client";

import { InputSelect } from "@/components/inputs/InputSelect";
import { Actor, mockActors } from "@/constants/actors";
import { api } from "@/lib/AxiosInstance";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Form {
  name: string;
  city: string;
  phone: string;
  actor: Actor;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<Form>({
    defaultValues: {
      actor: mockActors[0],
    },
  });

  const onSubmit = async (data: Form) => {
    const request = {
      name: data.name,
      phone: data.phone,
      city: data.city,
      actorId: data.actor.id,
    };
    await api
      .post("/v1/create/video", { request })
      .then((res) => {
        toast.success(res.data?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className="w-full p-12 flex flex-col overflow-x-hidden overflow-y-auto">
      <h1 className="font-bold text-4xl text-center">Personaliz Task</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-12 flex flex-col"
      >
        <div className="space-y-12 sm:space-y-16">
          <div>
            <div className="mt-10 space-y-8 pb-12 sm:space-y-0 sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-semibold text-gray-900 sm:pt-1.5"
                >
                  Name
                </label>

                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md">
                    <input
                      {...register("name", {
                        required: "Name must be filled",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: "Only letters and spaces are allowed",
                        },
                      })}
                      disabled={isSubmitting}
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors?.name && (
                    <p className="mt-1.5 ml-1.5 text-xs md:text-sm font-light text-red-400">
                      {errors.name?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8 pb-12 sm:space-y-0 sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="city"
                  className="block text-sm/6 font-semibold text-gray-900 sm:pt-1.5"
                >
                  City
                </label>

                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md">
                    <input
                      {...register("city", {
                        required: "City must be filled",
                      })}
                      disabled={isSubmitting}
                      id="city"
                      name="city"
                      type="text"
                      placeholder="New York"
                      className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors?.city && (
                    <p className="mt-1.5 ml-1.5 text-xs md:text-sm font-light text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8 pb-12 sm:space-y-0 sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="phone"
                  className="block text-sm/6 font-semibold text-gray-900 sm:pt-1.5"
                >
                  Phone Number
                </label>

                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 sm:max-w-md">
                    <input
                      {...register("phone", {
                        required: "Phone must be filled",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Only numbers are allowed",
                        },
                      })}
                      disabled={isSubmitting}
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+62123123123"
                      className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors?.phone && (
                    <p className="mt-1.5 ml-1.5 text-xs md:text-sm font-light text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8 pb-12 sm:space-y-0 sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="actor"
                  className="block text-sm/6 font-semibold text-gray-900 sm:pt-1.5"
                >
                  Actor
                </label>

                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <Controller
                    name="actor"
                    control={control}
                    rules={{ required: "Must pick actor" }}
                    render={({ field }) => (
                      <InputSelect
                        onChange={field.onChange}
                        value={field.value}
                        options={mockActors}
                        isLoading={isSubmitting}
                      />
                    )}
                  />
                  {errors?.actor && (
                    <p className="mt-1.5 ml-1.5 text-xs md:text-sm font-light text-red-400">
                      {errors.actor.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 px-3 py-1.5 rounded-md font-semibold text-gray-900 cursor-pointer transition-colors duration-200 hover:bg-indigo-600/60 hover:text-white disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            Clear
          </button>

          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            // onClick={() => handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
