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
        const $MenuListNode = $("#espresso-menu-list")
        new MenuList($MenuListNode, this.menu, this.currentCategory)
    }

    initEventListener = () =>{

        $("#espresso-menu-form")
        .addEventListener("submit", (e) => {
            e.preventDefault();
        });

        const updateMenuName = async (menuId) => {
            this.model.bindEvents().updateMenuName({
            category : this.currentCategory, 
            menu : this.menu, 
            menuId : menuId
        });
            this.render();
        }

        const removeMenu = async ({event, menuId}) => {
            if (confirm(`${event.target.closest("li").querySelector(".menu-name").innerText}를 삭제하시겠습니까 ?`)){
                await MenuApi.deleteMenu(this.currentCategory, menuId);
                this.render();
            }
        };

        const soldOutMenu = async (menuId) => {
            await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
            this.render();
    
        };
    
        $("#espresso-menu-list")
        .addEventListener("click", (e) => {

            const menuId = e.target.closest("li").dataset.menuId;
        
            if (e.target.classList.contains("menu-edit-button")){
                updateMenuName(menuId);
                return;
            };
            if (e.target.classList.contains("menu-remove-button")){
                removeMenu({event : e, menuId : menuId});
                return;
            }
            if (e.target.classList.contains("menu-sold-out-button")){
                soldOutMenu(menuId);
                return;
            }
        })

        const changeCategory = async (e) =>{
            const isCategoryButton = e.target.classList.contains("cafe-category-name");
            if (isCategoryButton){
                this.currentCategory = e.target.dataset.categoryName;
                $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`
                this.render();
        }
        
    }

        $("nav").addEventListener("click", changeCategory);


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

