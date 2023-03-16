import { useState, useEffect, useRef } from "react";

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: React.ReactNode;
};

const ANSWERS = {
  spanishIntro: (
    <p>
     Mi nombre es Martín Morondo y actualmente estudio Ingeniería en Sistemas en la UNICEN. Soy un apasionado Desarrollador Front-end radicado en Argentina.
     Me encanta diseñar y crear sitios web responsivos o aplicaciones web desde cero. Las tecnologías, herramientas y lenguajes que utilizo para construir mis proyectos son HTML, CSS, Bootstrap, Tailwind, Javascript, Typecript, jQuery, React JS, , Git, GitHub y VS Code.
     Además, cuento con un nivel de inglés avanzado.
    </p>
  ),
  englishIntro: (
    <p>
      My name is Martín Morondo and I am currently studying Systems Engineering at UNICEN. I am a passionate Front-end Developer based in Argentina.
      I love to design and create responsive websites or web applications from scratch. The technologies, tools and languages I use to build my projects are HTML, CSS, Bootstrap, Tailwind, Javascript, jQuery, React JS, Git, GitHub and VS Code.
      In addition, I have an advanced level of English.
    </p>
  ),
  spanishContact: (
    <p>
      
    </p>
  ),
  spanishContact: (
    <p>
      Si tienes alguna duda o necesitas resolver algo, puedes ponerte en contacto conmigo a través de mi correo electrónico: martinmorondo@gmail.com. 
      Además, ¡puedes preguntarme lo que necesites!
    </p>
  ),
  englishContact: (
    <p>
      If you have a question or need to solve something, you can contact me through my e-mail: martinmorondo@gmail.com. 
      Also, you can ask me whatever you need!
    </p>
  ),
  Trabajo: (
    <p>
      Actualmente no estoy trabajando y estoy escuchando propuestas laborales, ya que me encuentro buscando trabajo.
      Tengo todos los días libres, de lunes a viernes.
    </p>
  ),
  Job: (
    <p>
      I am currently not working and I am listening to job offers, as I am looking for a job.
      I have every day off, Monday to Friday.
    </p>
  ),
  spanishRandom: (
    <p>
      Actualmente vivo en la ciudad de Tandil, Buenos Aires.
      Creé este chatbot usando la API de Co:here, que es una herramienta que te permite crear chatbots utilizando modelos de lenguaje avanzados. 

    </p>
  ),
  englishRandom: (
    <p>
      I currently live in the city of Tandil, Buenos Aires.
      I created this chatbot using the Co:here API, which is a tool that allows you to create chatbots using advanced language models. 
    </p>
  ),
  redes: (
    <p>
      Mis redes sociales son las siguientes:  <a 
      href = "https://www.linkedin.com/in/martin-morondo/" 
      target="_blank" 
      rel="noopener noreferrer">Linkedin</a> y mi perfil de <a 
      href="https://github.com/martinmorondo
      " 
      target="_blank" 
      rel="noopener noreferrer">GitHub</a>
    </p>
  ),
  socialNetw: (
    <p>
     My social networks are the following: <a 
      href = "https://www.linkedin.com/in/martin-morondo/" 
      target="_blank" 
      rel="noopener noreferrer" className="underline-offset-0">Linkedin</a> and my <a 
      href="https://github.com/martinmorondo
      " 
      target="_blank" 
      rel="noopener noreferrer">GitHub</a>
    </p>
  ),
}

