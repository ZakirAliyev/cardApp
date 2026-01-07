import "./index.scss";
import {useTranslation} from "react-i18next";
import redLetter from "/src/assets/icons/redLetter.svg";
import redPhone from "/src/assets/icons/redPhone.svg";
import redFacebook from "/src/assets/icons/redFacebook.svg";
import redLinkedin from "/src/assets/icons/redLinkedin.svg";
import redInstagram from "/src/assets/icons/redInstagram.svg";
import redWhatsapp from "/src/assets/icons/redWhatsapp.svg";
import whiteInstagram from "/src/assets/icons/whiteInstagram.svg";
import whiteFacebook from "/src/assets/icons/whiteFacebook.svg";

const defaultProfile = "data:image/png;base64,....";

function Info({user}) {
    const {t, i18n} = useTranslation();
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

    function normalizeUrl(url) {
        if (!url) return "";
        if (!/^https?:\/\//i.test(url)) {
            return "https://" + url;
        }
        return url;
    }

    function formatWebsite(url) {
        if (!url) return "";

        return url
            .replace(/^https?:\/\//, "")
            .replace(/\/$/, "");
    }

    return (
        <section id="info">
            <div className="container">

                <div className="mobileWrapper">
                    <img
                        src={avatarSrc}
                        className="profileImage1"
                        alt="Profile"
                    />

                    <div style={{width: "100%"}}>
                        <div className="nameWrapper">
                            <div className="name">{displayName}</div>

                            <div className="links">
                                {user?.instagram_link && (
                                    <a href={user.instagram_link} target="_blank" rel="noopener noreferrer"
                                       className="link">
                                        <img src={redInstagram} className="icon"/>
                                    </a>
                                )}

                                {whatsappUrl && (
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link"
                                    >
                                        <img src={redWhatsapp} className="icon"/>
                                    </a>
                                )}
                                {user?.facebook_link && (
                                    <a href={user.facebook_link} target="_blank" rel="noopener noreferrer"
                                       className="link">
                                        <img src={redFacebook} className="icon"/>
                                    </a>
                                )}
                                {user?.linkedin_link && (
                                    <a href={user.linkedin_link} target="_blank" rel="noopener noreferrer"
                                       className="link">
                                        <img src={redLinkedin} className="icon"/>
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

                <div style={{
                    backgroundColor: "#F3F3F3",
                    padding: '16px',
                    marginTop: '16px',
                    borderRadius: '0 135px 0 0'
                }}>
                    <div className="title">{t("contactTitle")}</div>

                    {/* EMAIL */}
                    <div className="linkWrapper">
                        <div className="link" style={{
                            backgroundColor: "white",
                        }}>
                            <img src={redLetter} className="icon"/>
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

                    {(whatsappUrl || telUrl) && (
                        <div className="linkWrapper">
                            <div className="link" style={{
                                backgroundColor: "white",
                            }}>
                                <img src={redPhone} className="icon"/>
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
                                <img src={redInstagram} className="icon"/><span>Instagram</span>
                            </a>
                        )}

                        {whatsappUrl && (
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="socialMedia"
                            >
                                <img src={redWhatsapp} className="icon"/><span>WhatsApp</span>
                            </a>
                        )}

                        {user?.facebook_link && (
                            <a
                                href={user.facebook_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="socialMedia"
                            >
                                <img src={redFacebook} className="icon"/><span>Facebook</span>
                            </a>
                        )}

                        {user?.linkedin_link && (
                            <a
                                href={user.linkedin_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="socialMedia"
                            >
                                <img src={redLinkedin} className="icon"/><span>LinkedIn</span>
                            </a>
                        )}
                    </div>
                </div>

                <div style={{
                    padding: '16px',
                    marginTop: '16px',
                    borderRadius: '0 135px 0 0',
                    paddingTop: '8px'
                }}>
                    <div className="title">{t("companyTitle")}</div>

                    <div className="description" style={{
                        padding: '0'
                    }}>{displayDescription}</div>

                    {/* EMAIL */}
                    <div className="linkWrapper">
                        <div className="link" style={{
                            backgroundColor: "white",
                        }}>
                            <img src={redLetter} className="icon"/>
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

                    {(whatsappUrl || telUrl) && (
                        <div className="linkWrapper">
                            <div className="link" style={{
                                backgroundColor: "white",
                            }}>
                                <img src={redPhone} className="icon"/>
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

                    <div className={"companySocialMediaWrapper"}>
                        <div className={"companySocialMedia"}>
                            <img src={whiteInstagram} alt={"Icon"} className={"cSocialMediaIcon"}/>
                            <p>Instagram</p>
                        </div>
                        <div className={"divider"}></div>
                        <div className={"companySocialMedia"}>
                            <img src={whiteFacebook} alt={"Icon"} className={"cSocialMediaIcon"}/>
                            <p>Facebook</p>
                        </div>
                    </div>

                    <div className={"website"}>
                        <div className={"stick"}></div>
                        <a
                            className="websiteUrl"
                            href={normalizeUrl(user?.website_link)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {formatWebsite(user?.website_link)}
                        </a>
                        <div className={"stick"}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Info;
