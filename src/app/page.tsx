import { InputForm } from '@/components/InputForm';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mt-4">
        Seja bem-vindo ao Global Christ
      </h1>
      <p>
        Preencha as informações abaixo a direita e receba orientações de como
        abordar pessoas com o evangelho
      </p>

      <InputForm />
    </div>
  );
}
