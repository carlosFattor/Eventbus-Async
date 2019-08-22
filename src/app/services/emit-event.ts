export abstract class EmitEvent<T> {
  constructor(public channel: string, public value?: T) { }
}
