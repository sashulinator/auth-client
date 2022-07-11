// https://learn.javascript.ru/js-animation

export interface AnimateProps {
  timing?: (num: number) => number
  duration: number
  draw: (num: number) => void
}

export function animate({ timing = (n) => n, draw, duration }: AnimateProps) {
  const start = performance.now()

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) timeFraction = 1

    // вычисление текущего состояния анимации
    const progress = timing(timeFraction)

    draw(progress) // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    }
  })
}

export function quad(timeFraction: number) {
  return Math.pow(timeFraction, 2)
}

export function circ(timeFraction: number) {
  return 1 - Math.sin(Math.acos(timeFraction))
}
