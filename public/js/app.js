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
        if (parseInt(location.pathname.slice(1))) {
            this.imageSelected = location.pathname.slice(1);
        } else {
            history.replaceState({}, "", `/`);
        }

        window.addEventListener("popstate", () => {
            this.imageSelected = location.pathname.slice(1);
        });
        // this.imageSelected = location.pathname.slice(data);
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
                    if (data.success) {
                        this.images.unshift(data.payload);
                    }
                });
        },
        changingTheFile: function (e) {
            console.log("this is e target:", e);
            this.file = e.target.files[0];
        },

        enlarge: function (id) {
            this.imageSelected = id;
            history.pushState({}, "", `/${id}`);
            console.log("photo is clicked", id);
        },

        moreButton: function () {
            let pix = this.images[this.images.length - 1];
            console.log("this is the this images thing:", pix.id);

            fetch(`/more/${pix.id}`)
                .then((resp) => resp.json())
                .then((data) => {
                    this.images = [...this.images, ...data];
                    // for (var i = 0; i < this.images.length; i++)
                    //     this.images.(i);
                    console.log("response from /more", data);
                });
        },

        //comment

        closemodal() {
            this.imageSelected = null;
            history.pushState({}, "", `/`);
        },

        // modalAppear: function () {
        //     this.imageSelected = true;
        //     console.log("modal should appear");
        // },
    },
}).mount("#main");
