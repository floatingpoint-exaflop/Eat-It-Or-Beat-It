import { Container } from 'react-bootstrap';



export default function Footer(){



    return (
        <>
            <Container className="flex align-items-center" id="footer">

                <a href="https://www.fatsecret.com">
                    <img src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.png" srcSet="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_2x.png 2x, https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_3x.png 3x" className="footer-img" border="0"/>
                </a>
                {/* <a href="https://www.fatsecret.com">Powered by FatSecret</a> */}
            </Container >
        </>
    )
}