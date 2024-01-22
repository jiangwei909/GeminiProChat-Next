function About() {
  return (
    <div className="flex flex-col mt-8 leading-6 p-2">
      <div className="mb-2">
        <h1 className="font-bold text-lg">What is the Gemini</h1>
        <p>
          Gemini is a family of multimodal language models, developed by Google
          DeepMind, a successor to LaMDA and part of the next generation of the
          PaLM2 family.Gemini, which includes Gemini Ultra, Gemini Pro, and
          Gemini Nano, comes out on December 6, 2023, and is being positioned to
          compete with OpenAI's GPT-4 product line to rival OpenAI's GPT-4.
        </p>
      </div>

      <div className="mb-2">
        <h1 className="font-bold text-lg">The Gemini meaning</h1>
        <p>
          Gemini is the name of a zodiac sign representing the constellation of
          Gemini. It is the third sign of the zodiac in the celestial sphere and
          corresponds to the period between May 21st and June 21st. Gemini
          symbolizes traits such as versatility, communication, and
          intelligence.
        </p>
      </div>

      <div className="mb-2">
        <h1 className="font-bold text-lg">What is the Gemini Pro</h1>
        <p>
          Gemini is designed to run on almost any device. Google claims that its
          three versions—Gemini Ultra, Gemini Pro, and Gemini Nano—are capable
          of running efficiently on everything from data centers to smartphones.
        </p>
        <p>
          Gemini Pro offers a balance between scalability and performance. It's
          designed to be used for a variety of different tasks. Right now, a
          specially trained version of it is used by Google Bard to handle more
          complex queries. In independent testing, Gemini Pro was found to
          achieve "accuracy that is close but slightly inferior to the
          corresponding GPT 3.5 Turbo" model.
        </p>
      </div>

      <div className="mb-2">
        <h1 className="font-bold text-lg">What is the Gemini Pro Chat</h1>
        <p>
          The Gemini Pro Chat is an advanced and intelligent chatbot powered by
          a state-of-the-art language model called GPT (Generative Pre-trained
          Transformer). Developed using Next.js, a popular framework for
          building web applications, this chatbot introduces a new level of
          conversational experience.
        </p>
        <p>
          With its cutting-edge technology, Gemini Pro Chat is designed to
          engage users in meaningful and natural conversations. It leverages the
          power of GPT to understand user inputs and generate contextual and
          relevant responses. Whether it's answering questions, providing
          recommendations, or engaging in casual conversations, the chatbot aims
          to deliver a human-like interaction.
        </p>
      </div>

      <div className="mb-2">
        <h1 className="font-bold text-lg">How to use Gemini Pro</h1>
        <p>Currently, you can use Gemini Pro in three ways:</p>

        <div>
          <ul className="list-disc list-inside">
            <li>
              Through the https://gemini-pro-chat.com website, you can have a
              text conversation with Gemini Pro and experience its language and
              creativity skills.{" "}
            </li>

            <li>
              Through the Bard website, you can have a text conversation with
              Gemini Pro and experience its language and creativity skills. You
              just need to open the Bard website, enter what you want to say,
              and wait for Gemini Pro's answer. You can chat with it about any
              topic, such as weather, movies, music, etc., or you can ask it to
              help you write some content, such as stories, poems, code, etc.{" "}
            </li>

            <li>
              Through Google AI Studio, you can use Gemini Pro's API to achieve
              more functions, such as image generation, translation,
              programming, etc. You just need to open the Google AI Studio
              website, get your API key, and then select the model and task you
              want, enter your prompt, and run. You can see Gemini Pro's various
              abilities and effects here.
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-2">
        <h1 className="font-bold text-lg">
        What are the differences between the three versions of Gemini and GPT-4?
        </h1>
        <p>
          Gemini and GPT-4 are both large-scale artificial intelligence language
          models, developed by Google and OpenAI respectively, that can perform
          various tasks involving natural language processing and generation.
          However, they have some distinctive features and capabilities that set
          them apart.{" "}
        </p>
        <p>
          Gemini Ultra is the largest model designed for the most complex tasks.
          In LLM benchmarks like MMLU, Big-Bench Hard, and HumanEval, it
          outperformed GPT-4, and in multimodal benchmarks like MMMU, VQAv2, and
          MathVista, it outperformed GPT-4V. It's still undergoing testing and
          is due to be released next year.
        </p>
        <p>
          Gemini Pro offers a balance between scalability and performance. It's
          designed to be used for a variety of different tasks. Right now, a
          specially trained version of it is used by Google Bard to handle more
          complex queries. In independent testing, Gemini Pro was found to
          achieve "accuracy that is close but slightly inferior to the
          corresponding GPT 3.5 Turbo" model.
        </p>
        <p>
          Gemini Nano is designed to operate locally on smartphones and other
          mobile devices. In theory, this would allow your smartphone to respond
          to simple prompts and do things like summarize text far faster than if
          it had to connect to an external server. For now, Gemini Nano is only
          available on the Google Pixel 8 Pro and powers features like smart
          replies in Gboard.
        </p>
      </div>
    </div>
  );
}

export default About;
