const $ = (selector) => document.querySelector(selector);
function App(){
    // Form 태그로 인한 새로고침 막기.
    $("#espresso-menu-form")
    .addEventListener("submit", (e) => {
        e.preventDefault();
    });
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
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length
        $(".menu-count").innerText = `총 ${menuCount}개`
        $('#espresso-menu-name').value = "";
    };

    $("#espresso-menu-name")
    .addEventListener("keypress", (e) =>{  
        if (e.key !== "Enter"){
            return;
        }
        extendMenuName();
    });

    $("#espresso-menu-submit-button")
    .addEventListener("click", () =>{
    extendMenuName();
    });

    $("#espresso-menu-list").addEventListener("click", (e) => {
        const $innerMenuName = e.target.closest("li").querySelector(".menu-name")
        if (e.target.classList.contains("menu-edit-button")){
            const updatedMenuName = prompt("변경할 이름을 입력해주세요.", $innerMenuName.innerText);
            $innerMenuName.innerText = updatedMenuName;
        };
        if (e.target.classList.contains("menu-remove-button")){
            if (confirm(`${$innerMenuName.innerText}를 삭제하시겠습니까 ?`)){
                e.target.closest("li").remove();
            }

            
        }
    })
}
App();