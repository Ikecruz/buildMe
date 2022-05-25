import { Container } from "@mantine/core"
import Link from "next/link"

const Footer = () => {
    return <>
    
        <div className="footer">
            <Container size="lg">
                <div className="footer_contain">
                    <div className="logo_contain">
                        <Link href="/">
                            <a><p className="logo">buildMe</p></a>
                        </Link>
                    </div>
                    <div className="copyright_contain">
                        <p>&copy; buildMe {new Date().getFullYear()}, All rights reserved</p>
                    </div>
                </div>
            </Container>
        </div>
    
    </>
}

export default Footer