import { $ } from "../utils/dom.js";
import MenuNavBar from "../View/MenuNavBar.js";
import Model from "../Model/Model.js";
import MenuList from "../View/MenuList.js";


export default class Controller{
    constructor(){

        this.menu = {
            espresso : [],
            frappuccino : [],
            blended : [],
            teavana : [],
            desert : [],
        };
        
        this.currentCategory = "espresso";
        this.setState();
    }

    setState = async () => {
        const model = new Model();
        await model.setMenuList(this.currentCategory, this.menu)
        await model.getMenuList(this.currentCategory, this.menu)
        this.render();
    }

    render = async () => {
        const $MenuListNode = $("#espresso-menu-list")
        new MenuList($MenuListNode, this.menu, this.currentCategory)
        const $menuNavBar = $('.flex-wrap')
        new MenuNavBar($menuNavBar, this.menu); 
    }

    // this.init = async () =>{
    //     this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
    //         this.currentCategory
    //     );
    //     initEventListener();
    //     render();
    // };
    
}
