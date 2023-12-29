import logoImage from "../Assets/Images/logo.jpg";
export default function ApplicationLogo({height = 'h-12'}) {
    return (
        <img src={logoImage} className={`${height} rounded-full`} />
    );
}
