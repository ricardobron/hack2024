'use client';

import { useOpenAi } from '@/store/openai';
import { Loader } from 'lucide-react';

export const OpenAiResponse = () => {
  const { isLoading, data } = useOpenAi();

  return (
    <div className="border-gray-300 border rounded-xl shadow-lg sm:min-w-[450px] max-w-[700px] p-4  ">
      {isLoading ? (
        <div className="flex justify-center flex-col items-center w-full h-full space-y-4">
          <Loader className="animate-spin" />
          <p className="animate-pulse  font-bold">Carregando Informações</p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          {!data ? (
            <p className="text-center font-bold">Sem dados para apresentar</p>
          ) : (
            <>
              {' '}
              <div className="flex flex-col gap-2">
                <p>
                  <b className="uppercase">World View:</b> {data?.worldview}
                </p>

                <p>
                  <b className="uppercase">Religions:</b>
                  {data?.religions &&
                    Object.entries(data.religions).map(([key, value]) => (
                      <div key={key} className="ml-4 mt-1">
                        <span>
                          <b>{key}</b>: {value} <br />
                        </span>
                      </div>
                    ))}
                </p>

                <div>
                  <p>
                    <b>Aspects</b>
                  </p>
                  <ul className="list-disc ml-6	">
                    {data?.crsAspects.map((crsAspect, index) => (
                      <li key={index}>{crsAspect}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p>
                    <b>Avoids</b>
                  </p>
                  <ul className="list-disc ml-6	">
                    {data?.avoid.map((avoid, index) => (
                      <li key={index}>{avoid}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p>
                    <b>Favorables</b>
                  </p>
                  <ul className="list-disc ml-6	">
                    {data?.favorable.map((favorable, index) => (
                      <li key={index}>{favorable}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p>
                    <b>Action Items</b>
                  </p>
                  <ul className="list-disc ml-6	">
                    {data?.actionItems.map((actionItem, index) => (
                      <li key={index}>{actionItem}</li>
                    ))}
                  </ul>
                </div>

                <p>
                  <b className="uppercase">Evangelization Tips:</b>
                  {data?.evangelisationTips}
                </p>

                <p>
                  <b className="uppercase">Summary:</b> {data?.summary}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
