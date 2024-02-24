import Wrapper from '../pagechange/Wrapper';
import Sidenav from '../sidenav/Sidenav';
import style from './Monitoring.module.css';

function Monitoring() {
    return (
        <Wrapper>
            <div className={style.monitoring}>

                <div className={style.login_nav}>
                    <Sidenav />
                </div>


                <div className={style.monitoring_area}>


                </div>







            </div>





        </Wrapper>
    )
}

export default Monitoring;