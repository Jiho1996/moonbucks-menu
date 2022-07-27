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
        if (e.key == "Enter"){
            const coffeeName = $('#espresso-menu-name').value;
            
        };


        
    });
}
App();