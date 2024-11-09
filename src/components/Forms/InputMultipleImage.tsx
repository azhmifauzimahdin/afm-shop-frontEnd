import { FC, useEffect, useState } from "react";
import { FaPlus, FaXmark } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { useOutsideClick } from "../useOutsideClick";
import ProgressiveImg from "../Image/ProgressiveImg";
import { Navigation, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface InputProps {
  label?: string;
  id: string;
  value: any;
  name: string;
  src: any;
  disabled?: boolean;
  loadingRender?: boolean;
  onChange?: any;
  errorMessage?: any;
  editImages?: any;
  onDelete?: any;
}

const InputMultipleImage: FC<InputProps> = (props) => {
  const {
    label,
    id,
    name,
    value,
    src,
    disabled,
    loadingRender,
    onChange,
    errorMessage,
    editImages,
    onDelete,
  } = props;
  const [previews, setPreview] = useState<any[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [indexPreview, setIndexPreview] = useState<number>(0);
  const ref = useOutsideClick(() => setModal(false));

  useEffect(() => {
    if (previews && previews !== src) {
      setPreview([...previews, ...src]);
    }
  }, [src]);

  useEffect(() => {
    if (indexPreview > 0) setIndexPreview(indexPreview - 1);
    else setIndexPreview(0);
    value(previews);
  }, [previews]);

  useEffect(() => {
    slideTo(indexPreview);
  }, [indexPreview]);

  const [swiper, setSwiper] = useState<any>(null);

  const slideTo = (index: number) =>
    swiper ? swiper.slideTo(index, 500) : null;

  return (
    <>
      {modal ? (
        <div className="bg-slate-950/50 fixed flex justify-center items-center w-screen left-0 h-screen top-0 bottom-0 z-40  ">
          <div
            ref={ref}
            className="bg-white w-[90vw] md:w-[75vw] h-[90vh] rounded-xl relative shadow"
          >
            <div className="absolute top-0 left-0 w-full pt-3 pb-2">
              <div className="relative">
                <div className="w-full text-center px-6">
                  <div className="truncate">
                    {editImages && indexPreview < editImages.length
                      ? editImages[indexPreview]?.name
                      : previews[
                          indexPreview - (editImages ? editImages.length : 0)
                        ]?.name}
                  </div>
                  <div className="text-slate-500">
                    {editImages &&
                    indexPreview < (editImages ? editImages.length : 0) ? (
                      <div className="text-slate-500">
                        {Number(
                          editImages[indexPreview]?.size / 1000000
                        ).toFixed(3)}
                        MB
                      </div>
                    ) : (
                      <div className="text-slate-500">
                        {Number(
                          previews[
                            indexPreview - (editImages ? editImages.length : 0)
                          ]?.size / 1000000
                        ).toFixed(3)}{" "}
                        MB
                      </div>
                    )}
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
                  initialSlide={indexPreview}
                  onSwiper={setSwiper}
                  className="p-1"
                  onSlideChange={(index) => setIndexPreview(index.activeIndex)}
                  speed={1000}
                  navigation={false}
                  breakpoints={{
                    1280: {
                      navigation: {
                        enabled: true,
                      },
                    },
                  }}
                >
                  {editImages
                    ? editImages.map((preview: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div
                            onClick={() => setIndexPreview(index)}
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
                      ))
                    : null}
                  {previews
                    ? previews.map((preview: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div
                            onClick={() =>
                              setIndexPreview(
                                index + (editImages ? editImages.length : 0)
                              )
                            }
                            className="w-[95%] md:w-60 aspect-square overflow-hidden shadow rounded-lg cursor-pointer relative"
                          >
                            <ProgressiveImg
                              src={preview ? URL.createObjectURL(preview) : ""}
                              id="image_preview"
                              alt="Image"
                              className="w-full"
                            />
                          </div>
                        </SwiperSlide>
                      ))
                    : null}
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
                    {editImages
                      ? editImages.map((preview: any, index: number) => (
                          <SwiperSlide key={index}>
                            <div
                              onClick={() => setIndexPreview(index)}
                              className="h-14 w-14 overflow-hidden shadow rounded-lg cursor-pointer relative"
                            >
                              <ProgressiveImg
                                src={preview ? preview.image_url : ""}
                                id="image_preview"
                                alt="Image"
                                className="w-full"
                              />
                              <IoMdCloseCircle
                                onClick={() => onDelete(preview.id)}
                                className={`${
                                  index === 0 ? "text-2xl" : "text-lg"
                                } transition-all text-slate-400/50 cursor-pointer hover:text-slate-500 absolute top-0 right-0 z-40`}
                              />
                              <div
                                className={`${
                                  index === indexPreview
                                    ? "bg-slate-950/50"
                                    : ""
                                } absolute hover:bg-slate-950/60 top-0 bottom-0 w-full transition-all z-30`}
                              ></div>
                            </div>
                          </SwiperSlide>
                        ))
                      : null}
                    {previews
                      ? previews.map((preview: any, index: number) => (
                          <SwiperSlide key={index}>
                            <div
                              onClick={() =>
                                setIndexPreview(
                                  index + (editImages ? editImages.length : 0)
                                )
                              }
                              className="h-14 w-14 overflow-hidden shadow rounded-lg cursor-pointer relative"
                            >
                              <ProgressiveImg
                                src={
                                  preview ? URL.createObjectURL(preview) : ""
                                }
                                id="image_preview"
                                alt="Image"
                                className="w-full"
                              />
                              <IoMdCloseCircle
                                onClick={() => {
                                  if (previews.length === 1) {
                                    setModal(false);
                                  }
                                  const newData = [
                                    ...previews.slice(0, index),
                                    ...previews.slice(index + 1),
                                  ];
                                  setPreview(newData);
                                }}
                                className={`transition-all text-slate-400/50 cursor-pointer hover:text-slate-500 absolute top-0 right-0 z-40`}
                              />
                              <div
                                className={`${
                                  index ===
                                  indexPreview -
                                    (editImages ? editImages.length : 0)
                                    ? "bg-slate-950/50"
                                    : ""
                                } absolute hover:bg-slate-950/60 top-0 bottom-0 w-full transition-all z-30`}
                              ></div>
                            </div>
                          </SwiperSlide>
                        ))
                      : null}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {loadingRender ? (
        <div>
          <Skeleton height={20} width={100} className="mb-2" />
          <Skeleton height={90} width={90} />
        </div>
      ) : (
        <div>
          {label ? (
            <label htmlFor={id} className="block mb-2 font-medium">
              {label}
            </label>
          ) : null}
          <div className="grid grid-cols-3 gap-3" key={1}>
            {editImages
              ? editImages.map((preview: any, index: number) => (
                  <div
                    key={index}
                    className={`${index === 0 ? "col-span-2 row-span-2" : ""} ${
                      index > 4 ? "hidden" : ""
                    } aspect-square overflow-hidden shadow rounded-lg relative cursor-pointer`}
                  >
                    {index < 5 ? (
                      <>
                        {editImages.length > 5 && index === 4 ? (
                          <>
                            <ProgressiveImg
                              src={preview ? preview.image_url : ""}
                              id="image_preview"
                              alt="User Image"
                              className="w-full"
                            />
                            <IoMdCloseCircle
                              onClick={() => onDelete(preview.id)}
                              className={`transition-all text-slate-400/50 cursor-pointer hover:text-slate-500 absolute top-0 right-0 z-30`}
                            />
                            <div
                              onClick={() => {
                                setIndexPreview(index);
                                setModal(true);
                              }}
                              className={`absolute bg-slate-950/60 top-0 bottom-0 w-full hover:bg-slate-950/70 ${
                                disabled ? "bg-slate-300/60" : ""
                              }`}
                            >
                              <span className="flex justify-center items-center h-full text-2xl font-medium text-white">
                                {editImages.length + previews.length - 5}+
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <ProgressiveImg
                              src={preview ? preview.image_url : ""}
                              id="image_preview"
                              alt="User Image"
                              className="w-full"
                            />
                            <IoMdCloseCircle
                              onClick={() => onDelete(preview.id)}
                              className={`${
                                index === 0 ? "text-2xl" : "text-lg"
                              } transition-all text-slate-400/50 cursor-pointer hover:text-slate-500 absolute top-0 right-0 z-30`}
                            />
                            <div
                              onClick={() => {
                                setIndexPreview(index);
                                setModal(true);
                              }}
                              className={`absolute ${
                                disabled ? "bg-slate-300/60" : ""
                              } hover:bg-slate-950/60 top-0 bottom-0 w-full transition-all`}
                            ></div>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    <></>
                  </div>
                ))
              : null}
            {previews
              ? previews.map((preview: any, index: number) => (
                  <div
                    key={index}
                    className={`${
                      index === 0 &&
                      (editImages ? editImages.length === 0 : true)
                        ? "col-span-2 row-span-2"
                        : ""
                    } ${
                      index + (editImages ? editImages.length : 0) > 4
                        ? "hidden"
                        : ""
                    } aspect-square overflow-hidden shadow rounded-lg relative cursor-pointer`}
                  >
                    {index + (editImages ? editImages.length : 0) < 5 ? (
                      <>
                        {previews.length +
                          (editImages ? editImages.length : 0) >
                          5 &&
                        index + (editImages ? editImages.length : 0) === 4 ? (
                          <>
                            <ProgressiveImg
                              src={preview ? URL.createObjectURL(preview) : ""}
                              id="image_preview"
                              alt="Image"
                              className="w-full"
                            />
                            <div
                              onClick={() => {
                                setIndexPreview(
                                  index + (editImages ? editImages.length : 0)
                                );
                                setModal(true);
                              }}
                              className={`absolute bg-slate-950/60 top-0 bottom-0 w-full hover:bg-slate-950/70 ${
                                disabled ? "bg-slate-300/60" : ""
                              }`}
                            >
                              <span className="flex justify-center items-center h-full text-2xl font-medium text-white">
                                {previews.length +
                                  (editImages ? editImages.length : 0) -
                                  5}
                                +
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <ProgressiveImg
                              src={preview ? URL.createObjectURL(preview) : ""}
                              id="image_preview"
                              alt="User Image"
                              className="w-full"
                            />
                            <IoMdCloseCircle
                              onClick={() => {
                                const newData = [
                                  ...previews.slice(0, index),
                                  ...previews.slice(index + 1),
                                ];
                                setPreview(newData);
                              }}
                              className={`${
                                index === 0 && !editImages
                                  ? "text-2xl"
                                  : "text-lg"
                              } transition-all text-slate-400/50 cursor-pointer hover:text-slate-500 absolute top-0 right-0 z-30`}
                            />
                            <div
                              onClick={() => {
                                setIndexPreview(
                                  index + (editImages ? editImages.length : 0)
                                );
                                setModal(true);
                              }}
                              className={`absolute ${
                                disabled ? "bg-slate-300/60" : ""
                              } hover:bg-slate-950/60 top-0 bottom-0 w-full transition-all`}
                            ></div>
                          </>
                        )}
                      </>
                    ) : null}
                  </div>
                ))
              : null}
            <label htmlFor={id} className="aspect-square">
              <div
                className={`w-full h-full border ${
                  errorMessage ? "border-orange" : "border-gray-300"
                }  rounded-lg flex justify-center items-center ${
                  disabled
                    ? "bg-slate-100"
                    : "bg-gray-50 cursor-pointer hover:bg-slate-100"
                }`}
              >
                <FaPlus
                  className={`${
                    errorMessage ? "text-orange" : "text-gray-600"
                  }`}
                />
              </div>
              <input
                className="hidden"
                type="file"
                id={id}
                name={name}
                onChange={onChange}
                accept="image/*"
                // disabled={disabled}
                multiple
              />
            </label>
          </div>
          {errorMessage && (
            <div className="text-red-600 text-xs ml-3 mt-2">{errorMessage}</div>
          )}
        </div>
      )}
    </>
  );
};

export default InputMultipleImage;
