import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email:String!){
    createSubscriber(data: {name: $name, email: $email}){
      id
    }
  }
`

export function Subscribe() {

  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)

  async function handleSubscribe(event: FormEvent){
    event.preventDefault();
    await createSubscriber({
      variables: {
        name,
        email
      }
    })

    navigate('/event')
  }

  return (
    <div className="min-h-screen bg-blur [background-size:cover,contain] bg-no-repeat bg-top flex flex-col items-center">
      <div className="max-w-[1280px] w-full px-6 lg:flex lg:items-center lg:justify-between mt-10 lg:mt-20 mx-auto">
        <div className="max-w-[640px] flex flex-col items-center lg:items-start">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] text-center leading-tight lg:text-start">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, <strong className="text-blue-500">com React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed text-justify">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 mt-8 lg:mt-0 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente 
          </strong>
          <form onSubmit={e => handleSubscribe(e)} className="flex flex-col gap-2 w-full">
            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="text" 
              placeholder="Seu nome completo" 
              onChange={event => {setName(event.target.value)}}
            />
            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Digite seu e-mail" 
              onChange={event => {setEmail(event.target.value)}}
            />
            <button 
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>  
          </form>
        </div>
      </div>

      <img
        src="/src/assets/code-mockup.png"
        alt="Visual studio code interface with mockup code also displaying web interfaces components"
        className="mt-4 lg:mt-10"
      />
    </div>
  );
}
