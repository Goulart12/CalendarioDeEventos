import { DocumentStore } from "ravendb";

const store = new DocumentStore(
    ["http://127.0.0.1:1000"], "CalendárioDeEventos");                       

store.initialize();     

export { store as documentStore };
                                                                                                
