<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Post::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'title' => 'required'
        ]);
        if (Auth::check()) {
            $userId = Auth::id();
            $user = User::find($userId);
            return $user->posts()->create($request->all());
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function getAllPostByUser($id)
    {
        return User::find($id)->posts;
    }

    public function getPostByUser()
    {
        if (Auth::check()) {
            $username = Auth::user()->username;
            return Post::where('username', $username)->get();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return Post::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        //
        $request->validate([
            'title' => 'required',
            'description' => 'required'
        ]);
        $post = Post::find($id);
        $post->update($request->all());
        return $post;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        return Post::destroy($id);
    }

    public function addComment($id, Request $request)
    {
        if (Auth::check()) {
            $request->validate([
                'comment' => 'required'
            ]);
            $comment = new Comment();
            $comment->username = Auth::user()->username;
            $comment->post_id = $id;
            $comment->comment = $request->comment;
            $comment->save();
            return $comment;
        }
    }

    public function getComments($id)
    {
        return Post::find($id)->comments;
    }
}
