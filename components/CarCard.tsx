"use client";

import { CarsProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";
import { useMemo, useState } from "react";
import useSWR from "swr";
import CardDetails from "./CardDetails";
import CustomButton from "./CustomButton";

interface CarCardProps {
  car: CarsProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, drive, make, model, transmission, year } = car;

  const [isOpen, setIsOpen] = useState(false);

  const carRent = useMemo(
    () => calculateCarRent(city_mpg, year),
    [city_mpg, year]
  );

  const fetcher = async (car: CarsProps) => {
    const url = await generateCarImageUrl(car);
    await new Promise((resolve) => setTimeout(resolve, 500)); // تأخير 500 مللي ثانية
    return url;
  };

  const { data: imageUrl, error } = useSWR(
    car ? ["carImage", car] : null,
    () => fetcher(car),
    {
      fallbackData: "/hero.png",
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        {!imageUrl && !error ? (
          <div>Loading image...</div>
        ) : error ? (
          <div>Error loading image</div>
        ) : (
          <Image
            src={imageUrl!}
            alt={`${make} ${model}`}
            fill
            priority={false}
            loading="lazy"
            quality={50}
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
            className="object-contain"
            unoptimized
          />
        )}
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering-wheel"
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="tire" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="gas" />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CardDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
