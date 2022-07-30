const $ = (selector) => document.querySelector(selector);
function App(){
    // Form 태그로 인한 새로고침 막기.
    $("#espresso-menu-form")
    .addEventListener("submit", (e) => {
        e.preventDefault();
    });
    //메뉴 이름 받기.
    $("#espresso-menu-name")
    .addEventListener("keypress", (e) =>{
        // 
        if (e.key === "Enter"){
            const coffeeName = $('#espresso-menu-name').value;
            
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


        
    });
}
App();