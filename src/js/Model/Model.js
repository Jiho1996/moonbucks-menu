import { MenuApi } from "../api/index.js";
import { $ } from "../utils/dom.js";

export default class Model {

    constructor(){
        if (Model.instance) return Model.instance;
        Model.instance = this;
    }

    setMenuList = async (category, allMenu) => {
        const menuList = await MenuApi.getAllMenuByCategory(category);
        allMenu[category] = menuList;
    }
    getMenuList = (category, allMenu) => {
        return allMenu[category]
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
        
            if (allMenu[category].filter(function(ele){ return ele.name === updatedMenuName}).length){
                alert(`${updatedMenuName}은 이미 등록된 메뉴입니다.`);
                $('#espresso-menu-name').value = "";
                return true;
            }
        }
        
        const updateMenuName = async ({category, allMenu, menuId}) => {

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

        const soldOutMenu = async ({category, menuId}) => {
            await MenuApi.toggleSoldOutMenu(category, menuId);
        };

        const changeCategory = async (e, category) =>{
            const isCategoryButton = e.target.classList.contains("cafe-category-name");
            let changedCategory = "";
            if (isCategoryButton){
                changedCategory = e.target.dataset.categoryName;
                $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`
        }

        return changedCategory === category ? category : changedCategory
        
    }

        const makeSoldOut = ({domNode, menu, category}) => {

            domNode.innerText = `총 ${menu[category].length}개`

        }

        return {
            updateMenuName,
            removeMenu,
            extendMenuName,
            soldOutMenu,
            changeCategory,
            makeSoldOut,
        }
    
    }
}