import "./index.scss";
import {useTranslation} from "react-i18next";
import {Skeleton} from "antd";

import redLetter from "/src/assets/icons/redLetter.svg";
import redPhone from "/src/assets/icons/redPhone.svg";
import redFacebook from "/src/assets/icons/redFacebook.svg";
import redLinkedin from "/src/assets/icons/redLinkedin.svg";
import redInstagram from "/src/assets/icons/redInstagram.svg";
import redWhatsapp from "/src/assets/icons/redWhatsapp.svg";
import whiteInstagram from "/src/assets/icons/whiteInstagram.svg";
import whiteFacebook from "/src/assets/icons/whiteFacebook.svg";

import profilePlaceholder from "/src/assets/images/profilePlaceholder.png";

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

    const companyDescription =
        lang === "az" ? user?.companyDescription_az ?? user?.companyDescription :
            lang === "ru" ? user?.companyDescription_ru ?? user?.companyDescription :
                user?.companyDescription;

    const avatarSrc =
        user?.avatar?.startsWith("data:")
            ? user.avatar
            : user?.avatar
                ? `data:image/png;base64,${user.avatar}`
                : profilePlaceholder;

    const cleanPhone = user?.mobile_phone
        ?.replace(/[^\d]/g, "")
        ?.replace(/^994/, "")
        ?.replace(/^0/, "");

    const whatsappUrl =
        user?.whatsapp_link
            ? user.whatsapp_link
            : cleanPhone
                ? `https://wa.me/994${cleanPhone}`
                : null;

    const telUrl = cleanPhone ? `tel:+994${cleanPhone}` : null;
    const mailUrl = user?.email ? `mailto:${user.email}` : null;

    function normalizeUrl(url) {
        if (!url) return "";
        if (!/^https?:\/\//i.test(url)) return "https://" + url;
        return url;
    }

    function formatWebsite(url) {
        if (!url) return "";
        return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    }

    function addContact() {
        const firstName =
            lang === "az" ? user?.name_az ?? user?.name :
                lang === "ru" ? user?.name_ru ?? user?.name :
                    user?.name ?? "";

        const lastName = user?.surname ?? "";
        const jobTitle =
            lang === "az" ? user?.job_title_az ?? user?.job_title :
                lang === "ru" ? user?.job_title_ru ?? user?.job_title :
                    user?.job_title ?? "";

        const description =
            lang === "az" ? user?.description_az ?? user?.description :
                lang === "ru" ? user?.description_ru ?? user?.description :
                    user?.description ?? "";

        const phone = cleanPhone ? `+994${cleanPhone}` : "";
        const email = user?.email ?? "";
        const website = normalizeUrl(user?.website_link);

        const photoLine =
            user?.avatar
                ? `PHOTO;ENCODING=b;TYPE=PNG:${user.avatar.replace(/^data:image\/\w+;base64,/, "")}`
                : "";

        const vcard =
            `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
TITLE:${jobTitle}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
URL:${website}
NOTE:${description}
${photoLine}
END:VCARD`;

        const blob = new Blob([vcard], {type: "text/vcard"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${firstName}_${lastName}.vcf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <section id="info">
            <div className="container">
                <div className="mobileWrapper">
                    <img src={avatarSrc} className="profileImage1" alt="Profile"/>

                    <div style={{width: "100%"}}>
                        <div className="nameWrapper">
                            {displayName ? (
                                <div className="name">{displayName}</div>
                            ) : (
                                <Skeleton active paragraph={false} title={{width: "60%"}} className="skeleton"/>
                            )}

                            <div className="links">
                                {user?.instagram_link && (
                                    <a href={user.instagram_link} target="_blank" rel="noopener noreferrer"
                                       className="link">
                                        <img src={redInstagram} className="icon"/>
                                    </a>
                                )}
                                {whatsappUrl && (
                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="link">
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

                        {user?.job_title ? (
                            <div className="profession">
                                {lang === "az" ? user?.job_title_az ?? user?.job_title :
                                    lang === "ru" ? user?.job_title_ru ?? user?.job_title :
                                        user?.job_title}
                            </div>
                        ) : (
                            <Skeleton active paragraph={false} title={{width: "40%"}} className="skeleton"/>
                        )}
                    </div>
                </div>

                {displayDescription ? (
                    <div className="description">{displayDescription}</div>
                ) : (
                    <Skeleton active title={false} paragraph={{rows: 4, width: "90%"}} className="skeleton"/>
                )}

                <div className="zakir" style={{padding: "16px", marginTop: "16px", borderRadius: "0 135px 0 0"}}>
                    <div className="title">{t("contactTitle")}</div>

                    <div className="linkWrapper">
                        <div className="link" style={{backgroundColor: "white"}}>
                            <img src={redLetter} className="icon"/>
                        </div>
                        <span>{t("mail")}:</span>

                        {user?.email ? (
                            <a href={mailUrl} className="span">{user.email}</a>
                        ) : (
                            <Skeleton active paragraph={false} title={{width: "85%"}} className="skeleton" style={{
                                padding: 0,
                                paddingLeft: '16px'
                            }}/>
                        )}
                    </div>

                    <div className="linkWrapper">
                        <div className="link" style={{backgroundColor: "white"}}>
                            <img src={redPhone} className="icon"/>
                        </div>

                        <span>{t("mobile")}:</span>

                        {user?.mobile_phone ? (
                            telUrl ? (
                                <a href={telUrl} className="span">{user.mobile_phone}</a>
                            ) : (
                                <span className="span">{user.mobile_phone}</span>
                            )
                        ) : (
                            <Skeleton
                                active
                                paragraph={false}
                                title={{width: "85%"}}
                                className="skeleton" style={{
                                padding: 0,
                                paddingLeft: '16px'
                            }}
                            />
                        )}
                    </div>

                    <button onClick={addContact} className="addContact">{t("addContact")}</button>

                    <div className="title asd">{t("socialMedia")}</div>

                    <div className="socialMediaWrapper">
                        {user?.instagram_link && (
                            <a href={user.instagram_link} target="_blank" rel="noopener noreferrer"
                               className="socialMedia">
                                <img src={redInstagram} className="icon"/>
                                <span>Instagram</span>
                            </a>
                        )}
                        {whatsappUrl && (
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="socialMedia">
                                <img src={redWhatsapp} className="icon"/>
                                <span>WhatsApp</span>
                            </a>
                        )}
                        {user?.facebook_link && (
                            <a href={user.facebook_link} target="_blank" rel="noopener noreferrer"
                               className="socialMedia">
                                <img src={redFacebook} className="icon"/>
                                <span>Facebook</span>
                            </a>
                        )}
                        {user?.linkedin_link && (
                            <a href={user.linkedin_link} target="_blank" rel="noopener noreferrer"
                               className="socialMedia">
                                <img src={redLinkedin} className="icon"/>
                                <span>LinkedIn</span>
                            </a>
                        )}
                    </div>
                </div>

                <div style={{padding: "16px", marginTop: "16px", borderRadius: "0 135px 0 0"}}>
                    <div className="title">{t("companyTitle")}</div>

                    {companyDescription ? (
                        <div className="description" style={{padding: 0}}>
                            {companyDescription}
                        </div>
                    ) : (
                        <Skeleton active title={false} paragraph={{rows: 2, width: "85%"}} className="skeleton"/>
                    )}

                    {user?.companyEmail && (
                        <div className="linkWrapper">
                            <div className="link" style={{backgroundColor: "white"}}>
                                <img src={redLetter} className="icon"/>
                            </div>
                            <span>{t("mail")}:</span>
                            <a href={`mailto:${user.companyEmail}`} className="span">
                                {user.companyEmail}
                            </a>
                        </div>
                    )}

                    {user?.companyPhoneNumber && (
                        <div className="linkWrapper">
                            <div className="link" style={{backgroundColor: "white"}}>
                                <img src={redPhone} className="icon"/>
                            </div>
                            <span>{t("mobile")}:</span>
                            <a href={`tel:${user.companyPhoneNumber}`} className="span">
                                {user.companyPhoneNumber}
                            </a>
                        </div>
                    )}

                    <div className="title asd">{t("socialMedia")}</div>

                    <div className="companySocialMediaWrapper">
                        {user?.companySM_instagram && (
                            <>
                                <a className="companySocialMedia" target="_blank" rel="noopener noreferrer"
                                   href={user.companySM_instagram}>
                                    <img src={whiteInstagram} className="cSocialMediaIcon"/>
                                    <p>Instagram</p>
                                </a>
                                <div className="divider"></div>
                            </>
                        )}

                        {user?.companySM_facebook && (
                            <a className="companySocialMedia" target="_blank" rel="noopener noreferrer"
                               href={user.companySM_facebook}>
                                <img src={whiteFacebook} className="cSocialMediaIcon"/>
                                <p>Facebook</p>
                            </a>
                        )}
                    </div>

                    <div className="website">
                        <div className="stick"></div>
                        <a
                            className="websiteUrl"
                            href={normalizeUrl(user?.website_link)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {formatWebsite(user?.website_link)}
                        </a>
                        <div className="stick"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Info;
