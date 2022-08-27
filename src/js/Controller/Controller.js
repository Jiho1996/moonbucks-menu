import { $ } from "../utils/dom.js";
import MenuNavBar from "../View/MenuNavBar.js";
import Model from "../Model/Model.js";
import MenuList from "../View/MenuList.js";
import { MenuApi } from "../api/index.js";


export default class Controller{
    constructor(){
        this.model = new Model();

        this.menu = {
            espresso : [],
            frappuccino : [],
            blended : [],
            teavana : [],
            desert : [],
        };
        
        this.currentCategory = "espresso";
        this.initEventListener();
        this.render();
    }

    setState = async () => {
       
        await this.model.setMenuList(this.currentCategory, this.menu)
        await this.model.getMenuList(this.currentCategory, this.menu)
        
    }

    render = async () => {
        await this.setState();
        const $MenuListNode = $("#espresso-menu-list")
        new MenuList($MenuListNode, this.menu, this.currentCategory)
        const $menuNavBar = $('.flex-wrap')
        new MenuNavBar($menuNavBar, this.menu); 
    }

    initEventListener = () =>{

        $("#espresso-menu-form")
        .addEventListener("submit", (e) => {
            e.preventDefault();
        });
    
        // $("#espresso-menu-name")
        // .addEventListener("keypress", (e) =>{  
        //     if (e.key !== "Enter"){
        //         return;
        //     }
        //     extendMenuName();
            
        // });
    
        // $("#espresso-menu-submit-button")
        // .addEventListener("click", extendMenuName)
        $("#espresso-menu-list")
        .addEventListener("click", (e) => {
            const menuId = e.target.closest("li").dataset.menuId;
        
            if (e.target.classList.contains("menu-edit-button")){
                
                this.model.bindEvents().updateMenuName(menuId, this.menu, this.currentCategory);
                
                this.render();

                return;
            };
            // if (e.target.classList.contains("menu-remove-button")){
            //     removeMenu(e);
            //     return;
            // }
            // if (e.target.classList.contains("menu-sold-out-button")){
            //     soldOutMenu(e);
            //     return;
            // }
        })
    
       // $("nav").addEventListener("click", changeCategory);

    }

    // setEvent = () => {
    //     (async (e) => {
    //         const menuId = e.target.closest("li").dataset.menuId;
    //         const $innerMenuName = e.target.closest("li").querySelector(".menu-name");
    //         console.log(this.model)
    // })();

    // this.init = async () =>{
    //     this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
    //         this.currentCategory
    //     );
    //     initEventListener();
    //     render();
    // };
    
}

