import { Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useReducer } from 'react'
import { Form, form_reducer } from '../core/reducers/habits-reducer'
import { api } from '../lib/axios'

const availableWeekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
]
export function NewHabitForm() {
  const initialFormState: Form = {
    title: '',
    weekDays: [],
  }

  const [form, dispatch] = useReducer(form_reducer, initialFormState)

  function handleAddTitle(title: string) {
    dispatch({
      type: 'setForm',
      payload: {
        title: title,
        weekDays: form.weekDays,
      },
    })
  }

  function handleAddWeekDays(weekDay: number) {
    dispatch({
      type: 'handleToggleWeekDay',
      payload: weekDay,
    })
  }

  function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!form.title || form.weekDays.length === 0) {
      return
    }

    api
      .post('habits', {
        title: form.title,
        weekDays: form.weekDays,
      })
      .then((response) => {
        dispatch({
          type: 'reset',
        })
      })
  }

  return (
    <form onSubmit={createNewHabit} className='w-full flex flex-col mt-6'>
      <label htmlFor='title' className='font-semibold leading-tight'>
        Qual seu comprometimento?
      </label>

      <input
        type='text'
        id='title'
        placeholder='Exercícios, dormir bem, etc...'
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400'
        autoFocus
        value={form.title}
        onChange={(event) => handleAddTitle(event.target.value)}
      />

      <label className='font-semibold leading-tight mt-4'>
        Qual a recorrência?
      </label>

      <div className='flex flex-col gap-2 mt-3'>
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            className='flex items-center gap-3 group'
            checked={form.weekDays.includes(index)}
            onCheckedChange={() => handleAddWeekDays(index)}
          >
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
              <Checkbox.Indicator>
                <Check size={20} className='text-white' />
              </Checkbox.Indicator>
            </div>
            <span className='text-white leading-tight'>{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type='submit'
        className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500'
      >
        <Check size={20} weight='bold' />
        Confirmar
      </button>
    </form>
  )
}
