'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { Button } from './ui/button';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { countries, religions } from '@/utils';
import { Checkbox } from './ui/checkbox';

import RSelect, { MultiValue } from 'react-select';
import { Loader } from 'lucide-react';

const token = '';

const estado_civil = ['Solteiro', 'Casado', 'Divorciado'];

interface IOptionReligion {
  label: string;
  value: string;
}

interface Form {
  genre?: string;
  // age?: string;
  country?: string;
  marital_status?: string;
  country_target?: string;
  traveling?: boolean;
  religions?: IOptionReligion[];

  target_genre?: string;
  // target_age?: string;
  target_marital_status?: string;
}

export const InputForm = () => {
  const [form, setForm] = useState<Form>({ traveling: true } as Form);
  const [data, setData] = useState<any>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const optionsReligions: IOptionReligion[] = religions.map((religion) => ({
    label: religion,
    value: religion,
  }));

  function handleChangeField(data: Form) {
    setForm((state) => ({ ...state, ...data }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(form);

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    setIsLoading(true);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `I am a Reformed Christian ${form.marital_status} ${
              form.genre
            } from ${form.country}. 
            I'm traveling to ${
              form.country_target
            }. ?While I'm there I may encounter  ${(form?.religions || [])
              .map((_religion) => _religion.value)
              .join(',')}? people I 
            would like to approach with the Gospel of Jesus Christ (Man was fallen and in a state of sin towards
             God and headed to Hell, but God in his mercy sent His only Son, born of a virgin, to live a perfect 
             life and to die on the cross as an atonement for those who would believe in him, salvation is by grace through
              faith in Jesus Christ alone). Provide me with a JSON file with the following structure {worldview: string; religions: 
              {<religionI>:string}; crsAspects:[string]; avoid: [string]; favorable:[string]; actionItems: [string]; evangelisationTips:
               string; summary: string;}, where worldview is a short text about the common worldview of people from <country> and how it 
               varies across <religions>; where <religionI> is a short text about the expressions of <religionI> in <country>; where crsAspects 
               is a list of up to ten cultural, social and religious aspects I should be aware of in this context; where avoid is a list of up to 
               10 attitudes to avoid around people from <country> while I am there; where favorable is a list of up to 10 attitudes that would improve 
               my ability to share my faith; where evangelisationTips is a list of up to ten tips for successful evangelization of the reformed faith in<country>;
            and where summary is a text of up to 150 words summarizing the previous information.`,
          },
        ],
      }
    );

    // console.log(response.data);

    setData(JSON.parse(response.data.choices[0].message.content));

    setIsLoading(false);

    // setData(
    //   response.data.choices.map((choice) => choice.message.content).join('\n')
    // );
  };

  function handleChangeReligion(option_religion?: MultiValue<IOptionReligion>) {
    setForm((state) => ({ ...state, religions: option_religion }));
  }

  return (
    <div className="flex flex-col items-center justify-center p-5 overflow-auto">
      {/* FORM  */}

      <div className="flex flex-row gap-4">
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
          <div className="flex flex-col gap-8">
            {/* PERSONAL INFO */}
            <Card className="w-full lg:w-auto">
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* genero */}
                <div className="space-y-2">
                  <Label>Género</Label>
                  <RadioGroup
                    onValueChange={(value) =>
                      handleChangeField({ genre: value })
                    }
                    defaultValue={form?.genre}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={'male'} id="male" />
                      <Label htmlFor="male">Masculino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Feminino</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* idade */}
                {/* <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="24"
                    required
                    value={form?.age}
                    onChange={(e) => handleChangeField({ age: e.target.value })}
                  />
                </div> */}

                {/* estado civil */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Estado Civil</Label>
                  <Select
                    value={form.marital_status}
                    onValueChange={(value) =>
                      handleChangeField({ marital_status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Estado Civil" />
                    </SelectTrigger>
                    <SelectContent>
                      {estado_civil.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">País Origem</Label>
                  <Select
                    value={form.country}
                    onValueChange={(value) =>
                      handleChangeField({ country: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="País Origem" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-row items-center space-x-2">
                  <Label>Estás a Viajar?</Label>

                  <Checkbox
                    checked
                    disabled
                    onCheckedChange={(value) =>
                      handleChangeField({ traveling: !!value })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* TRAVELING */}
            {form.traveling && (
              <Card className="w-full lg:w-auto">
                <CardHeader>
                  <CardTitle>Alvo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Genre */}
                  {/* <div className="space-y-2">
                    <Label htmlFor="email">Género</Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        handleChangeField({ target_genre: value })
                      }
                      defaultValue={form?.target_genre}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={'male'} id="male" />
                        <Label htmlFor="male">Masculino</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Feminino</Label>
                      </div>
                    </RadioGroup>
                  </div> */}

                  <div className="space-y-2">
                    <Label htmlFor="religion">Religião</Label>
                    <RSelect
                      placeholder="Religiões"
                      options={optionsReligions}
                      isMulti
                      onChange={(e) => handleChangeReligion(e)}
                      value={form.religions || []}
                    />
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="24"
                      required
                      value={form?.target_age}
                      onChange={(e) =>
                        handleChangeField({ target_age: e.target.value })
                      }
                    />
                  </div> */}

                  {/* <div className="space-y-2">
                    <Label htmlFor="phone">Estado Civil</Label>
                    <Select
                      value={form.target_marital_status}
                      onValueChange={(value) =>
                        handleChangeField({ target_marital_status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Estado Civil" />
                      </SelectTrigger>
                      <SelectContent>
                        {estado_civil.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div> */}

                  <div className="space-y-2">
                    <Label htmlFor="country">País de Destino</Label>
                    <Select
                      value={form.country_target}
                      onValueChange={(value) =>
                        handleChangeField({ country_target: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="País de Destino" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Button type="submit" className="w-full">
            Enviar parâmetros
          </Button>
        </form>
        {/* RESPONSE OPENAI */}
        <div className="border-gray-300 border rounded-xl shadow-lg w-[700px] p-4  ">
          {/* <p className="text-black text-lg">{data}</p> */}
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          {isLoading ? (
            <div className="flex justify-center items-center w-full">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p>
                <b className="uppercase">World View:</b> {data?.worldview}
              </p>

              <p>
                <b className="uppercase">Religions:</b>{' '}
                {data?.religions &&
                  Object.entries(data.religions).map(([key, value]) => (
                    <div key={key} className="ml-4">
                      <br />
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
                <b className="uppercase">Evangelisation Tips:</b>{' '}
                {data?.evangelisationTips}
              </p>

              <p>
                <b className="uppercase">Summary:</b> {data?.summary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
