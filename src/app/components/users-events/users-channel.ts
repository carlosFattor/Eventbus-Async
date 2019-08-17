import { CustomEvent } from "../../services/custom-event.interface";
export class UsersChannel implements CustomEvent {
  channel: string;
  constructor(channel: string) {
    this.channel = channel;
  }
}
