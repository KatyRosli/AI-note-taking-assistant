import { BsLinkedin, BsGithub, BsBehance, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full bottom-0 p-4 mt-16 text-gray-400 flex justify-center">
      <a className="flex" href="https://github.com/KatyRosli/AI-note-taking-assistant" target="_blank" rel="noopener noreferrer">
        Open sourced on {""}
        <div className="text-violet-500 ms-2 me-2">Github{" "}</div>
        by
      </a> 
      <a href="https://www.katyrosli.com" target="_blank" rel="nopener noreferrer"className="text-violet-500 ms-2">
        {" "}
        Katy Rosli
      </a>
    </footer>
  );
};
export default Footer;
