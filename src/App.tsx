import { useState } from "react";

type Message = {
  id: string,
  type: 'bot' | 'user',
  text: string,
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello, world!',
    },
    {
      id: '2',
      type: 'user',
      text: 'Hello, user!',
    },
  ]);

  return (
    <main className="p-4">
      <div className = 'flex flex-col gap-4 m-auto max-w-lg border border-white-400 p-4 rounded-md'>
        <div className="flex flex-col gap-4 h-[300px] overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`p-4 max-w-[80%] rounded-3xl text-white ${message.type === 'bot' ? 'bg-slate-500 text-left self-start rounded-bl-none' : 'bg-blue-500 text-right self-end rounded-br-none'}`}>{message.text}</div>
           ))}
        </div>
        <form className="flex items-center">
          <input type="text" placeholder="¿Who are you?" className="rounded rounded-r-none flex-1 border border-gray-400 py-2 px-4" />
          <button type="submit" className="px-4 py-2 bg-blue-500 rounded-lg rounded-l-none">Send</button>
        </form>
          </div>
    </main> 
  );
}

export default App
