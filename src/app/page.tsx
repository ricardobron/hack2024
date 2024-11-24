import { InputForm } from '@/app/components/inputForm';
import { OpenAiResponse } from './components/openAiResponse';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-5">
      <h1 className="text-2xl font-bold mt-4">
        Seja bem-vindo ao Global Christ
      </h1>
      <p className="mb-4 text-center mt-2">
        Preencha as informações abaixo a direita e receba orientações de como
        abordar pessoas com o evangelho
      </p>

      <div className="flex flex-col lg:flex-row gap-5 ">
        <InputForm />
        <OpenAiResponse />
      </div>
    </div>
  );
}
