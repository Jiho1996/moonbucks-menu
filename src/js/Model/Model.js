import { MenuApi } from "../api/index.js";
import MenuNavBar from "../View/MenuNavBar.js";

export default class Model {

    constructor(){
        if (Model.instance) return Model.instance;
        Model.instance = this;
    }

    setMenuList = async (category, allMenu) => {
        const menuList = await MenuApi.getAllMenuByCategory(category);
        allMenu[category] = menuList;
        // switch (category){
        //     case "espresso":
        //         menuCategory["espresso"] = menuList;
        //         break
        //     case "frappuccino":
        //         menuCategory["frappuccino"] = menuList;
        //         break;
        //     case "blended":
        //         menuCategory["blended"] = menuList;
        //         break;
        //     case "desert":
        //         menuCategory["desert"] = menuList;
        //         break;
        //     case "teavana":
        //         menuCategory["teavana"] = menuList;
        //         break;
        //     default:
        //         break;
       // }

    }
    getMenuList(category, allMenu){
        return allMenu[category] ? allMenu["espresso"] : allMenu[category]
        
        // if (category === "espresso" || category === "") {
        //     return menuCategory["_espresso"];
        //     }
        
        //     if (category === "frappuccino") {
        //     return menuCategory["_frappuccino"];
        //     }
        
        //     if (category === "blended") {
        //     return menuCategory["_blended"];
        //     }
        
        //     if (category === "desert") {
        //     return menuCategory["_desert"];
        //     }
        
        //     if (category === "teavana") {
        //     return menuCategory["_teavana"];
        //     }
    }
}