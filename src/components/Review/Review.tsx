import { FC, useEffect, useState } from "react";
import ProgressiveImg from "../Image/ProgressiveImg";
import { Review as TypeReview } from "../../types/product";
import Rating from "../Rating/Rating";
import { useOutsideClick } from "../useOutsideClick";
import { FaXmark } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { A11y, Navigation } from "swiper/modules";

interface InputProps {
  data: TypeReview;
}

const Review: FC<InputProps> = (props) => {
  const { data } = props;
  const [modal, setModal] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const ref = useOutsideClick(() => setModal(false));

  useEffect(() => {
    slideTo(currentIndex);
  }, [currentIndex]);

  const [swiper, setSwiper] = useState<any>(null);

  const slideTo = (index: number) =>
    swiper ? swiper.slideTo(index, 500) : null;

  return (
    <>
      {modal ? (
        <div className="bg-slate-950/50 fixed flex justify-center items-center w-screen left-0 h-screen top-0 bottom-0 z-50  ">
          <div
            ref={ref}
            className="bg-white w-[90vw] md:w-[75vw] h-[90vh] rounded-xl relative shadow"
          >
            <div className="absolute top-0 left-0 w-full pt-3 pb-2">
              <div className="relative">
                <div className="w-full text-center px-6">
                  <div className="truncate">
                    {data.images[currentIndex]?.title}
                  </div>
                  <div className="text-slate-500">
                    {Number(data.images[currentIndex]?.size / 1000000).toFixed(
                      3
                    )}
                    MB
                  </div>
                </div>
                <FaXmark
                  onClick={() => setModal(false)}
                  className="text-xl cursor-pointer absolute top-1/3 md:top-1/4 right-2 md:right-5 z-40"
                />
              </div>
            </div>
            <div className="flex justify-center h-full flex-col gap-5 items-center relative">
              <div className="w-full flex justify-center">
                <Swiper
                  modules={[Navigation, A11y]}
                  slidesPerView={1}
                  centeredSlides={true}
                  initialSlide={currentIndex}
                  onSwiper={setSwiper}
                  className="p-1"
                  onSlideChange={(index) => setCurrentIndex(index.activeIndex)}
                  speed={1000}
                  navigation={true}
                  breakpoints={{
                    320: {
                      navigation: {
                        enabled: false,
                      },
                    },
                    768: {
                      navigation: {
                        enabled: true,
                      },
                    },
                  }}
                >
                  {data.images.map((preview: any, index: number) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() => setCurrentIndex(index)}
                        className="w-[95%] md:w-52 aspect-square overflow-hidden shadow rounded-lg cursor-pointer relative"
                      >
                        <ProgressiveImg
                          src={preview ? preview.image_url : ""}
                          id="image_preview"
                          alt="Image"
                          className="w-full"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="absolute bottom-3 left-0 flex justify-center w-full p-2">
                <div className="w-full md:w-3/5">
                  <Swiper
                    modules={[Navigation, A11y]}
                    slidesPerView={4}
                    className="bg-slate-100 p-3 rounded-lg"
                    navigation
                    breakpoints={{
                      768: {
                        slidesPerView: 5,
                      },
                      1024: {
                        slidesPerView: 8,
                      },
                    }}
                  >
                    {data.images.map((preview: any, index: number) => (
                      <SwiperSlide key={index}>
                        <div
                          onClick={() => setCurrentIndex(index)}
                          className="h-14 w-14 overflow-hidden shadow rounded-lg cursor-pointer relative"
                        >
                          <ProgressiveImg
                            src={preview ? preview.image_url : ""}
                            id="image_preview"
                            alt="Image"
                            className="w-full"
                          />
                          <div
                            className={`${
                              index === currentIndex ? "bg-slate-950/50" : ""
                            } absolute hover:bg-slate-950/60 top-0 bottom-0 w-full transition-all z-30`}
                          ></div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 aspect-square rounded-full overflow-hidden">
              <ProgressiveImg src={data.user.image_url} />
            </div>
            <span className="font-medium">{data.user.name}</span>
          </div>
          <div className="text-slate-500">{data.date}</div>
        </div>
        <Rating rate={data.rating} />
        <div>{data.review}</div>
        <div className="flex gap-2 mt-3">
          {data.images.length > 0
            ? data.images.map((data, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setModal(true);
                  }}
                  className="h-14 w-14 rounded overflow-hidden shadow relative cursor-pointer imagehover"
                >
                  <ProgressiveImg src={data.image_url} />
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Review;
