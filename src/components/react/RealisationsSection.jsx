import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, EffectFade, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function RealisationsSection({ realisations }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Autoplay, EffectFade, Pagination, Keyboard, A11y],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        a11y: {
          prevSlideMessage: 'Image précédente',
          nextSlideMessage: 'Image suivante',
        },
      });
      return () => swiper.destroy(true, true);
    }
  }, []);

  return (
    <div className="realisations-slideshow">
      <div className="swiper" ref={swiperRef}>
        <div className="swiper-wrapper">
          {realisations.map((item) => (
            <div className="swiper-slide" key={item.id}>
              <div className="realisation-slide">
                <img
                  src={item.image}
                  alt={item.title}
                  className="realisation-slide-img"
                  loading="lazy"
                  width="800"
                  height="500"
                />
                <div className="realisation-slide-overlay">
                  <span className="realisation-slide-badge">{item.badge}</span>
                  <h3 className="realisation-slide-title">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
}