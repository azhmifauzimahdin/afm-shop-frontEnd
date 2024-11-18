import { FC, useEffect, useState } from "react";
import ProgressiveImg from "./ProgressiveImg";
import { Image } from "../../types/product";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { FaXmark } from "react-icons/fa6";
import { useOutsideClick } from "../useOutsideClick";
import Skeleton from "react-loading-skeleton";
import { DefaultProduct } from "../../assets";

interface InputProps {
  data: Image[];
}

const PreviewImageProduct: FC<InputProps> = (props) => {
  const { data } = props;
  const [modal, setModal] = useState<boolean>(false);
  const ref = useOutsideClick(() => setModal(false));
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
                  <div className="truncate">{data[currentIndex]?.title}</div>
                  <div className="text-slate-500">
                    {Number(data[currentIndex]?.size / 1000000).toFixed(3)}
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
                  {data.map((preview: any, index: number) => (
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
                    {data.map((preview: any, index: number) => (
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
      <div>
        <div>
          {data ? (
            <div
              onClick={() => {
                if (data.length > 0) setModal(true);
              }}
              className={`rounded-lg aspect-square overflow-hidden shadow relative ${
                data.length > 0 ? "imagehover cursor-pointer" : ""
              }`}
            >
              <ProgressiveImg
                src={
                  data.length > 0
                    ? data[currentIndex].image_url
                    : DefaultProduct
                }
                className="w-full"
              />
            </div>
          ) : (
            <Skeleton className="w-full aspect-square" />
          )}
        </div>
        <div className="mt-3">
          {data ? (
            <Swiper
              key={1}
              modules={[Navigation, A11y]}
              spaceBetween={10}
              slidesPerView={4}
              navigation
              className="py-1"
            >
              {data.map((data, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="rounded-lg aspect-square overflow-hidden shadow cursor-pointer relative imagehover"
                >
                  <ProgressiveImg src={data.image_url} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              <Skeleton className="aspect-square" />
              <Skeleton className="aspect-square" />
              <Skeleton className="aspect-square" />
              <Skeleton className="aspect-square" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PreviewImageProduct;
