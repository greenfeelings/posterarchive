import comments from "./comments.js";

const firstComponent = {
    data() {
        return {
            image: {},
        };
    },

    components: {
        comments: comments,
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
    <div id ="modal-square">
        
    <div class="modalp-container">
    <img  @click="notifyParent" class ="modal-photo" :src=image.url  > 
    </div>
    <h1 class = "modal-title">{{image.title}}</h1>
    <p class="modal-description">{{image.description}}</p>
   
     <comments v-bind:image-selected="imageSelected" ></comments>

    </div>
    </div>`,
};
export default firstComponent;
