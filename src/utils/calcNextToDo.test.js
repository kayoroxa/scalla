import calcNextTodo from './calcNextTodo'

describe('calcNext', () => {
  it('palavra entre + retorna .pronunciation', () => {
    expect(calcNextTodo([{ data: 'sad', feito: 100 }], 0.01)).toEqual(101)
    expect(
      calcNextTodo(
        [
          { data: 'sad', feito: 1 },
          { data: 'sad', feito: 100 },
        ],
        0.1
      )
    ).toEqual(110)
    expect(
      calcNextTodo(
        [
          { data: 'sad', feito: 1 },
          { data: 'sad', feito: 2 },
          { data: 'sad', feito: 100 },
        ],
        0.1
      )
    ).toEqual(110)
  })
})
