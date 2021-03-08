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

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new ToggleLike($(' .toggle-like-btn', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();


                    // console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let newPostDom = function(post){
        return $(`<li id="post-${ post._id }">
                    <p>

                            <small>
                                <a class="delete-post-btn" href="/posts/delete-post/${ post._id }">Delete Post</a>
                            </small>

                        ${ post.content }
                        <span> by: </span>
                        <small>
                            ${ post.user.name }
                        </small>
    
                        <br>
    
                        <small>
                        
                                <a class="toggle-like-btn" data-likes="0" href="/likes/toggle/?id=${ post._id }&type=Post">
                                    0 Likes
                                </a>

                        </small>
                    </p>

                    <div class="post-comment">

                            <form id="post-${ post._id }-comments-form" action="/comments/create-comment" method="POST">
                                <input type="text" name="content" placeholder="Comment..." required>
                                <input type="hidden" name="post" value="${ post._id }">
                                <input type="submit" value="Post Comment">
                            </form>
                            <div id="comment-list">
                                <ul id="comment-list-${ post._id }">
                            
                                </ul>
                            </div>
                    </div>

                </li>
            <br>`
                          
                )
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

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


        // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
        let convertPostsToAjax = function(){
            $('#my-post-list>ul>li').each(function(){
                let self = $(this);
                let deleteButton = $(' .delete-post-btn', self);
                deletePost(deleteButton);
    
                // get the post's id by splitting the id attribute
                let postId = self.prop('id').split("-")[1]
                new PostComments(postId);
            });
        };
    
    

    createPost();
    convertPostsToAjax();
}