//this file will contain all of our vue code

/* ----------------------------------------------------------------------------------------------------------
                                              New User Table
------------------------------------------------------------------------------------------------------------*/
import * as Vue from "./vue.js";
import firstComponent from "./first-component.js";

Vue.createApp({
    data() {
        return {
            name: "",
            visible: true,
            images: [],
            title: "",
            file: "",
            imageSelected: "",
        };
    }, // data ends here

    components: {
        "first-component": firstComponent,
    },
    mounted() {
        //this is the location for us to ask if there are any images to retrieve in our database
        console.log("myview app has mounted");

        fetch("/images")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("response from /images", data);
                this.images = data;
            });
    },

    methods: {
        handleSubmit: function (e) {
            // e.preventDefault(); (if you don't use @submit.prevent)
            console.log("HANDLE SUBMIT");
            const formData = new FormData(e.target);

            // console.log(formData);

            fetch("/upload", {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                });
        },
        changingTheFile: function (e) {
            console.log("this is e target:", e);
            this.file = e.target.files[0];
        },

        enlarge: function (id) {
            this.imageSelected = id;
            // /this.image;
            console.log("photo is clicked", id);
        },

        closemodal() {
            this.imageSelected = null;
        },

        // modalAppear: function () {
        //     this.imageSelected = true;
        //     console.log("modal should appear");
        // },
    },
}).mount("#main");
