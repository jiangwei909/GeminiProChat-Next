import MyChat from "./mychat";
import About from "./about";
export default function Home() {
  return (
    <main className="flex mx-auto my-4 w-full sm:w-3/4 flex-col items-center ">
      <div className="flex flex-col w-full">
        <div className="flex p-2 ">
          <div>
            <img src="/logo.png" className="w-12 h-12 m-2" />
          </div>
          <div>
            <h1 className="text-2xl">Gemini Pro Chat</h1>
            <p className="text-sm text-gray-500">A generative AI by Google.</p>
          </div>
        </div>
        <MyChat />
        {process.env.SHOW_ABOUT && <About />}
        <div className="flex mt-8 mb-4 mx-auto">
          <ul className="flex">
            <li className="mr-2 text-sm text-gray-500">
              <a href="https://www.gemini-pro-chat.com/">Gemini Pro Chat</a>
            </li>
            <li className="mr-2 text-sm text-gray-500">
              <a href="https://github.com/jiangwei909/GeminiProChat-Next">Source code</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
