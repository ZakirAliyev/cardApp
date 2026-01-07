import "./index.scss";
import { useTranslation } from "react-i18next";

import bannerPlaceholder from "/src/assets/images/bannerPlaceholder.png";
import profilePlaceholder from "/src/assets/images/profilePlaceholder.png";

function Hero({ user }) {
    const { t } = useTranslation();

    const heroSrc =
        user?.background?.startsWith("data:")
            ? user.background
            : user?.background
                ? `data:image/png;base64,${user.background}`
                : bannerPlaceholder;

    const avatarSrc =
        user?.avatar?.startsWith("data:")
            ? user.avatar
            : user?.avatar
                ? `data:image/png;base64,${user.avatar}`
                : profilePlaceholder;

    return (
        <div className="heroWrapper">
            <section id="hero">
                <img src={heroSrc} alt="Hero" className="heroImage" />
            </section>

            <div className="container profileContainer">
                <img
                    src={avatarSrc}
                    alt={t("profileAlt")}
                    className="profileImage"
                />
            </div>
        </div>
    );
}

export default Hero;
