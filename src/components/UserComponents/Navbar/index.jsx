import "./index.scss";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import worldIcon from "/src/assets/icons/world.svg";
import uk from "/src/assets/flags/uk.png"
import ru from "/src/assets/flags/ru.png"
import az from "/src/assets/flags/az.png"

function Navbar() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const changeLang = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("i18nextLng", lng);
        setOpen(false);
    };

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <section id="navbar">
            <div className="container">
                <nav ref={dropdownRef}>
                    <div className="languageChanger" onClick={() => setOpen(!open)}>
                        <img src={worldIcon} alt="Icon" className="icon" />
                    </div>

                    <div className={`dropdown ${open ? "show" : ""}`}>
                        <div onClick={() => changeLang("en")}>
                            <img src={uk} alt={"Flag"} className={"flag"}/>
                            English</div>
                        <div onClick={() => changeLang("az")}>
                            <img src={az} alt={"Flag"} className={"flag"}/>
                            Azərbaycanca</div>
                        <div onClick={() => changeLang("ru")}>
                            <img src={ru} alt={"Flag"} className={"flag"}/>
                            Русский</div>
                    </div>
                </nav>
            </div>
        </section>
    );
}

export default Navbar;
