import { ChatService } from "./service";


const service = new ChatService()
service.listen();

const app = service.app;

export { app };