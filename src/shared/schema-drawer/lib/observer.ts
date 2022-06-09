type Action = (...args: any[]) => void

export class Observer {
  protected actions: { [actionName: string]: Action[] } = {}

  public addEvent(actionName: string, action: Action): void {
    if (this.actions[actionName] === undefined) {
      this.actions[actionName] = [action]
    } else {
      this.actions[actionName]?.push(action)
    }
  }

  public emitEvent(actionName: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any[]) => {
      this.actions?.[actionName]?.forEach((action) => action(...args))
    }
  }
}
