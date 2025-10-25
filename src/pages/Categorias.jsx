import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

import { FreeMode } from "swiper/modules";

import "swiper/css/pagination";
import armario from "../assets/img/armario.jpg";

import MenuRodape from "../components/MenuRodape";
import pc from "../assets/img/pc.jpg";

import BotaoVoltar from "../components/BotaoVoltar";

export default function Categorias() {
  return (
    <div className="flex flex-col min-h-screen bg-[#03033D] text-white relative justify-center items-center">
      <div></div>
      <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md mb-2">
        <div className="flex justify-between items-center mb-4">
          <BotaoVoltar />
          <h1 className="text-2xl font-semibold text-white">Categorias</h1>
        </div>

        <div className="w-70 h-[2px] bg-blue-500 mb-4"></div>

        <div className="mb-2">
          <span className="text-white font-bold text-lg">Armários</span>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          <SwiperSlide>
             <Link to="/TipoObjetos" className="block w-full h-full">
            <div className="bg-blue-600 text-white rounded-2xl p-20 flex justify-center items-center mb-20">
              <img
                src={armario}
                alt="Recomendado"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            </Link>
          </SwiperSlide>
        </Swiper>
        <div className="mb-2 mt-6">
          <span className="text-white font-bold text-lg">Computadores</span>
        </div>
        <div className="mt-1">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            <SwiperSlide>
              <div className="bg-blue-600 text-white rounded-2xl p-20 flex justify-center items-center mb-20">
                <img
                  src={pc}
                  alt="Recomendado"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <MenuRodape></MenuRodape>
        </div>
      </div>
          
    </div>
  );
}
