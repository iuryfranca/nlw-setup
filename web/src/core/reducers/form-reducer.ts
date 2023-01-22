import { z } from 'zod'

export type Form = {
  id?: string
  title: string
  weekDays: number[]
}
// -----------------------------------------------
// Actions
// -----------------------------------------------

const form_actions = (state: Form) => ({
  setForm: (newValue: Form) => {
    return (state = newValue)
  },

  handleToggleWeekDay: (weeDay: number) => {
    if (state?.weekDays.includes(weeDay)) {
      const weekDaysWithRemoveOne = state?.weekDays.filter(
        (day) => day !== weeDay
      )

      return (state = {
        title: state?.title,
        weekDays: weekDaysWithRemoveOne,
      })
    } else {
      const weekDaysWithAddOne = [...state.weekDays, weeDay]

      return (state = {
        title: state?.title,
        weekDays: weekDaysWithAddOne,
      })
    }
  },

  // removeById: (id: string) => {
  //   const filtered_forms = state.filter((i) => i.id !== id)

  //   return (state = filtered_forms)
  // },

  reset: () => {
    return (state = {
      title: '',
      weekDays: [] as number[],
    })
  },
})

const form_reducer = (
  state: Form,
  action: { type: keyof ReturnType<typeof form_actions>; payload?: any }
) => {
  return form_actions(state)[action.type](action.payload)
}

// -----------------------------------------------
// Service
// -----------------------------------------------

class Service {
  constructor() {}

  public async fetchForms() {
    const data = await fetch('https://api.com.br/forms').then((i) =>
      JSON.stringify(i)
    )

    form_reducer(
      {
        title: '',
        weekDays: [],
      },
      { type: 'setForm', payload: data }
    )
  }
}

export const form_service = new Service()

export { form_reducer }
