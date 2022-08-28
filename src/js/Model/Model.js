import { MenuApi } from "../api/index.js";
import MenuNavBar from "../View/MenuNavBar.js";
import { $ } from "../utils/dom.js";

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
    getMenuList = (category, allMenu) => {
        return allMenu[category]
        
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

    bindEvents(){

        const extendMenuName = async ({category, allMenu}) => {
            if ($("#espresso-menu-name").value === ""){
                alert("값을 입력해주세요.");
                return;
            }
            const menuName = $('#espresso-menu-name').value;
    
            if (checkDuplicated({
                category : category, allMenu : allMenu, updatedMenuName : menuName
            })){
                return;
            };
            await MenuApi.createMenu(category, menuName);
            $('#espresso-menu-name').value = "";
        };

        const checkDuplicated = ({
            category, allMenu, updatedMenuName
        }) =>{

            console.log(allMenu, category, updatedMenuName)
        
            if (allMenu[category].filter(function(ele){ return ele.name === updatedMenuName}).length){
                alert(`${updatedMenuName}은 이미 등록된 메뉴입니다.`);
                $('#espresso-menu-name').value = "";
                return true;
            }
        }
        
        const updateMenuName = async ({category, allMenu, menuId}) => {

            console.log(category, allMenu, menuId)

            const updatedMenuName = prompt("변경할 이름을 입력해주세요.");

            if (checkDuplicated({category : category, allMenu : allMenu, updatedMenuName : updatedMenuName})){  
                return;
            };
            
            await MenuApi.UpdateMenu(category, updatedMenuName, menuId)
        }

        const removeMenu = async ({event, menuId, category}) => {
            if (confirm(`${event.target.closest("li").querySelector(".menu-name").innerText}를 삭제하시겠습니까 ?`)){
                await MenuApi.deleteMenu(category, menuId);
            }
        };
        // return {
        //     updateMenuName : updateMenuName
        // }
        return {
            updateMenuName : updateMenuName,
            removeMenu : removeMenu,
            extendMenuName : extendMenuName,
        }
    
    }
}