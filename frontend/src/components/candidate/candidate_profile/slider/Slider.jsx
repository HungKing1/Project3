import React, { useRef } from 'react';
import { Carousel } from 'antd';
import s from './Slider.module.scss';

const Slider = ({ setLink, link }) => {
  const carouselRef = useRef(null);

  const slides = [
    { id: 1, text: 'Thông tin liên hệ', img: '/images/ung-vien/ho-so-xin-viec/image_1.png' },
    { id: 2, text: 'Công việc mong muốn', img: '/images/ung-vien/ho-so-xin-viec/image_2.png' },
    { id: 3, text: 'Mục tiêu nghề nghiệp', img: '/images/ung-vien/ho-so-xin-viec/image_3.png' },
    { id: 4, text: 'Kỹ năng bản thân', img: '/images/ung-vien/ho-so-xin-viec/image_4.png' },
    { id: 5, text: 'Bằng cấp', img: '/images/ung-vien/ho-so-xin-viec/image_5.png' },
    { id: 6, text: 'Ngôn ngữ', img: '/images/ung-vien/ho-so-xin-viec/image_6.png' },
    { id: 7, text: 'Kinh nghiệm làm việc', img: '/images/ung-vien/ho-so-xin-viec/image_7.png' },
    // { id: 8, text: 'Người tham chiếu', img: '/images/ung-vien/ho-so-xin-viec/image_8.png' },
  ];

  return (
    <>
      <div className={s.container}>
        <div className={s.body}>
          <div className={s.carousel}>
            <div className={s.btn1} onClick={() => carouselRef.current.prev()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none" className={s.svgbtn}>
                <path fillRule="evenodd" clipRule="evenodd" d="M44.269 16.2327C44.7377 16.7015 45.001 17.3373 45.001 18.0002C45.001 18.6631 44.7377 19.2989 44.269 19.7677L33.5365 30.5002L44.269 41.2327C44.5078 41.4633 44.6982 41.7392 44.8293 42.0442C44.9603 42.3492 45.0292 42.6772 45.0321 43.0092C45.035 43.3411 44.9718 43.6703 44.8461 43.9776C44.7204 44.2848 44.5347 44.564 44.3 44.7987C44.0653 45.0334 43.7861 45.2191 43.4789 45.3448C43.1716 45.4705 42.8424 45.5337 42.5105 45.5308C42.1786 45.5279 41.8505 45.459 41.5455 45.3279C41.2405 45.1969 40.9646 45.0065 40.734 44.7677L28.234 32.2677C27.7653 31.7989 27.502 31.1631 27.502 30.5002C27.502 29.8373 27.7653 29.2015 28.234 28.7327L40.734 16.2327C41.2028 15.764 41.8386 15.5007 42.5015 15.5007C43.1644 15.5007 43.8002 15.764 44.269 16.2327ZM29.269 16.2327C29.7377 16.7015 30.001 17.3373 30.001 18.0002C30.001 18.6631 29.7377 19.2989 29.269 19.7677L18.5365 30.5002L29.269 41.2327C29.7244 41.7042 29.9764 42.3357 29.9707 42.9912C29.965 43.6467 29.7021 44.2737 29.2386 44.7372C28.775 45.2008 28.148 45.4637 27.4925 45.4694C26.837 45.4751 26.2055 45.2231 25.734 44.7677L13.234 32.2677C12.7653 31.7989 12.502 31.1631 12.502 30.5002C12.502 29.8373 12.7653 29.2015 13.234 28.7327L25.734 16.2327C26.2028 15.764 26.8386 15.5007 27.5015 15.5007C28.1644 15.5007 28.8002 15.764 29.269 16.2327Z" fill="#F39623" />
              </svg>
            </div>
            <Carousel ref={carouselRef} dots={false} autoplay={false} infinite={true} slidesToShow={5} slidesToScroll={2} className={`${s.sliderCarousel} carousel_ung_vien`}>
              {slides.map((slide) => (
                <div className={s.slider} key={slide.id} onClick={() => setLink && setLink(slide.id)}>
                  <div className={s.sliderCarousel_item} style={{
                    backgroundColor: link === slide.id ? '#d8f1ff' : '',
                  }}>
                    <div className={s.sliderCarousel_item_image}>
                      <img
                        alt=''
                        src={slide.img}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                  <span>{slide.text}</span>
                </div>
              ))}
            </Carousel>
            <div className={s.btn1} onClick={() => carouselRef.current.next()} >
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none" className={s.svgbtn}>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.732 44.7673C15.2633 44.2985 15 43.6627 15 42.9998C15 42.3369 15.2633 41.7011 15.732 41.2323L26.4645 30.4998L15.732 19.7673C15.4932 19.5367 15.3027 19.2608 15.1717 18.9558C15.0407 18.6508 14.9717 18.3228 14.9688 17.9908C14.966 17.6589 15.0292 17.3297 15.1549 17.0224C15.2806 16.7152 15.4662 16.436 15.701 16.2013C15.9357 15.9666 16.2148 15.7809 16.5221 15.6552C16.8293 15.5295 17.1585 15.4663 17.4905 15.4692C17.8224 15.4721 18.1505 15.541 18.4555 15.6721C18.7605 15.8031 19.0364 15.9935 19.267 16.2323L31.767 28.7323C32.2356 29.2011 32.4989 29.8369 32.4989 30.4998C32.4989 31.1627 32.2356 31.7985 31.767 32.2673L19.267 44.7673C18.7982 45.236 18.1624 45.4993 17.4995 45.4993C16.8366 45.4993 16.2008 45.236 15.732 44.7673ZM30.732 44.7673C30.2633 44.2985 30 43.6627 30 42.9998C30 42.3369 30.2633 41.7011 30.732 41.2323L41.4645 30.4998L30.732 19.7673C30.2766 19.2958 30.0246 18.6643 30.0303 18.0088C30.036 17.3533 30.2989 16.7263 30.7624 16.2628C31.2259 15.7992 31.853 15.5363 32.5085 15.5306C33.164 15.5249 33.7955 15.7769 34.267 16.2323L46.767 28.7323C47.2356 29.2011 47.4989 29.8369 47.4989 30.4998C47.4989 31.1627 47.2356 31.7985 46.767 32.2673L34.267 44.7673C33.7982 45.236 33.1624 45.4993 32.4995 45.4993C31.8366 45.4993 31.2008 45.236 30.732 44.7673Z" fill="#F39623" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Slider;