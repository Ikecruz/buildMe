import { Container } from "@mantine/core"
import Link from "next/link"

const Navbar = () => {
    return <>
    
        <div className="nav_bar">
            <Container size="lg">
                <nav>
                    <div className="logo_contain">
                        <Link href="/">
                            <a><p className="logo">buildMe</p></a>
                        </Link>
                    </div>
                    <div className="socials_contain">
                        <a href="https://twitter.com/ikxcrxz" className="social_icon">
                            TW
                        </a>
                        <a href="https://github.com/Ikecruz" className="social_icon">
                            GH
                        </a>
                        <a href="https://www.linkedin.com/in/onyeka-ikedinobi-98538b204/" className="social_icon">
                            IN
                        </a>
                    </div>
                </nav>
            </Container>
        </div>
    
    </>
}

export default Navbar