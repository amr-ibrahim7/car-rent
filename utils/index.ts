import { CarsProps, FilterProps } from "@/types";
import { manufacturers } from "./../constants/index";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
    "x-rapidapi-key": "4ce3567686msh4d8cf5b95928697p1437bbjsnadeee62216c8",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

// export const generateCarImageUrl = (car: CarsProps, angle?: string) => {
//   const url = new URL("https://cdn.imagin.studio/getimage");
//   const { make, model, year } = car;

//   url.searchParams.append(
//     "customer",
//     process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
//   );
//   url.searchParams.append("make", make);
//   url.searchParams.append("modelFamily", model.split(" ")[0]);
//   url.searchParams.append("zoomType", "fullscreen");
//   url.searchParams.append("modelYear", `${year}`);
//   // url.searchParams.append('zoomLevel', zoomLevel);
//   angle && url.searchParams.append("angle", `${angle}`);

//   return `${url}`;
// };
// export const generateCarImageUrl = (car: CarsProps) => {
//   const url = new URL("https://www.carimagery.com/api.asmx/GetImageUrl");
//   const { make, model, year } = car;

//   // إعداد معلمات البحث
//   const searchTerm = `${make} ${model} ${year}`; // تجميع العلامة والطراز والسنة

//   // إضافة معلمات إلى URL
//   url.searchParams.append("searchTerm", searchTerm);
//   url.searchParams.append(
//     "apiKey",
//     process.env.NEXT_PUBLIC_CAR_IMAGERY_API_KEY || ""
//   );

//   return `${url}`;
// };
// export const generateCarImageUrl = async (car: CarsProps) => {
//   const url = new URL("https://www.carimagery.com/api.asmx/GetImageUrl");
//   const { make, model, year } = car;

//   // إعداد معلمات البحث
//   const searchTerm = `${make} ${model} ${year}`; // تجميع العلامة والطراز والسنة

//   // إضافة معلمات إلى URL
//   url.searchParams.append("searchTerm", searchTerm);
//   url.searchParams.append(
//     "apiKey",
//     process.env.NEXT_PUBLIC_CAR_IMAGERY_API_KEY || ""
//   );

//   // إجراء الطلب والحصول على الاستجابة
//   const response = await fetch(url.toString());

//   if (!response.ok) {
//     throw new Error("Failed to fetch image URL");
//   }

//   const xmlResponse = await response.text();
//   const parser = new DOMParser();
//   const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
//   const imageUrl = xmlDoc.getElementsByTagName("string")[0].textContent;

//   return imageUrl; // إرجاع عنوان URL للصورة
// };
// تعديل الدالة السابقة لتكون أكثر مرونة
// export const generateCarImageUrl = async (
//   car: CarsProps,
//   imageIndex?: number
// ) => {
//   const url = new URL("https://www.carimagery.com/api.asmx/GetImageUrl");
//   const { make, model, year } = car;

//   // إعداد معلمات البحث
//   const searchTerm = `${make} ${model} ${year} ${imageIndex}`; // إضافة رقم الصورة إلى البحث

//   // إضافة معلمات إلى URL
//   url.searchParams.append("searchTerm", searchTerm);
//   url.searchParams.append(
//     "apiKey",
//     process.env.NEXT_PUBLIC_CAR_IMAGERY_API_KEY || ""
//   );

//   // إجراء الطلب والحصول على الاستجابة
//   const response = await fetch(url.toString());

//   if (!response.ok) {
//     throw new Error("Failed to fetch image URL");
//   }

//   const xmlResponse = await response.text();
//   const parser = new DOMParser();
//   const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
//   const imageUrl = xmlDoc.getElementsByTagName("string")[0].textContent;

//   return imageUrl; // إرجاع عنوان URL للصورة
// };

// // الآن يمكننا استخدام generateCarImageUrl في دالة جديدة لجلب عدة URLs
// export const generateCarImageUrls = async (car: CarsProps) => {
//   const imageUrls = [];

//   // هنا نستخدم حلقة لجلب أربعة URLs للصور
//   for (let i = 1; i <= 4; i++) {
//     const url = await generateCarImageUrl(car, i); // نمرر رقم الصورة
//     imageUrls.push(url); // نضيف URL إلى القائمة
//   }

//   return imageUrls; // إرجاع قائمة URLs
// };

export const generateCarImageUrl = async (
  car: CarsProps,
  imageIndex?: number
) => {
  const url = new URL("https://www.carimagery.com/api.asmx/GetImageUrl");
  const { make, model, year } = car;

  // إعداد معلمات البحث
  const searchTerm = `${make} ${model} ${year} ${imageIndex}`; // إضافة رقم الصورة إلى البحث

  // إضافة معلمات إلى URL
  url.searchParams.append("searchTerm", searchTerm);
  url.searchParams.append(
    "apiKey",
    process.env.NEXT_PUBLIC_CAR_IMAGERY_API_KEY || ""
  );

  // إجراء الطلب والحصول على الاستجابة
  const response = await fetch(url.toString());

  if (!response.ok) {
    console.error("Error fetching image URL:", response.statusText);
    throw new Error("Failed to fetch image URL");
  }

  const xmlResponse = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
  const imageUrl = xmlDoc.getElementsByTagName("string")[0]?.textContent;

  console.log(`Fetched image URL for index ${imageIndex}:`, imageUrl); // تتبع الصورة المسترجعة

  return imageUrl; // إرجاع عنوان URL للصورة
};

export const generateCarImageUrls = async (car: CarsProps) => {
  const imageUrls = [];

  // هنا نستخدم حلقة لجلب أربعة URLs للصور
  for (let i = 1; i <= 4; i++) {
    try {
      const url = await generateCarImageUrl(car, i); // نمرر رقم الصورة
      imageUrls.push(url); // نضيف URL إلى القائمة
    } catch (error) {
      console.error(`Failed to fetch image for index ${i}:`, error);
    }
  }

  console.log("All fetched image URLs:", imageUrls); // تتبع كل الصور المسترجعة
  return imageUrls; // إرجاع قائمة URLs
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
