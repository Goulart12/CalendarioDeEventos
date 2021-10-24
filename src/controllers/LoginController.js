import { documentStore } from "../db/config";

const session = documentStore.openSession('CalendárioDeEventos');

await session.saveChanges();