const EXAMPLES = [{"text": "Hola", "label": "spanishIntro"}, {"text": "Cómo estás?", "label": "spanishIntro"}, {"text": "Quién sos?", "label": "spanishIntro"}, {"text": "Hi", "label": "englishIntro"}, {"text": "Hello", "label": "englishIntro"}, {"text": "Who are you?", "label": "englishIntro"}, {"text": "Tengo una oferta para vos", "label": "Trabajo"}, {"text": "I have an offer for you", "label": "Job"}, {"text": "Por dónde te puedo contactar?", "label": "spanishContact"}, {"text": "Where can I contact you?", "label": "englishContact"}, {"text": "Tengo una duda", "label": "spanishContact"}, {"text": "I have a question", "label": "englishContact"}, {"text": "Necesito solucionar algo", "label": "spanishContact"}, {"text": "I need to solve something", "label": "englishContact"}, {"text": "Estás buscando un cambio laboral?", "label": "Trabajo"}, {"text": "Are you looking for a job change?", "label": "Job"}, {"text": "Con qué tecnologías trabajas?", "label": "spanishIntro"}, {"text": "What technologies do you work with?", "label": "englishIntro"}, {"text": "Con qué tecnologías tenes experiencia?", "label": "spanishIntro"}, {"text": "What technologies do you have experience with?", "label": "englishIntro"}, {"text": "Estás escuchando propuestas?", "label": "spanishContact"}, {"text": "Are you listening to proposals?", "label": "englishContact"}, {"text": "Sabes inglés?", "label": "spanishIntro"}, {"text": "Do you speak English?", "label": "englishIntro"}, {"text": "Cuántos años de experiencia tenes?", "label": "spanishIntro"}, {"text": "How many years of experience do you have?", "label": "englishIntro"}, {"text": "Te interesa cambiar de compañía?", "label": "Trabajo"}, {"text": "Are you interested in switching companies?", "label": "Job"}, {"text": "Cómo es tu Linkedin?", "label": "redes"}, {"text": "What is your Linkedin link?", "label": "socialNetw"}, {"text": "Cómo es tu GitHub?", "label": "redes"}, {"text": "What is your GitHub link?", "label": "socialNetw"}, {"text": "Te puedo hacer una consulta?", "label": "spanishContact"}, {"text": "Can I ask you a question?", "label": "englishContact"}, {"text": "Tenés currículum/CV?", "label": "spanishIntro"}, {"text": "Do you have a resume/CV?", "label": "englishIntro"}, {"text": "Cuál es tu expectativa salarial?", "label": "Trabajo"}, {"text": "What is your salary expectation?", "label": "Job"}, {"text": "Dónde estás trabajando?", "label": "Trabajo"}, {"text": "Where are you working?", "label": "Job"}, {"text": "Contame acerca de vos", "label": "spanishIntro"}, {"text": "Tell me about yourself", "label": "englishIntro"}, {"text": "Que habilidades manejas?", "label": "spanishIntro"}, {"text": "What skills do you have?", "label": "englishIntro"}, {"text": "Cuál es tu empleo actual?", "label": "Trabajo"}, {"text": "What is your current job?", "label": "Job"}, {"text": "Dónde trabajas?", "label": "Trabajo"}, {"text": "Where do you work?", "label": "Job"}, {"text": "Cuáles son tus redes?", "label": "redes"}, {"text": "What are your social networks?", "label": "socialNetw"}, {"text": "Cómo hiciste este chat?", "label": "spanishRandom"}, {"text": "Cómo hiciste este chat?", "label": "englishRandom"}, {"text": "Dónde vivis actualmente?", "label": "spanishRandom"}, {"text": "Where do you currently live?", "label": "englishRandom"}, {"text": "Haces deportes?", "label": "spanishRandom"}, {"text": "Do you play sports?", "label": "englishRandom"}, {"text": "Qué horarios tenes libres?", "label": "Trabajo"}, {"text": "What times are you free?", "label": "Job"}, {"text": "Contame un chiste", "label": "spanishRandom"}, {"text": "Tell me a joke", "label": "englishRandom"}]

function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hi, I'm a bot ready to answer some questions about Martin Morondo. Ask me your question.",
      className: 'bot-message'
    },
    {
      id: '1',
      type: 'bot',
      text: "Hola, soy un bot dispuesto a responder algunas preguntas sobre Martín Morondo. Hazme tu pregunta.",
    },
  ]);

  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if(loading) return;

    setLoading(true);
    setMessages((messages) => 
      messages.concat({id: String(Date.now()), type: "user", text: question}),
      );
    setQuestion("");

    const {classifications} = await fetch("https://api.cohere.ai/v1/classify", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "large",
      inputs: [question],    
      examples: EXAMPLES,
    }),
  }).then(res => res.json());(

  setMessages((messages) =>
  messages.concat({
    id: String(Date.now()), 
    type: "bot", 
    text: ANSWERS[classifications[0].prediction as keyof typeof ANSWERS] || ANSWERS["unknown"],
  }),
  ))
  setLoading(false); 
}

  useEffect(() => {
    container.current?.scrollTo(0, container.current.scrollHeight);
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
    <h1 className="font-bold rounded border border-red-100 p-4">Chatbot</h1>
    <main className="p-4">
      <div className = 'flex flex-col gap-4 m-auto max-w-lg border border-white-400 p-4 rounded-md'>
        <div ref = {container} className="container flex flex-col gap-4 h-[300px] overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`message-id p-4 max-w-[80%] rounded-3xl text-white ${message.type === 'bot' 
          ? 'bg-slate-500 text-left self-start rounded-bl-none' 
          : 'bg-blue-500 text-right self-end rounded-br-none'}`}>{message.text}</div>
           ))}
        </div>
        <form className="form flex items-center" onSubmit={handleSubmit}>
          <input 
            placeholder="¿Who are you?" className="input rounded rounded-r-none flex-1 border border-gray-400 py-2 px-4" 
            name="question"
            type="text" 
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            />
          <button 
          disabled={loading}
          type="submit" 
          className={`loading-btn px-4 py-2 bg-blue-500 rounded-lg rounded-l-none
          ${loading ? 'bg-blue-300': 'bg-blue-500'}`}
          >↩</button>
        </form>
          </div>
    </main> 
    </div>
  );
}

export default Chat;
