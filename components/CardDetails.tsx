"use client";

import { CarsProps } from "@/types";
import { generateCarImageUrls } from "@/utils";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import useSWR from "swr";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarsProps;
}

const fetchCarImages = async (car: CarsProps) => {
  const urls = await generateCarImageUrls(car);
  return urls;
};

const CardDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  // استخدام useSWR لجلب الصور عند فتح المودال
  const { data: imageUrls, error } = useSWR(
    isOpen ? car : null,
    fetchCarImages
  );

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-white rounded-full"
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-3">
                    {error ? (
                      <div className="text-red-600">error to upload photo</div>
                    ) : !imageUrls ? (
                      <div>Loading..</div>
                    ) : (
                      <div className="flex gap-3">
                        {imageUrls.map((url, index) => (
                          <div
                            key={index}
                            className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg"
                          >
                            {/* تحقق من أن url ليس null قبل استخدامه */}
                            {url ? (
                              <Image
                                src={url}
                                alt={`car image ${index + 1}`}
                                fill
                                priority={false}
                                loading="lazy"
                                quality={50}
                                sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                                className="object-contain"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Photo</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {car.make} {car.model}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex justify-between gap-5 w-full text-right"
                          key={key}
                        >
                          <h4 className="text-grey capitalize">
                            {key.split("_").join(" ")}
                          </h4>
                          <p className="text-black-100 font-semibold">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CardDetails;
