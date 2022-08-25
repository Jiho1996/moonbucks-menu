export default class View {
    constructor($target, $props){
        this.$target = $target
        this.$props = $props
        this.setup();
        this.render();
    }

    setup(){}

    template (){return '';}

    render(){
        this.$target.innerHTML = this.template();
        this.mount();
    }

    mount(){}

}