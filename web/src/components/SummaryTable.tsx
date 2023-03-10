import dayjs from 'dayjs'
import { useEffect, useReducer } from 'react'
import { Habits, habits_reducer } from '../core/reducers/habits-reducer'
import { api } from '../lib/axios'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { HabitDay } from './HabitDay'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export function SummaryTable() {
  const summaryDates = generateDatesFromYearBeginning()
  const minimumSummaryDatesSize = 18 * 7 // 18 weeks
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

  const [habitsSummary, dispatch] = useReducer(habits_reducer, [])

  async function getHabits() {
    const habitsList: Habits[] = await api
      .get('summary')
      .then((response) => response.data)

    dispatch({
      type: 'set',
      payload: habitsList,
    })
  }

  useEffect(() => {
    getHabits()
    // console.log('habitsSummary', habitsSummary)
  }, [])

  return (
    <div className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {weekDays.map((weekDay, idx) => {
          return (
            <div
              key={`${weekDay}-${idx}`}
              className='text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center'
            >
              {weekDay}
            </div>
          )
        })}
      </div>
      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summaryDates.map((date) => {
          const dayInSummary = habitsSummary.find((day) => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({
            length: amountOfDaysToFill,
          }).map((_, i) => {
            return (
              <div
                key={i}
                className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'
              />
            )
          })}
      </div>
    </div>
  )
}
