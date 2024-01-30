import style from './Homepage.module.css'
import Sidenav from './sidenav/Sidenav';

function Homepage() {
    return (
        <div className={style.homepage}>

            <div className={style.homepage_nav}>
                <Sidenav />
            </div>


        </div>
    )
}

export default Homepage;