import { gql, useMutation } from "@apollo/client";
import { subscribe } from "graphql";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { SlideLeftFadeRigth } from "../components/SlideLeftFadeRigth";
import { useCreateSubscriberMutation } from "../graphql/generated";
import { supabase } from "../services/supabase";

export function Subscribe() {

  const navigate = useNavigate();

  // const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formType, setFormType] = useState<'subscribe'|'login'>('subscribe')

  const [createSubscriber, { loading }] = useCreateSubscriberMutation()

  const session = supabase.auth.session()
  const accessToken = session ? session.access_token : '';

  async function handleSubscribe(event: FormEvent){
    event.preventDefault();

    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if(error){
      console.log(error)
      return error
    }

    console.log('New user created',user,session)
    navigate('/event')
  }   

  async function handleSignIn(event: FormEvent){
    event.preventDefault()

    const { user, session, error} = await supabase.auth.signIn({
      email: email,
      password: password,
    })

    if(error){
      console.log(error)
      return error
    }

    console.log('User logged in',user,session)
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

        <div className="p-8 mt-8 min-w-[25rem] lg:mt-0 bg-gray-700 border border-gray-500 rounded">
            <div className="flex mb-6">
              <SlideLeftFadeRigth toggle={formType === 'subscribe'}>
                <>
                  <strong className="text-2xl block">
                    Inscreva-se gratuitamente 
                  </strong>
                  {'ou faça seu '}
                  <a href="#" onClick={(e) => {
                    e.preventDefault()
                    setFormType('login')
                  }}>
                    <strong className=" text-blue-500 hover:underline">login</strong>
                  </a>
                </>
              </SlideLeftFadeRigth>
              <SlideLeftFadeRigth toggle={formType === 'login'}>
                <>
                  <strong className="text-2xl block">
                    Login 
                  </strong>
                  {'ou '}
                  <a href="#" onClick={(e) => {
                    e.preventDefault()
                    setFormType('subscribe')
                  }}>
                    <strong className=" text-blue-500 hover:underline">inscreva-se</strong>
                  </a>
                </>
              </SlideLeftFadeRigth>
            </div>
          <form onSubmit={e => {
              formType === 'subscribe' ? handleSubscribe(e) : handleSignIn(e)
            }} 
            className="flex flex-col gap-2 w-full"
          >
            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Digite seu e-mail" 
              onChange={event => {setEmail(event.target.value)}}
            />
            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="password"
              placeholder="Digite sua senha" 
              onChange={event => {setPassword(event.target.value)}}
            />
            <button 
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <div className="flex justify-center">
                <SlideLeftFadeRigth toggle={formType === 'subscribe'}>
                  <span>
                    Garantir minha vaga
                  </span>
                </SlideLeftFadeRigth>
                <SlideLeftFadeRigth toggle={formType === 'login'}>
                  <span>
                    Entrar
                  </span>
                </SlideLeftFadeRigth>
                </div>
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
