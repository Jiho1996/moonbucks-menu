const $ = (selector) => document.querySelector(selector);
function App(){
    // Form 태그로 인한 새로고침 막기.
    
    const updateMenuName = (e) => {
        const $innerMenuName = e.target.closest("li").querySelector(".menu-name")
        const updatedMenuName = prompt("변경할 이름을 입력해주세요.", $innerMenuName.innerText);
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
        const coffeeName = $('#espresso-menu-name').value;
        // if (coffeeName === ""){
        //     alert("값을 입력해 주세요.");
        //     return;
        // }
        const coffeeMenuTemplate = (coffeeName) => {
            return `
                <li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${coffeeName}</span>
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
        };
        $("#espresso-menu-list").insertAdjacentHTML(
            "beforeend",
            coffeeMenuTemplate(coffeeName)
            );
        
        $('#espresso-menu-name').value = "";
        updateMenuCount();
    };
    const removeMenu = (e) => {
        const $innerMenuName = e.target.closest("li").querySelector(".menu-name")
        if (confirm(`${$innerMenuName.innerText}를 삭제하시겠습니까 ?`)){
            e.target.closest("li").remove();
            updateMenuCount();
        }
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
        };
        if (e.target.classList.contains("menu-remove-button")){
            removeMenu(e);
        }
    })
}
App();