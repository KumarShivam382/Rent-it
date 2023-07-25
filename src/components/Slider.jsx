import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";
export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);

  function convertToIndianUnits(numberString) {
    // Convert the number string to a number
    const number = parseFloat(numberString);

    // Check if the number is valid
    if (isNaN(number)) {
      return "Invalid number";
    }

    // Convert the number to Indian units
    const lakh = 100000;
    const crore = 10000000;

    if (number < lakh) {
      return number.toLocaleString("en-IN");
    } else if (number < crore) {
      const formattedNumber = (number / lakh).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      });
      return `${formattedNumber} Lakh`;
    } else {
      const formattedNumber = (number / crore).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      });
      return `${formattedNumber} Crore`;
    }
  }

  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url("${data.imgUrls[0]}") center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[450px] overflow-hidden"
              ></div>
              <p className="text-white absolute left-1 top-3 font-medium max-w-[90%] bg-[#6528F7] shadow-lg opacity-90 p-2 rounded-br-3xl">
                {data.name}
              </p>
              <p className="text-white absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#6528F7] shadow-lg opacity-90 p-2 rounded-tr-3xl">
                ₹
                {data.discountedPrice
                  ? convertToIndianUnits(data.discountedPrice)
                  : convertToIndianUnits(data.regularPrice)}
                {data.type === "rent" && " / month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
