<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConnectionController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getSuggestions()
    {
        // get users which are not connected or sent request or received request
        $data = \App\Models\User::
        where('id', '!=', Auth::id())
            ->whereNotIn('id', function ($query) {
                $query->select('user_id2')
                    ->from('connections')
                    ->where('user_id1', Auth::id());
            })
            ->whereNotIn('id', function ($query) {
                $query->select('user_id1')
                    ->from('connections')
                    ->where('user_id2', Auth::id());
            })
            ->whereNotIn('id', function ($query) {
                $query->select('user_id2')
                    ->from('connections')
                    ->where('user_id1', Auth::id())
                    ->where('status', 'sr');
            })
            ->whereNotIn('id', function ($query) {
                $query->select('user_id1')
                    ->from('connections')
                    ->where('user_id2', Auth::id())
                    ->where('status', 'sr');
            })
            ->whereNotIn('id', function ($query) {
                $query->select('user_id2')
                    ->from('connections')
                    ->where('user_id1', Auth::id())
                    ->where('status', 'rr');
            })
            ->whereNotIn('id', function ($query) {
                $query->select('user_id1')
                    ->from('connections')
                    ->where('user_id2', Auth::id())
                    ->where('status', 'rr');
            })
            ->whereNotIn('id', function ($query) {
                $query->select('user_id2')
                    ->from('connections')
                    ->where('user_id1', Auth::id())
                    ->where('status', 'c');
            })
            ->whereNotIn('id', function ($query) {
                $query->select('user_id1')
                    ->from('connections')
                    ->where('user_id2', Auth::id())
                    ->where('status', 'c');
            })
//            ->get();
            ->paginate(10);
        return $data;
    }

    public function sendRequest(Request $request)
    {
        // send a connect request
        $data = new \App\Models\connection();
        $data->user_id1 = Auth::id();
        $data->user_id2 = $request->user_id1;
        $data->status = 'sr';
        $data->save();
        return $data;
    }

    public function getSentRequests()
    {
        // get sent request's users
        $data = \App\Models\User::
        where('id', '!=', Auth::id())
            ->whereIn('id', function ($query) {
                $query->select('user_id2')
                    ->from('connections')
                    ->where('user_id1', Auth::id())
                    ->where('status', 'sr');
            })
//            ->get();
//                ->orderBy('id', 'asc')
            ->paginate(10);
        return $data;
    }

    public function withdrawRequest(Request $request)
    {
        // delete a sent connect request
        $data = \App\Models\connection::
        where('user_id1', Auth::id())
            ->where('user_id2', $request->user_id1)
            ->where('status', 'sr')
            ->delete();
        return $data;
    }

    public function getReceivedRequests()
    {
        // get sent request's users
        $data = \App\Models\User::
        where('id', '!=', Auth::id())
            ->whereIn('id', function ($query) {
                $query->select('user_id1')
                    ->from('connections')
                    ->where('user_id2', Auth::id())
                    ->where('status', 'rr');
            })
//            ->get();
            ->paginate(10);
        return $data;
    }

    public function acceptRequest(Request $request)
    {
        // accept a received connect request
        $data = \App\Models\connection::
        where('user_id1', $request->user_id1)
            ->where('user_id2', Auth::id())
            ->where('status', 'rr')
            ->update(['status' => 'c']);
        return $data;
    }

    public function rejectRequest(Request $request)
    {
        // reject a received connect request
        $data = \App\Models\connection::
        where('user_id1', $request->user_id1)
            ->where('user_id2', Auth::id())
            ->where('status', 'rr')
            ->delete();
        return $data;
    }

    public function getConnections()
    {
        // get connections
        $data = \App\Models\User::
        where('id', '!=', Auth::id())
            ->whereIn('id', function ($query) {
                $query->select('user_id2')
                    ->from('connections')
                    ->where('user_id1', Auth::id())
                    ->where('status', 'c');
            })
            ->orWhereIn('id', function ($query) {
                $query->select('user_id1')
                    ->from('connections')
                    ->where('user_id2', Auth::id())
                    ->where('status', 'c');
            })
//            ->get();
            ->paginate(10);
//        $data = \App\Models\connection::
//            where(function ($query) {
//                $query->where('user_id1', Auth::id())
//                ->orwhere('user_id2', Auth::id());
//            })
//            ->where('status', 'c')
//            ->get();
        return $data;
    }

    public function deleteConnection(Request $request)
    {
//        return $request->all();
        // delete a connection
        $data = \App\Models\connection::
        where(function ($query) use ($request) {
            $query->where('user_id1', Auth::id())
                ->where('user_id2', $request->user_id2)
                ->where('status', 'c');
        })
            ->orwhere(function ($query) use ($request) {
                $query->where('user_id2', Auth::id())
                    ->where('user_id1', $request->user_id2)
                    ->where('status', 'c');
            })
            ->delete();
        return $data;
    }

    public function getConnectionsInCommon($userId)
    {
        // get user's connections in common with $userId
        $data = \App\Models\User::
        where('id', '!=', Auth::id())
            ->where('id', '!=', $userId)
            ->whereIn('id', function ($query) use ($userId) {
                $query->select('user_id2')
                    ->from('connections')
                    ->where('user_id1', Auth::id())
                    ->where('status', 'c')
                    ->whereIn('user_id2', function ($query) use ($userId) {
                        $query->select('user_id2')
                            ->from('connections')
                            ->where('user_id1', $userId)
                            ->where('status', 'c');
                    });
            })
            ->orWhereIn('id', function ($query) use ($userId) {
                $query->select('user_id1')
                    ->from('connections')
                    ->where('user_id2', Auth::id())
                    ->where('status', 'c')
                    ->whereIn('user_id1', function ($query) use ($userId) {
                        $query->select('user_id2')
                            ->from('connections')
                            ->where('user_id1', $userId)
                            ->where('status', 'c');
                    });
            })
//            ->get();
            ->paginate(10);
//        $data = \App\Models\User::
//        where('id', '!=', Auth::id())
//            ->where('id', '!=', $userId)
//            ->whereIn('id', function ($query) use ($userId) {
//                $query->select('user_id2')
//                    ->from('connections')
//                    ->where('user_id1', Auth::id())
//                    ->where('status', 'c');
//            })
//            ->whereIn('id', function ($query) use ($userId) {
//                $query->select('user_id2')
//                    ->from('connections')
//                    ->where('user_id1', $userId)
//                    ->where('status', 'c');
//            })
//            ->get();
//        $data = \App\Models\connection::
//        where(function ($query) {
//            $query->where('user_id1', Auth::id())
//                ->where('status', 'c');
//        })
//            ->orwhere(function ($query) use ($userId) {
//                $query->where('user_id2', Auth::id())
//                    ->where('status', 'c');
//            })
//            ->where(function ($query) use ($userId) {
//                $query->where('user_id1', $userId)
//                    ->where('status', 'c');
//            })
//            ->orwhere(function ($query) use ($userId) {
//                $query->where('user_id2', $userId)
//                    ->where('status', 'c');
//            })
//            ->get();
//        $data['user_id'] = $userId;
        return $data;
    }

}
