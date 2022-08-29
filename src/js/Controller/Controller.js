import { $ } from "../utils/dom.js";
import MenuNavBar from "../View/MenuNavBar.js";
import Model from "../Model/Model.js";
import MenuList from "../View/MenuList.js";

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
        new MenuNavBar($('.flex-wrap'), this.menu); 
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
        const $MenuListNode = $("#espresso-menu-list");
        new MenuList($MenuListNode, this.menu, this.currentCategory);

        this.model.bindEvents().makeSoldOut({
            domNode : $(".menu-count"),
            menu : this.menu,
            category : this.currentCategory
            })
        
    }

    initEventListener = () =>{

        $("#espresso-menu-form")
        .addEventListener("submit", (e) => {
            e.preventDefault();
        });

        $("#espresso-menu-name")
        .addEventListener("keypress", async (e) =>{  
            if (e.key !== "Enter"){
                return;
            }
            await this.model.bindEvents().extendMenuName(
                {category : this.currentCategory,
                 allMenu : this.menu});
            
            this.render();
        });
    
        $("#espresso-menu-list")
        .addEventListener("click", async (e) => {

            const menuId = e.target.closest("li").dataset.menuId;
        
            if (e.target.classList.contains("menu-edit-button")){
                await this.model.bindEvents().updateMenuName({
                    category : this.currentCategory, 
                    allMenu : this.menu, 
                    menuId : menuId
                });
                this.render();
                return;
            };
            if (e.target.classList.contains("menu-remove-button")){
                await this.model.bindEvents().removeMenu({event : e, menuId : menuId, category : this.currentCategory});
                this.render();
                return;
            }
            if (e.target.classList.contains("menu-sold-out-button")){
                await this.model.bindEvents().soldOutMenu({category : this.currentCategory, menuId : menuId});
                this.render();
                return;
            }
        })

        $("nav").addEventListener("click", async (e) =>{
        this.currentCategory = await this.model.bindEvents().changeCategory(e)
        this.render();
    });


    }
}

