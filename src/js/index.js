const $ = (selector) => document.querySelector(selector);
function App(){
    // Form 태그로 인한 새로고침 막기.
    $("#espresso-menu-form")
    .addEventListener("submit", (e) => {
        e.preventDefault();
    });
    //메뉴 이름 받기.
    console.log($("#espresso-menu-name").value === "")
    $("#espresso-menu-name")
    .addEventListener("keypress", (e) =>{
        console.log($("#espresso-menu-name").value,"and",e.key);
        if (e.key !== "Enter"){
            return;
        }
        // 의문 1. 아래 if문에서 만약 뭔가를 쳤다가 다 지우면 $("#espresso-menu-name").value === ""
        // 되지않나? -> 일단 addeventlistener MDN찾기.
       
        if ($("#espresso-menu-name").value === ""){
            alert("값을 입력해주세요.");
            return;
        }

         // 의문 2. 왜 빈값 처리를 아래 if e.key == enter문 사이에 안넣고 위에 넣는가..?
         // 최대한 depth를 줄이기위해서..?

        if (e.key === "Enter"){
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
       
    });

   
}
// function App(){
//     document
//     .querySelector("#espresso-menu-name")
//     .addEventListener("keypress", (e) =>{
//         console.log(e);
//     });
// };
App();