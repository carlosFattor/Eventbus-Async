import { CustomEvent } from "../../services/custom-event.interface";
export class UsersChannelListening implements CustomEvent {
  constructor(public channel: string) { }
}
