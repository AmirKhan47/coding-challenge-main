var skeletonId = 'skeleton';
var contentId = 'content';
var skipCounter = 0;
var takeAmount = 10;


function getRequests(mode) {
    // your code here...
    // alert('getRequests');
}

function getMoreRequests(mode='', tab='') {
    // alert(tab);
    // Optional: Depends on how you handle the "Load more"-Functionality
    // getSentRequests

    // if (mode == 'null')
    // {
    //     // alert('mode is null');
    //     // $('#load_more_sent_request_2').html('no more data');
    //     $('#load_more_sent_request_2').remove();
    //     // $('#load_more_sent_request_2').replaceWith( "<h2>No More Data.</h2>" );
    // }
    // else
    // {
    var url = new URL(mode);
    var id = url.searchParams.get("page");
    id = id - 1;
    if (tab == 'Suggestions')
    {
        // var url = new URL(mode);
        // var id = url.searchParams.get("page");
        // var id = mode.substring(url.lastIndexOf('/') + 1);
        // $('#connections_in_common_'+id).hide();
        $('#load_more_suggestions_'+id).remove();
        ajax(mode, 'GET', [], '', 'Suggestions');
    }
    if (tab === 'SentRequests')
    {
        // var url = new URL(mode);
        // var id = url.searchParams.get("page");
        // var id = mode.substring(url.lastIndexOf('/') + 1);
        // $('#connections_in_common_'+id).hide();
        // alert('sentRequests');
        $('#load_more_sent_requests_'+id).remove();
        ajax(mode, 'GET', [], '', 'SentRequests');
    }
    if (tab == 'ReceivedRequests')
    {
        // var url = new URL(mode);
        // var id = url.searchParams.get("page");
        // var id = mode.substring(url.lastIndexOf('/') + 1);
        // $('#connections_in_common_'+id).hide();
        $('#load_more_received_requests_'+id).remove();
        ajax(mode, 'GET', [], '', 'ReceivedRequests');
    }
    if (tab == 'Connections')
    {
        // var url = new URL(mode);
        // var id = url.searchParams.get("page");
        // var id = mode.substring(url.lastIndexOf('/') + 1);
        // $('#connections_in_common_'+id).hide();
        $('#load_more_connections_'+id).remove();
        ajax(mode, 'GET', [], '', 'Connections');
    }
    if (tab == 'ConnectionsInCommon')
    {
        // var url = new URL(mode);
        // var id = url.searchParams.get("page");
        // var id = mode.substring(url.lastIndexOf('/') + 1);
        // $('#connections_in_common_'+id).hide();
        $('#load_more_connections_in_common_'+id).remove();
        // alert(id);
        // console.log('#hide-load_more_connections_in_common_'+id);
        ajax(mode, 'GET', [], '', 'ConnectionsInCommon');
    }
}

function getConnections() {
    // your code here...
}

function getMoreConnections() {
    // Optional: Depends on how you handle the "Load more"-Functionality
    // your code here...
}

function getConnectionsInCommon(userId, connectionId='') {
    // get connections in common
    // alert(userId);
    ajax('/getConnectionsInCommon/'+userId, 'GET', [], '', 'ConnectionsInCommon');
}

function getMoreConnectionsInCommon(userId, connectionId) {
    // Optional: Depends on how you handle the "Load more"-Functionality
    // your code here...
}

function getSuggestions() {
    // your code here...
}

function getMoreSuggestions() {
    // Optional: Depends on how you handle the "Load more"-Functionality
    // your code here...
}

function sendRequest(userId, suggestionId = '1') {
    //   ajax post request
    var count = $('#count_s').text();
    $('#count_s').text(count-1);
    var count = parseInt($('#count_sr').text());
    $('#count_sr').text(count+1);
    $('#sugesstion_id_' + userId).remove();
    var form = ajaxForm(userId);
    ajax('/sendRequest', 'POST', [], form);
}

