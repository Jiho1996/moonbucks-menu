const $ = (selector) => document.querySelector(selector);
// 사용자 인터렉션 저장. 동적인 웹페이지 제작가능.
// 상태값 중요.
const store = {
    setLocalStorage(menu){
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem("menu"));
    },
};

function App(){
    // Form 태그로 인한 새로고침 막기.
    this.menu = {
        espresso : [],
        frappuccino : [],
        blended : [],
        teavana : [],
        desert : [],
    };

    this.currentCategory = "espresso";

    this.init = () =>{
        if (store.getLocalStorage()){
            this.menu = store.getLocalStorage();
        }
        render();
        
    };

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
    }
    
    const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        const $innerMenuName = e.target.closest("li").querySelector(".menu-name");
        const updatedMenuName = prompt("변경할 이름을 입력해주세요.", $innerMenuName.innerText);
        this.menu[this.currentCategory][menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);
        $innerMenuName.innerText = updatedMenuName;
    }
    const updateMenuCount = () => {
        
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length
        $(".menu-count").innerText = `총 ${menuCount}개`
    }
    //메뉴 이름 받기.
    const extendMenuName = () => {
        if ($("#espresso-menu-name").value === ""){
            alert("값을 입력해주세요.");
            return;
        }
        const espressoMenuName = $('#espresso-menu-name').value;
        // if (coffeeName === ""){
        //     alert("값을 입력해 주세요.");
        //     return;
        // }
        this.menu[this.currentCategory].push( { name : espressoMenuName } );
        store.setLocalStorage(this.menu);
        render();
        $('#espresso-menu-name').value = "";
        updateMenuCount();
    };
    const removeMenu = (e) => {
        const menuId = e.target.closest("li").querySelector(".menu-name")
        if (confirm(`${menuId.innerText}를 삭제하시겠습니까 ?`)){
            e.target.closest("li").remove();
            this.menu[this.currentCategory].splice(menuId, 1)
            store.setLocalStorage(this.menu[this.currentCategory]);
            updateMenuCount();
        }
    }
    
    const soldOutMenu = (e) => {
        const menuId = e.target.closest("li").dataset.menuId;
        this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
        store.setLocalStorage(this.menu[this.currentCategory]);
        render();

    }

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
            render();
        }
    });
}


const app = new App();
app.init()