// import { json } from "express";

const comments = {
    data() {
        return {
            comments: [],
            name: "",
            comment: "",
            image_id: "",
        };
    },
    props: ["imageSelected"],
    mounted() {
        console.log("log in mounted comments section", this.imageSelected);
        fetch(`/comments/${this.imageSelected}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.comments = data;
            });
    },

    methods: {
        submitComment: function () {
            console.log("name from submitComment function:", this.name);
            console.log("comment from submitComment function:", this.comment);

            // console.log(formData);

            fetch("/comment", {
                method: "POST",
                body: JSON.stringify({
                    image_id: this.imageSelected,
                    comment: this.comment,
                    username: this.name,
                }),
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data in comment fetch", data);

                    this.comments.push(data);
                    console.log("this comments log", this.comments);
                });
        },
    },
    template: `
    <div class="comments-container">
    <div v-for="comment in comments">
    <div class="round-comments">
<p>Username: {{comment.username}}</p>
<p>Comment: {{comment.comment}}</p>
<p>Date: {{comment.created_at}}</p>
</div>
</div>
    </div>
    
    
    <form class="comment-form">
    <input id="user-commenting" name="user-commenting" placeholder="User" v-model="name"/>
    <input id="comment-input" name="comment" placeholder="Comment" v-model="comment" />
    <button class="modal-submit" @click.prevent="submitComment" >Submit</button>

    </form>`,
};

export default comments;
