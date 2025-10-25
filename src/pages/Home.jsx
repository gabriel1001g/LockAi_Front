import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import { FreeMode } from "swiper/modules";

import "swiper/css/pagination";
import armario from "../assets/img/armario.jpg";
import armario2 from "../assets/img/armario2.jpg";

import pc from "../assets/img/pc.jpg";
import notbook from "../assets/img/notbook.jpg";
import MenuRodape from "../components/MenuRodape";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#03033D] text-white relative justify-center items-center">
      
      <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md mb-2">
        <h1 className="text-2xl font-semibold text-white mb-4">Bem Vindo!</h1>
        <h3 className="text-1 font-semibold text-white">
          Recomendamos para você
        </h3>
        <h3 className="text-1 font-semibold text-white mb-4">Novas locações</h3>
        <div className="w-70 h-[2px] bg-blue-500 mb-4"></div>

        <div className="mb-2">
          <Link
            to="/TipoObjetos"
            className="text-white font-bold text-lg hover:text-blue-400 transition-colors"
          >
            Armários
          </Link>
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
          <SwiperSlide>
            <Link to="/TipoObjetos" className="block w-full h-full">
              <div className="bg-blue-600 text-white rounded-2xl p-20 flex justify-center items-center mb-20">
                <img
                  src={armario2}
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
                  src={notbook}
                  alt="Recomendado"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
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
