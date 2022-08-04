import {$} from "./utils/dom.js"
import {store} from "./store/store.js"
// 사용자 인터렉션 저장. 동적인 웹페이지 제작가능.
// 상태값 중요.
// 한 파일에는 하나의 객체.
const BASE_URL = "http://localhost:3000/api"

const MenuApi = {
    async getAllMenuByCategory(category){
        const response = await fetch(`${BASE_URL}/category/${category}/menu`);
        return response.json();
    },
    async createMenu(category, name){
        const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({name}),
        });
        if (!response.ok){
            console.error("에러가 발생.")
        }
    },
    async UpdateMenu(category, name, menuId){
        const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`,{
            method : "PUT",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({name}),
        });
        if (!response.ok){
            console.error("에러가 발생.")
        }
    },
    async toggleSoldOutMenu(category, menuId){
        const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`,{
            method : "PUT",
        });
        if (!response.ok){
            console.error("에러가 발생.")
        }
    },
    ///category/:category/menu/:menuId
    async deleteMenu(category, menuId){
        const response = await fetch (`${BASE_URL}/category/${category}/menu/${menuId}`,{
            method : "DELETE",
        });
        if (!response.ok){
            console.error("에러가 발생.")
        }
    }
}
// 주소, 규칙
// fetch (BASE_URL, option)
function App(){
    // 한 메뉴 관리 각체에 넣어서 하는 것도 깔끔해 보이고 좋다.
    this.menu = {
        espresso : [],
        frappuccino : [],
        blended : [],
        teavana : [],
        desert : [],
    };

    this.currentCategory = "espresso";
    // 초기화를 따로 분리. 새로고침해도 초기화 되지 않는다. 
    this.init = async () =>{
        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
            this.currentCategory
        );
        initEventListener();
        render();
    };
    // render역시 따로 분리 => 재사용이 잦기때문.
    const render = () =>{
        const template = this.menu[this.currentCategory]
        .map((item, index) => {
            return `
            <li data-menu-id ="${item.id}"class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name ${item.isSoldOut ? "sold-out" : ""}">${item.name}</span>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
            >
                품절
            </button>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
                수정
            </button>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
                삭제
            </button>
            </li>
            ` 
    })
    .join("");
       
        $("#espresso-menu-list").innerHTML = template
        $(".menu-count").innerText = `총 ${this.menu[this.currentCategory].length}개`
    }
    
    const updateMenuName = async (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        const $innerMenuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("변경할 이름을 입력해주세요.", $innerMenuName.innerText);
        await MenuApi.UpdateMenu(this.currentCategory, updatedMenuName, menuId)
        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
            this.currentCategory
        );
        render();
    }
    //메뉴 이름 받기.
    const extendMenuName = async () => {
        if ($("#espresso-menu-name").value === ""){
            alert("값을 입력해주세요.");
            return;
        }
        const menuName = $('#espresso-menu-name').value;
        await MenuApi.createMenu(this.currentCategory, menuName);
        // if (coffeeName === ""){
        //     alert("값을 입력해 주세요.");
        //     return;
        // }

        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
            this.currentCategory
        );
        render();
        $('#espresso-menu-name').value = "";
    };
     
    const removeMenu = async (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        console.log(menuId);
        if (confirm(`${menuId.innerText}를 삭제하시겠습니까 ?`)){
            await MenuApi.deleteMenu(this.currentCategory, menuId);
            this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
                this.currentCategory
            );

            // this.menu[this.currentCategory].splice(menuId, 1)
            // store.setLocalStorage(this.menu[this.currentCategory]);
            render();
        }
    }
    
    const soldOutMenu = async (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
            this.currentCategory
        );
        // this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
        // store.setLocalStorage(this.menu[this.currentCategory]);
        render();

    }

    
    // dom조작을 따로 분리.
    const initEventListener = () =>{

        $("#espresso-menu-form")
        .addEventListener("submit", (e) => {
            e.preventDefault();
        });
    
        $("#espresso-menu-name")
        .addEventListener("keypress", (e) =>{  
            if (e.key !== "Enter"){
                return;
            }
            extendMenuName();
            
        });
    
        $("#espresso-menu-submit-button")
        .addEventListener("click", extendMenuName)
    
        $("#espresso-menu-list")
        .addEventListener("click", (e) => {
            
            if (e.target.classList.contains("menu-edit-button")){
                updateMenuName(e);
                return;
            };
            if (e.target.classList.contains("menu-remove-button")){
                removeMenu(e);
                return;
            }
            if (e.target.classList.contains("menu-sold-out-button")){
                soldOutMenu(e);
                return;
            }
        })
    
        $("nav").addEventListener("click", async (e) => {
            const isCategoryButton = e.target.classList.contains("cafe-category-name");
            console.log(this) // ?
            if (isCategoryButton){
                this.currentCategory = e.target.dataset.categoryName;
                console.log(e.target.innerText)
                $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`
                this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
                render();
            }
        });

    }

}


const app = new App();
app.init()