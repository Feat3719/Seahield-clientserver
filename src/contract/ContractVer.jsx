import { Link } from 'react-router-dom';
import Wrapper from '../pagechange/Wrapper';
import Sidenav from '../sidenav/Sidenav';
import style from './ContractVer.module.css';
import { motion } from 'framer-motion'


function ContractVer() {
    return (
        <Wrapper>
            <div className={style.contractver}>
                <div className={style.login_nav}>
                    <Sidenav />
                </div>

                <motion.div
                    className={style.contractver_area}
                    initial={{ y: -250, opacity: 0 }} // 시작 위치와 투명도
                    animate={{ y: 0, opacity: 1 }} // 끝 위치와 투명도
                    transition={{ duration: 0.6, delay: 0.2 }} // 애니메이션 지속 시간과 지연 시간
                >

                    <h1 className={style.contractver_title}>
                        수거계약신청이 처음이신가요?
                    </h1>

                    <div className={style.select_area}>
                        <Link to="/companyinfo" className={style.select_area_link}>
                            <motion.div
                                className={style.select_area1}
                                whileHover={{ scale: 1.1 }} // hover 시에 scale을 1.1로 설정
                                transition={{ type: "hover", stiffness: 300 }} // spring 애니메이션 적용
                            >
                                <p className={style.select_1}>처음이시라면?</p>
                                <img src={`${process.env.PUBLIC_URL}/images/company_info.svg`} alt="user" className={style.info_img} />
                                <p className={style.select_2}>회사 정보 입력하기</p>
                            </motion.div>
                        </Link>

                        <Link to="/contract" className={style.select_area_link}>
                            <motion.div
                                className={style.select_area1}
                                whileHover={{ scale: 1.1 }} // hover 시에 scale을 1.1로 설정
                                transition={{ type: "hover", stiffness: 300 }} // spring 애니메이션 적용
                            >
                                <p className={style.select_1}>처음이 아니시라면?</p>
                                <img src={`${process.env.PUBLIC_URL}/images/contract_paper.svg`} alt="contract_paper" className={style.contract_img} />
                                <p className={style.select_2}>수거계약 신청서 작성하기</p>
                            </motion.div>
                        </Link>

                    </div>


                </motion.div>


            </div>
        </Wrapper>
    )
}

export default ContractVer;