const firstComponent = {
    data() {
        return {
            image: {},
        };
    },
    props: ["imageSelected"],
    mounted() {
        console.log(
            "log in mounted image selected function",
            this.imageSelected
        );
        fetch(`/modal/${this.imageSelected}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("response from /images", data);
                this.image = data;
            });
    },
    methods: {
        enlarge() {
            console.log("clicked");
        },

        modalAppear() {
            console.log("modal function working");
        },
    },
    template: `<div class="modal">
  
   <h1>{{image.title}}</h1>
    
    </div>`,
};
export default firstComponent;
