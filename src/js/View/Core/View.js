export default class View {
    constructor($target, $props){
        this.$target = $target
        this.$props = $props
        this.render();
    }

    template (){return '';}

    render(){
        this.$target.innerHTML = this.template();
        this.mount();
    }

    mount(){}

}