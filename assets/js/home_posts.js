// const post = require('.../models/posts.js');
// const user = require('.../models/users.js');
// methood to submit form data for new post through AJAX 
{
    let createPost = function(){
        let newPostForm = $('#new-post');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create-post',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $(`#my-post-list>ul`).prepend(newPost);
                    // req.flash('success', 'Post Deleted!');
                    deletePost($(' .delete-post-btn', newPost));

                    // console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let newPostDom = function(post){
        return $(`<li id="post-${ post._id }">
                    
                        <small>
                            <a class="delete-post-btn" href="/posts/delete-post/${ post._id }">Delete Post</a>
                        </small>

                    ${ post.content }
                    <span> by: </span>
                    <small>
                    ${ post.user.name }
                    </small>
                    

                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post._id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}