function deleteRequest(userId, requestId) {
    //   ajax post request
    if (requestId === 'withdraw')
    {
        var count = $('#count_sr').text();
        $('#count_sr').text(count-1);
        var count = parseInt($('#count_s').text());
        $('#count_s').text(count+1);
        var form = new FormData();
        $('#sent_request_id_' + userId).remove();
        form.append('user_id1', userId);
        // var form = ajaxForm([userId, requestId]);
        ajax('/withdrawRequest', 'POST', [], form);
    }
    if (requestId === 'reject')
    {
        var count = $('#count_rr').text();
        $('#count_rr').text(count-1);
        var count = parseInt($('#count_s').text());
        $('#count_s').text(count+1);
        var form = new FormData();
        $('#received_request_id_' + userId).remove();
        form.append('user_id1', userId);
        // var form = ajaxForm([userId, requestId]);
        ajax('/rejectRequest', 'POST', [], form);
    }
    if (requestId === 'disconnect')
    {
        var count = $('#count_c').text();
        $('#count_c').text(count-1);
        var count = parseInt($('#count_s').text());
        $('#count_s').text(count+1);
        var form = new FormData();
        $('#connection_id_' + userId).remove();
        form.append('user_id2', userId);
        // var form = ajaxForm([userId, requestId]);
        ajax('/deleteConnection', 'POST', [], form);
    }
    // $('#sent_request_id_' + userId).remove();
    // var form = ajaxForm(userId);
    // ajax('/sendRequest', 'POST', [], form);
}

function acceptRequest(userId, requestId) {
    // accept request
    var count = $('#count_rr').text();
    $('#count_rr').text(count-1);
    var count = parseInt($('#count_c').text());
    $('#count_c').text(count+1);
    $('#received_request_id_' + userId).remove();
    var form = ajaxForm(userId);
    ajax('/acceptRequest', 'POST', [], form);
}

function removeConnection(userId, connectionId) {
    // your code here...
}

$('#get_suggestions_btn').click(
    function () {
        ajax('/getSuggestions', 'GET', [], '', 'Suggestions');
        $('#suggestions').html('');
        $('#sent_requests').html('');
        $('#received_requests').html('');
        $('#connections').html('');
        $('#s_tab').show();
        $('#sr_tab').hide();
        $('#rr_tab').hide();
        $('#c_tab').hide();
        // alert('get_sent_requests_btn');
    }
)

$('#get_sent_requests_btn').click(
    function () {
        ajax('/getSentRequests', 'GET', [], '', 'SentRequests');
        $('#suggestions').html('');
        $('#sent_requests').html('');
        $('#received_requests').html('');
        $('#connections').html('');
        $('#s_tab').hide();
        $('#sr_tab').show();
        $('#rr_tab').hide();
        $('#c_tab').hide();
        // alert('get_sent_requests_btn');
    }
)

$('#get_received_requests_btn').click(
    function () {
        // alert('get_received_requests_btn');
        ajax('/getReceivedRequests', 'GET', [], '', 'ReceivedRequests');
        $('#suggestions').html('');
        $('#sent_requests').html('');
        $('#received_requests').html('');
        $('#connections').html('');
        $('#s_tab').hide();
        $('#sr_tab').hide();
        $('#rr_tab').show();
        $('#c_tab').hide();
        // alert('get_sent_requests_btn');
    }
)

$('#get_connections_btn').click(
    function () {
        ajax('/getConnections', 'GET', [], '', 'Connections');
        $('#suggestions').html('');
        $('#sent_requests').html('');
        $('#received_requests').html('');
        $('#connections').html('');
        $('#s_tab').hide();
        $('#sr_tab').hide();
        $('#rr_tab').hide();
        $('#c_tab').show();
        // alert('get_sent_requests_btn');
    }
)

$(function () {
    // getSuggestions();
    ajax('/getSuggestions', 'GET', [], '', 'Suggestions');
    // getSentRequests
    // ajax('/getSentRequests', 'GET', [], '', 'SentRequests');
    // getReceivedRequests
    // ajax('/getReceivedRequests', 'GET', [], '', 'ReceivedRequests');
    // getConnections
    // ajax('/getConnections', 'GET', [], '', 'Connections');
});
