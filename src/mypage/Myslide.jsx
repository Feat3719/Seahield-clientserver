import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./MypageRegular.module.css";

// import { baseUrl } from "./config";

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            // style={{ ...style, display: "block", background:'red' }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, onClick } = props;
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
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const [likeposts, setLikePosts] = useState([]);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [userNickname, setUserNickname] = useState("");

    // 정보 불러오는 부분________________________________
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/user/info", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                setUserNickname(response.data.userNickname);
            } else {
                alert("다시 시도해 주세요");
                window.location.href = "/";
            }
        };
        fetchData();
    }, [accessToken]);

    // 좋아요한 게시글 데이터를 불러오는 useEffect
    useEffect(() => {
        const fetchLikePosts = async () => {
            try {
                const response = await axios.get("/api/user/articles-like", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setLikePosts(response.data); // 받아온 데이터를 posts 상태에 저장
                }
            } catch (error) {
                // console.error("게시글을 불러오는 데 실패했습니다.", error);
            }
        };

        if (userNickname) {
            // 사용자 닉네임이 설정되어 있을 때만 게시글 데이터를 불러옴
            fetchLikePosts();
        }
    }, [userNickname, accessToken]);

    return (
        <div className={style.slide}>
            <Slider {...settings}>
                {likeposts.length > 0 ? (
                    likeposts.map((lpost) => (
                        <div key={lpost.articleId} className={style.slideBoard}>
                            <h2>{lpost.articleTitle}</h2> {/* 게시글 제목 */}
                            <p>{lpost.articleCtgr}</p> {/* 게시글 내용 */}
                            {/* 여기에 더 많은 게시글 정보를 추가할 수 있습니다. */}
                        </div>
                    ))
                ) : (
                    <div>좋아요한 게시글이 없습니다.</div>
                )}
                {/* <div className={style.slideBoard}>
            <img src={process.env.PUBLIC_URL + '/images/img2.jpg'} alt="img2.jpg" style={{ width: '22vw', height: '35vh' }} 
            />
            </div>
            <div className={style.slideBoard}>
            <img src={process.env.PUBLIC_URL + '/images/img3.jpg'} alt="img3.jpg" style={{ width: '22vw', height: '35vh' }}
            />
            </div>
            <div className={style.slideBoard}>
            <img src={process.env.PUBLIC_URL + '/images/img2.jpg'} alt="img2.jpg" style={{ width: '22vw', height: '35vh' }}
            />
            </div> */}
            </Slider>
        </div>
    );
};

export default Myslide;
