import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="h-60 mt-40 w-full bg-black text-white flex justify-center align-middle items-center">
            <p className="flex justify-center align-middle items-center">Jan Bartnicki - 2024 &nbsp;&nbsp;
                <FaGithub/> &nbsp;&nbsp;
                <a className="underline underline-offset-2" href="https://github.com/janekbartnicki/nokia-weather-app" target="_blank">
                    GitHub
                </a>
            </p>
        </div>
    )
}

export default Footer;