import "./index.scss";
import { useTranslation } from "react-i18next";

import instagram from "/src/assets/icons/instagram.svg";
import whatsapp from "/src/assets/icons/whatsapp.svg";
import facebook from "/src/assets/icons/facebook.svg";
import linkedin from "/src/assets/icons/linkedin.svg";
import letter from "/src/assets/icons/letter.svg";
import phone from "/src/assets/icons/phone.svg";

const defaultProfile = "data:image/png;base64,....";

function Info({ user }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const displayName =
        lang === "az" ? user?.name_az ?? user?.name :
            lang === "ru" ? user?.name_ru ?? user?.name :
                user?.name;

    const displayDescription =
        lang === "az" ? user?.description_az ?? user?.description :
            lang === "ru" ? user?.description_ru ?? user?.description :
                user?.description;

    // AVATAR
    const avatarSrc =
        user?.avatar?.startsWith("data:")
            ? user.avatar.trim()
            : user?.avatar
                ? `data:image/png;base64,${user.avatar.trim()}`
                : defaultProfile;

    // PHONE CLEAN
    const cleanPhone = user?.mobile_phone
        ?.replace(/[^\d]/g, "")
        ?.replace(/^994/, "")
        ?.replace(/^0/, "");

    // WHATSAPP
    const whatsappUrl =
        user?.whatsapp_link
            ? user.whatsapp_link
            : cleanPhone
                ? `https://wa.me/994${cleanPhone}`
                : null;

    // TEL LINK
    const telUrl = cleanPhone ? `tel:+994${cleanPhone}` : null;

    // MAILTO
    const mailUrl = user?.email ? `mailto:${user.email}` : null;

    return (
        <section id="info">
            <div className="container">

                <div className="mobileWrapper">
                    <img
                        src={avatarSrc}
                        className="profileImage1"
                        alt="Profile"
                    />

                    <div style={{ width: "100%" }}>
                        <div className="nameWrapper">
                            <div className="name">{displayName}</div>

                            <div className="links">
                                {user?.instagram_link && (
                                    <a href={user.instagram_link} target="_blank" rel="noopener noreferrer" className="link">
                                        <img src={instagram} className="icon" />
                                    </a>
                                )}

                                {user?.facebook_link && (
                                    <a href={user.facebook_link} target="_blank" rel="noopener noreferrer" className="link">
                                        <img src={facebook} className="icon" />
                                    </a>
                                )}

                                {user?.linkedin_link && (
                                    <a href={user.linkedin_link} target="_blank" rel="noopener noreferrer" className="link">
                                        <img src={linkedin} className="icon" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="profession">
                            {lang === "az" ? user?.job_title_az ?? user?.job_title :
                                lang === "ru" ? user?.job_title_ru ?? user?.job_title :
                                    user?.job_title}
                        </div>
                    </div>
                </div>

                <div className="description">{displayDescription}</div>

                <div className="title">{t("contactTitle")}</div>

                {/* EMAIL */}
                <div className="linkWrapper">
                    <div className="link">
                        <img src={letter} className="icon" />
                    </div>
                    <span>{t("mail")}:</span>

                    {mailUrl ? (
                        <a href={mailUrl} className="span">
                            {user?.email}
                        </a>
                    ) : (
                        <span className="span">{user?.email}</span>
                    )}
                </div>

                {/* PHONE / WHATSAPP */}
                {(whatsappUrl || telUrl) && (
                    <div className="linkWrapper">
                        <div className="link">
                            <img src={phone} className="icon" />
                        </div>

                        <span>{t("mobile")}:</span>

                        {telUrl ? (
                            <a href={telUrl} className="span">
                                {user?.mobile_phone}
                            </a>
                        ) : (
                            <span className="span">{user?.mobile_phone}</span>
                        )}
                    </div>
                )}

                <div className="title asd">{t("socialMedia")}</div>

                <div className="socialMediaWrapper">
                    {user?.instagram_link && (
                        <a
                            href={user.instagram_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="socialMedia"
                        >
                            <img src={instagram} className="icon" /><span>Instagram</span>
                        </a>
                    )}

                    {whatsappUrl && (
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="socialMedia"
                        >
                            <img src={whatsapp} className="icon" /><span>WhatsApp</span>
                        </a>
                    )}

                    {user?.facebook_link && (
                        <a
                            href={user.facebook_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="socialMedia"
                        >
                            <img src={facebook} className="icon" /><span>Facebook</span>
                        </a>
                    )}

                    {user?.linkedin_link && (
                        <a
                            href={user.linkedin_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="socialMedia"
                        >
                            <img src={linkedin} className="icon" /><span>LinkedIn</span>
                        </a>
                    )}
                </div>

            </div>
        </section>
    );
}

export default Info;
