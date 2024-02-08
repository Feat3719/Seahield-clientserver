import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './MypageRegular.module.css';

// import { baseUrl } from "./config";

function SampleNextArrow(props) {
    const { className ,onClick } = props;
    return (
      <div
        className={className}
        // style={{ ...style, display: "block", background:'red' }}
        onClick={onClick}
      />
    );
  }


const Myslide = () => {
    const settings = {
        dots: true,
        centerMode: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        centerPadding: "0vw",
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
        autoplay: false, // 자동 전환 활성화
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />
    };

    return (
        <div className={style.slide} >
            <Slider {...settings}>
            <div>
            <img src={process.env.PUBLIC_URL + '/images/img2.jpg'} alt="img2.jpg" style={{ width: '25vw', height: '35vh' }}
            />
            {/* <h3>슬라이드 1</h3> */}
                {/* <table  style={{backgroundColor: 'lightgrey',borderCollapse: 'collapse'}} >
                    <thead>
                        <tr>
                            <th>좋아요한 게시물 제목</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: 'none', padding: '5vh 5vw 5vh 5vw' }}>좋아요한 게시물 내용</td>
                        </tr>
                        <tr>
                            <td>...</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
            <div>
            <img src={process.env.PUBLIC_URL + '/images/img2.jpg'} alt="img2.jpg" style={{ width: '25vw', height: '35vh' }} 
            />
            </div>
            <div>
            <img src={process.env.PUBLIC_URL + '/images/img3.jpg'} alt="img3.jpg" style={{ width: '25vw', height: '35vh' }}
            />
            </div>
            <div>
            <img src={process.env.PUBLIC_URL + '/images/img2.jpg'} alt="img2.jpg" style={{ width: '25vw', height: '35vh' }}
            />
            </div>
            </Slider>
        </div>
    );
    };

export default Myslide;