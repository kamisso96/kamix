import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, EffectFade, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function TestimonialCarousel({ testimonials }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && testimonials.length > 0) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Autoplay, EffectFade, Pagination, Keyboard, A11y],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        keyboard: { enabled: true, onlyInViewport: true },
        a11y: { prevSlideMessage: 'Témoignage précédent', nextSlideMessage: 'Témoignage suivant' },
      });
      return () => swiper.destroy(true, true);
    }
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="testimonials-empty">
        <p>Aucun témoignage pour le moment. Soyez le premier à partager votre expérience !</p>
      </div>
    );
  }

  return (
    <div className="testimonials-slideshow">
      <div className="swiper" ref={swiperRef}>
        <div className="swiper-wrapper">
          {testimonials.map((t) => (
            <div className="swiper-slide" key={t.id}>
              <div className="testimonial-slide">
                <div className="testimonial-slide-overlay">
                  <div className="testimonial-quote-mark">"</div>
                  <p className="testimonial-slide-quote">{t.quote}</p>
                  <div className="testimonial-slide-footer">
                    <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                    <div className="testimonial-slide-info">
                      <cite className="testimonial-slide-name">{t.name}</cite>
                      <span className="testimonial-slide-role">{t.role}</span>
                    </div>
                  </div>
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