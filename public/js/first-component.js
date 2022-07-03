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

        notifyParent() {
            this.$emit("close");
        },
    },
    template: `

    <div class="modal-background">
    <div @click="notifyParent" id ="modal-square">
        
    <img class ="modal-photo" :src=image.url  > 
    <h1 class = "modal-title">{{image.title}}</h1>
    <p class="modal-description">{{image.description}}</p>
    </div>
    </div>`,
};
export default firstComponent;
