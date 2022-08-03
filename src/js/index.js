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
    async createMenu(name){
        
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
            <li data-menu-id ="${index}"class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name ${item.soldOut ? "sold-out" : ""}">${item.name}</span>
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
    
    const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        const $innerMenuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("변경할 이름을 입력해주세요.", $innerMenuName.innerText);
        this.menu[this.currentCategory][menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);
        render();
    }
    //메뉴 이름 받기.
    const extendMenuName = async () => {
        if ($("#espresso-menu-name").value === ""){
            alert("값을 입력해주세요.");
            return;
        }
        const menuName = $('#espresso-menu-name').value;
        // if (coffeeName === ""){
        //     alert("값을 입력해 주세요.");
        //     return;
        // }
        await fetch(`${BASE_URL}/category/${this.currentCategory}/menu`, {
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({name : menuName}),
        })
        .then((response) => {
            return response.json();
        });

        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
            this.currentCategory
        );
        render();
        $('#espresso-menu-name').value = "";
    };
     
    const removeMenu = (e) => {
        const menuId = e.target.closest("li").querySelector(".menu-name")
        if (confirm(`${menuId.innerText}를 삭제하시겠습니까 ?`)){
            this.menu[this.currentCategory].splice(menuId, 1)
            store.setLocalStorage(this.menu[this.currentCategory]);
            render();
        }
    }
    
    const soldOutMenu = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
        store.setLocalStorage(this.menu[this.currentCategory]);
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
    
        $("nav").addEventListener("click", (e) => {
            const isCategoryButton = e.target.classList.contains("cafe-category-name");
            if (isCategoryButton){
                this.currentCategory = e.target.dataset.categoryName;
                console.log(e.target.innerText)
                $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`
                
                render();
            }
        });

    }

}


const app = new App();
app.init()