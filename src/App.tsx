import { useState, useEffect, useRef } from "react";

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: React.ReactNode;
};

const ANSWERS = {
  intro: (
    <p>
      I'm Martin Morondo, Front End Developer
    </p>
  ),
  comunidad: (
    <p>
      Si necesitas una mano, podes seguirme en mis redes o para estar en contacto etc.. <a href=".." rel="noopene noreferer" target="_blank">links...</a>
    </p>
  ),
  unknown: (
    <p>
      Im not really Martin, Im an AI prepared to answer questions about him. Please rephrase.
    </p>
  ),
  contacto: (
    <p>
      Si queres contactarme, podes hacer a traves de mi <a href=".." rel="noopener noreferrer" target="_blank">Twitter</a>, mi <a href="..." rel="noopener noreferrer" target="_blank">Linkedin...</a>
    </p>
  ),
}

const EXAMPLES = [{"text": "Hola", "label": "intro"}, {"text": "Cómo estás?", "label": "intro"}, {"text": "Quién sos?", "label": "intro"}, {"text": "Tengo una oferta para vos", "label": "contacto"}, {"text": "Por dónde te puedo contactar?", "label": "contacto"}, {"text": "Tengo una duda", "label": "comunidad"}, {"text": "Necesito solucionar algo", "label": "comunidad"}, {"text": "Estás buscando un cambio laboral?", "label": "contacto"}, {"text": "Con qué tecnologías trabajas?", "label": "intro"}, {"text": "Con qué tecnologías tenes experiencia?", "label": "intro"}, {"text": "Estás escuchando propuestas?", "label": "contacto"}, {"text": "Sabes inglés?", "label": "intro"}, {"text": "Cuántos años de experiencia tenes?", "label": "intro"}, {"text": "Te interesa cambiar de compañía?", "label": "contacto"}, {"text": "Cómo es tu Linkedin?", "label": "contacto"}, {"text": "Cómo es tu GitHub?", "label": "contacto"}, {"text": "Dónde trabajas?", "label": "comunidad"}, {"text": "Cómo hiciste este chat?", "label": "comunidad"}, {"text": "Cómo aprender a programar?", "label": "comunidad"}, {"text": "Te puedo hacer una consulta?", "label": "comunidad"}, {"text": "Tenés recursos, tutoriales?", "label": "comunidad"}, {"text": "Cuáles son tus redes?", "label": "comunidad"}, {"text": "Dónde vivis actualmente?", "label": "unkwnown"}, {"text": "Tenés currículum/CV?", "label": "intro"}, {"text": "Haces deportes?", "label": "unkwnown"}, {"text": "Qué horarios tenes libres?", "label": "intro"}, {"text": "Contame un chiste", "label": "unkwnown"}, {"text": "Cuál es tu expectativa salarial?", "label": "contacto"}, {"text": "Dónde estás trabajando?", "label": "intro"}, {"text": "Contame acerca de vos", "label": "intro"}, {"text": "Que skills manejas?", "label": "intro"}, {"text": "Cuál es tu empleo actual?", "label": "intro"}]

const API_KEY = "4oMB7D3br5QVp9hN8eGXkB0ADDeAN7SbdWcCQ0HY";

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hi, I'm a bot ready to answer some questions about Martin Morondo. Ask me your question.",
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
      "Authorization": `Bearer ${API_KEY}`,
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
    <main className="p-4">
      <div className = 'flex flex-col gap-4 m-auto max-w-lg border border-white-400 p-4 rounded-md'>
        <div ref = {container} className="flex flex-col gap-4 h-[300px] overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`p-4 max-w-[80%] rounded-3xl text-white ${message.type === 'bot' ? 'bg-slate-500 text-left self-start rounded-bl-none' : 'bg-blue-500 text-right self-end rounded-br-none'}`}>{message.text}</div>
           ))}
        </div>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <input 
            placeholder="¿Who are you?" className="rounded rounded-r-none flex-1 border border-gray-400 py-2 px-4" 
            name="question"
            type="text" 
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            />
          <button 
          disabled={loading}
          type="submit" 
          className={`px-4 py-2 bg-blue-500 rounded-lg rounded-l-none
          ${loading ? 'bg-blue-300': 'bg-blue-500'}`}
          >Send</button>
        </form>
          </div>
    </main> 
  );
}

export default App;
