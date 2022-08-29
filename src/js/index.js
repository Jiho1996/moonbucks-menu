
import Controller from "./Controller/Controller.js";

function App(){
    this.init = async () =>{
        new Controller();
    };
}

const app = new App();
app.init()