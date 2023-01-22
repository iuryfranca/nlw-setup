import { api } from '../../lib/axios'

export type Form = {
  title: string
  weekDays: number[]
}

export type Habits = {
  id?: string
  date: string
  amount: number
  completed: number
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

  reset: () => {
    return (state = {
      title: '',
      weekDays: [] as number[],
    })
  },
})

export const form_reducer = (
  state: Form,
  action: { type: keyof ReturnType<typeof form_actions>; payload?: any }
) => {
  return form_actions(state)[action.type](action.payload)
}

const habits_actions = (state: Habits[]) => ({
  set: (newValue: Habits[]) => (state = newValue),

  removeById: (id: string) => {
    const filtered_habits = state.filter((i) => i.id !== id)

    return (state = filtered_habits)
  },
})

export const habits_reducer = (
  state: Habits[],
  action: { type: keyof ReturnType<typeof habits_actions>; payload?: any }
) => {
  return habits_actions(state)[action.type](action.payload)
}
